<?php

/**
 * @file
 * Contains \Drupal\tmgmt_microsoft\Plugin\tmgmt\Translator\MicrosoftTranslator.
 */

namespace Drupal\tmgmt_plata\Plugin\tmgmt\Translator;

use Drupal\Component\Utility\Html;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\tmgmt\ContinuousTranslatorInterface;
use Drupal\tmgmt\Entity\Job;
use Drupal\tmgmt\JobInterface;
use Drupal\tmgmt\TranslatorInterface;
use Drupal\tmgmt\Entity\Translator;
use Drupal\tmgmt\TMGMTException;
use Drupal\tmgmt\TranslatorPluginBase;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Psr7\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;
use \Drupal\tmgmt\Translator\AvailableResult;
use \Drupal\tmgmt\Translator\TranslatableResult;

/**
 * Plata translator plugin.
 *
 * @TranslatorPlugin(
 *   id = "plata",
 *   label = @Translation("Plata"),
 *   description = @Translation("Plata Translator service."),
 *   ui = "Drupal\tmgmt_plata\PlataTranslatorUi",
 *   logo = "icons/plata.svg",
 * )
 */
class PlataTranslator extends TranslatorPluginBase implements ContainerFactoryPluginInterface, ContinuousTranslatorInterface
{

  /**
   * Translation service URL.
   *
   * @var string
   */
/*  protected $translatorUrl = 'http://se-apertium.redsara.es/TranslatorService_v2/Translator_v2';*/
  protected $translatorUrl = 'https://apertium.redsara.es/TranslatorService_v2/Translator_v2';
  /* protected $translatorUrl = 'http://moses.redsara.es/TranslatorService_v2/Translator_v2?wsdl';*/

  /**
   * Name of parameter that contains source string to be translated.
   *
   * @var string
   */
  protected $qParamName = 'q';

  /**
   * Maximum supported characters.
   *
   * @var int
   */
  protected $maxCharacters = 50000;

  /**
   * Available actions for Plata translator.
   *
   * @var array
   */
  protected $availableActions = array('translate', 'languages', 'detect');

  /**
   * Max number of text queries for translation sent in one request.
   *
   * @var int
   */
  protected $qChunkSize = 1;

  /**
   * Guzzle HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $client;

  /**
   * Constructs a LocalActionBase object.
   *
   * @param \GuzzleHttp\ClientInterface $client
   *   The Guzzle HTTP client.
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param array $plugin_definition
   *   The plugin implementation definition.
   */
  public function __construct(ClientInterface $client, array $configuration, $plugin_id, array $plugin_definition)
  {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->client = $client;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
  {
    return new static(
      $container->get('http_client'),
      $configuration,
      $plugin_id,
      $plugin_definition
    );
  }

  /**
   * Overrides TMGMTDefaultTranslatorPluginController::checkAvailable().
   */
  public function checkAvailable(TranslatorInterface $translator)
  {
    if ($translator->getSetting('api_key')) {
      return AvailableResult::yes();
    }

    return AvailableResult::no(t('@translator is not available. Make sure it is properly <a href=:configured>configured</a>.', [
      '@translator' => $translator->label(),
      ':configured' => $translator->toUrl()->toString()
    ]));
  }

  /**
   * Overrides TMGMTDefaultTranslatorPluginController::checkTranslatable().
   */
  public function checkTranslatable(TranslatorInterface $translator, JobInterface $job)
  {
    foreach (\Drupal::service('tmgmt.data')->filterTranslatable($job->getData()) as $value) {
      // If one of the texts in this job exceeds the max character count
      // the job can't be translated.
      if (mb_strlen($value['#text']) > $this->maxCharacters) {
        return TranslatableResult::no(t('The length of the job exceeds tha max character count (@count).', ['@count' => $this->maxCharacters]));
      }
    }
    return parent::checkTranslatable($translator, $job);
  }

  /**
   * Implements TMGMTTranslatorPluginControllerInterface::requestTranslation().
   */
  public function requestTranslation(JobInterface $job)
  {
    $this->requestJobItemsTranslation($job->getItems());
    if (!$job->isRejected()) {
      $job->submitted('The translation job has been submitted.');
    }
  }

  /**
   * Helper method to do translation request.
   *
   * @param Job $job
   *   TMGMT Job to be used for translation.
   * @param array|string $q
   *   Text/texts to be translated.
   *
   * @return array
   *   Userialized JSON containing translated texts.
   */
  protected function plataRequestTranslation(Job $job, $q)
  {
    $translator = $job->getTranslator();

    return $this->doRequest($translator, 'translate', array(
      'source' => $job->getRemoteSourceLanguage(),
      'target' => $job->getRemoteTargetLanguage(),
      $this->qParamName => $q,
    ), array(
      'headers' => array(
        'Content-Type' => 'text/xml; charset=UTF8',
      ),
    ));
  }


  /**
   * Overrides TMGMTDefaultTranslatorPluginController::getSupportedRemoteLanguages().
   */
  public function getSupportedRemoteLanguages(TranslatorInterface $translator)
  {
    $languages = array();
    // Prevent access if the translator isn't configured yet.
    if (!$translator->getSetting('api_key')) {
      return $languages;
    }
    try {

      $languages = array("es" => "es", "gl" => "gl", "ca" => "ca", "fr" => "fr");
      /*
      $request = $this->doRequest($translator, 'languages');
      if (isset($request['data'])) {
        foreach ($request['data']['languages'] as $language) {
          $languages[$language['language']] = $language['language'];
        }
      }*/
    } catch (\Exception $e) {
      \Drupal::messenger()->addMessage($e->getMessage(), 'error');
      return $languages;
    }

    return $languages;
  }

  /**
   * Overrides TMGMTDefaultTranslatorPluginController::getDefaultRemoteLanguagesMappings().
   */
  public function getDefaultRemoteLanguagesMappings()
  {
    return array(
      'es-ca' => 'es-ca',
    );
  }

  /**
   * Overrides TMGMTDefaultTranslatorPluginController::getSupportedTargetLanguages().
   */
  public function getSupportedTargetLanguages(TranslatorInterface $translator, $source_language)
  {

    $languages = $this->getSupportedRemoteLanguages($translator);

    // There are no language pairs, any supported language can be translated
    // into the others. If the source language is part of the languages,
    // then return them all, just remove the source language.
    if (array_key_exists($source_language, $languages)) {
      unset($languages[$source_language]);
      return $languages;
    }

    return array();
  }

  /**
   * Overrides TMGMTDefaultTranslatorPluginController::hasCheckoutSettings().
   */
  public function hasCheckoutSettings(JobInterface $job)
  {
    return FALSE;
  }

  /**
   * Local method to do request to Plata Translate service.
   *
   * @param Translator $translator
   *   The translator entity to get the settings from.
   * @param string $action
   *   Action to be performed [translate, languages, detect]
   * @param array $request_query
   *   (Optional) Additional query params to be passed into the request.
   * @param array $options
   *   (Optional) Additional options that will be passed into drupal_http_request().
   *
   * @return array object
   *   Unserialized JSON response from Plata.
   *
   * @throws TMGMTException
   *   - Invalid action provided
   *   - Unable to connect to the Plata Service
   *   - Error returned by the Plata Service
   */
  protected function doRequest(Translator $translator, $action, array $request_query = array(), array $options = array())
  {

    if (!in_array($action, $this->availableActions)) {
      throw new TMGMTException('Invalid action requested: @action', array('@action' => $action));
    }
    $query_string = '';

    // Translate action is requested without this argument.
    if ($action == 'translate') {
      $action = '';
    }

    // Get custom URL for testing purposes, if available.
    $custom_url = $translator->getSetting('url');
    //$url = ($custom_url ? $custom_url : $this->translatorUrl) . '/' . $action;
    $url = $this->translatorUrl;

    // Prepare Guzzle Object.
    $pre_body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://inteco.minhap.gov/"><soapenv:Header/><soapenv:Body>';
    $post_body = '</soapenv:Body></soapenv:Envelope>';
    $query = '';
    $languagePair = $request_query['source'] . '-' . $request_query['target'];
    $languagePair = 'es-' . $request_query['target'];
    if (isset($request_query['q'])) {
      foreach ($request_query['q'] as $source_text) {

        if ($source_text != strip_tags($source_text)) {
          // contains HTML. Enviar este parámetro a PLATA sólo si texto fuente contiene html
          $contentType = 'html';
        } else {
          $contentType = 'txt';
        }

        $query = '<int:translate_string><proxyCache>true</proxyCache><documentBase64></documentBase64><translationEngine>plata</translationEngine><languagePair>' . $languagePair . '</languagePair><ner>false</ner><contentType>' . $contentType . '</contentType><markUnknown>-u</markUnknown><codeTranslate><![CDATA[' . ($source_text) . ']]></codeTranslate><checksum></checksum><url></url><dirbase></dirbase><userName>bneusr</userName><userPass>sebneusr</userPass></int:translate_string>';
      }
    }
    //strip_tags($source_text)

    $body = $pre_body . $query . $post_body;

    if (str_contains($source_text, 'punto')) {
      //tracear envíos PLATA
      //die($body);
    }
    //$this->qParamName

    $options = [
      'timeout' => 250,
      'headers' => [
        'Content-Type' => 'text/xml',
      ],
      'body' => $body
    ];

    $method = "POST";
    //$endpoint="http://se-apertium.redsara.es/TranslatorService_v2/Translator_v2";
    $client = \Drupal::httpClient();
    $response = $client->request($method, $url, $options);
    try {
      if ($response->getStatusCode() == 200) {
        $response = $response->getBody()->getContents();
        \Drupal::logger('Pulsia PLATA response')->notice(serialize($response));
        /*Resultado entre return y /return del xml */
        $start = "<return>";
        $content = $response;
        $end = "</return>";
        $n = explode($start, $content);
        $plata_result = array();
        foreach ($n as $val) {
          $pos = strpos($val, $end);
          if ($pos !== false) {
            $plata_result[] = substr($val, 0, $pos);
          }
        }
        if (isset($plata_result[0])) {
          $result['data']['translations'][] = array('translatedText' => Html::decodeEntities($plata_result[0]));
        }
        return $result;
      }
    } catch (BadResponseException $e) {
      $message = "";
      watchdog_exception('debug_exception', $e, $message);
    }
  }

  /**
   * We provide translatorUrl setter so that we can override its value
   * in automated testing.
   *
   * @param $translator_url
   */
  final public function setTranslatorURL($translator_url)
  {
    $this->translatorUrl = $translator_url;
  }

  /**
   * The q parameter name needs to be overridden for Drupal testing as it
   * collides with Drupal q parameter.
   *
   * @param $name
   */
  final public function setQParamName($name)
  {
    $this->qParamName = $name;
  }

  /**
   * {@inheritdoc}
   */
  public function requestJobItemsTranslation(array $job_items)
  {
    /** @var \Drupal\tmgmt\Entity\Job $job */
    $job = reset($job_items)->getJob();
    foreach ($job_items as $job_item) {
      if ($job->isContinuous()) {
        $job_item->active();
      }
      // Pull the source data array through the job and flatten it.
      $data = \Drupal::service('tmgmt.data')
        ->filterTranslatable($job_item->getData());

      $translation = array();
      $q = array();
      $keys_sequence = array();
      $i = 0;

      // Build Plata q param and preserve initial array keys.
      $bloqueado = false;
      foreach ($data as $key => $value) {
        if ($key == "field_bloquear_la_traduccion_][0][value" &&  $value['#text'] == "bloqueartraduccion") {
          \Drupal::messenger()->addMessage("Contenido bloqueado para traducción", 'warning');
          $job->rejected('Translation has been rejected with following error: ',
          'Traducción bloqueada', 'error');
          $bloqueado = true;
        }
      }

      if ($bloqueado == false) {
        // Build Plata q param and preserve initial array keys.
        foreach ($data as $key => $value) {

          // \Drupal::messenger()->addMessage($key, 'error');
          // \Drupal::messenger()->addMessage( $value['#text'], 'error');
          if ($key == "field_bloquear_la_traduccion_][0][value" &&  $value['#text'] == "bloqueartraduccion") {
            \Drupal::messenger()->addMessage("Contenido bloqueado para traducción", 'warning');
          }
          $q[] = $value['#text'];
          $keys_sequence[] = $key;
        }

        try {

          // Split $q into chunks of self::qChunkSize.
          foreach (array_chunk($q, $this->qChunkSize) as $_q) {

            // Get translation from Plata.
            $result = $this->plataRequestTranslation($job, $_q);

            // Collect translated texts with use of initial keys.
            foreach ($result['data']['translations'] as $translated) {
              $translation[$keys_sequence[$i]]['#text'] = Html::decodeEntities($translated['translatedText']);
              $i++;
            }
          }

          // Save the translated data through the job.
          // NOTE that this line of code is reached only in case all translation
          // requests succeeded.
          $job_item->addTranslatedData(\Drupal::service('tmgmt.data')
            ->unflatten($translation));
        } catch (TMGMTException $e) {
          $job->rejected(
            'Translation has been rejected with following error: @error',
            array('@error' => $e->getMessage()),
            'error'
          );
        }
      }
    }
  }
}
