<?php

namespace Drupal\Tests\tmgmt_plata_eu\Functional;

use Drupal\node\Entity\Node;
use Drupal\Tests\tmgmt\Functional\TMGMTTestBase;
use Drupal\tmgmt\Entity\Job;
use Drupal\tmgmt\JobItemInterface;
use Drupal\tmgmt_plata_eu\Plugin\tmgmt\Translator\PlataEuTranslator;
use Drupal\tmgmt\TranslatorInterface;
use Drupal\Core\Url;

/**
 * Basic tests for the plata translator.
 *
 * @group tmgmt_plata_eu
 */
class PlataEuTranslatorTest extends TMGMTTestBase {

  /**
   * A tmgmt_translator with a server mock.
   *
   * @var TranslatorInterface
   */
  protected $translator;

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = array('tmgmt_plata_eu', 'tmgmt_plata_eu_test');

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
    $this->addLanguage('de');
    // Override plugin params to query tmgmt_plata_test mock service instead
    // of Plata Translate service.
    $url = Url::fromUri('base://tmgmt_plata_eu_test', array('absolute' => TRUE))->toString();
    $this->translator = $this->createTranslator([
      'plugin' => 'plata_eu',
      'settings' => ['url' => $url],
    ]);
  }

  /**
   * Tests basic API methods of the plugin.
   */
  public function testPlataEu() {
    $plugin = $this->translator->getPlugin();
    $this->assertTrue($plugin instanceof PlataEuTranslator, 'Plugin is a PlataEuTranslator');

    $job = $this->createJob();
    $job->translator = $this->translator->id();
    $job->save();
    $item = $job->addItem('test_source', 'test', '1');
    $item->data = array(
      'wrapper' => array(
        '#text' => 'Hello world & welcome',
      ),
    );
    $item->save();

    $this->assertFalse($job->isTranslatable(), 'Check if the translator is not available at this point because we did not define the API parameters.');

    // Save a wrong api key.
    $this->translator->setSetting('api_key', 'wrong key');
    $this->translator->save();

    $languages = $this->translator->getSupportedTargetLanguages('en');
    $this->assertTrue(empty($languages), t('We can not get the languages using wrong api parameters.'));

    // Save a correct api key.
    $this->translator->setSetting('api_key', 'correct key');
    $this->translator->save();

    // Make sure the translator returns the correct supported target languages.
    $this->translator->clearLanguageCache();
    $languages = $this->translator->getSupportedTargetLanguages('en');

    $this->assertTrue(isset($languages['de']));
    $this->assertTrue(isset($languages['fr']));
    // As we requested source language english it should not be included.
    $this->assertTrue(!isset($languages['en']));

    $this->assertTrue($job->canRequestTranslation()->getSuccess());

    $job->requestTranslation();

    // Now it should be needs review.
    foreach ($job->getItems() as $item) {
      $this->assertTrue($item->isNeedsReview());
    }
    $items = $job->getItems();
    $item = end($items);
    $data = $item->getData();
    $this->assertEqual('Hallo Welt & willkommen', $data['dummy']['deep_nesting']['#translation']['#text']);

    // Test continuous integration.
    $this->config('tmgmt.settings')
      ->set('submit_job_item_on_cron', TRUE)
      ->save();

    // Continuous settings configuration.
    $continuous_settings = [
      'content' => [
        'node' => [
          'enabled' => 1,
          'bundles' => [
            'test' => 1,
          ],
        ],
      ],
    ];

    $continuous_job = $this->createJob('en', 'de', 0, [
      'label' => 'Continuous job',
      'job_type' => Job::TYPE_CONTINUOUS,
      'translator' => $this->translator,
      'continuous_settings' => $continuous_settings,
    ]);
    $continuous_job->save();

    // Create an english node.
    $node = Node::create([
      'title' => $this->randomMachineName(),
      'uid' => 0,
      'type' => 'test',
      'langcode' => 'en',
    ]);
    $node->save();

    $continuous_job->addItem('test_source', $node->getEntityTypeId(), $node->id());

    $continuous_job_items = $continuous_job->getItems();
    $continuous_job_item = reset($continuous_job_items);
    $this->assertTrue($continuous_job_item->getState() == JobItemInterface::STATE_INACTIVE);

    tmgmt_cron();

    $items = $continuous_job->getItems();
    $item = reset($items);
    $data = $item->getData();
    $this->assertEqual('Hallo Welt & willkommen', $data['dummy']['deep_nesting']['#translation']['#text']);
    $this->assertTrue($continuous_job->getState() == Job::STATE_CONTINUOUS);
    $this->assertTrue($item->getState() == JobItemInterface::STATE_REVIEW);
  }

  /**
   * Tests the UI of the plugin.
   */
  public function testPlataEuUi() {
    $url = Url::fromRoute('entity.tmgmt_translator.edit_form', ['tmgmt_translator' => $this->translator->id()]);
    $this->loginAsAdmin();

    // Try to connect with invalid credentials.
    $edit = [
      'settings[api_key]' => 'wrong key',
    ];
    $this->drupalPostForm($url, $edit, t('Connect'));
    $this->assertText(t('The "PlataEu API key" is not correct.'));

    // Test connection with valid credentials.
    $edit = [
      'settings[api_key]' => 'correct key',
    ];
    $this->drupalPostForm($url, $edit, t('Connect'));
    $this->assertText('Successfully connected!');

    // Assert that default remote languages mappings were updated.
    $this->assertOptionSelected('edit-remote-languages-mappings-en', 'en');
    $this->assertOptionSelected('edit-remote-languages-mappings-de', 'de');

    $this->drupalPostForm(NULL, [], t('Save'));
    $this->assertText(t('@label configuration has been updated.', ['@label' => $this->translator->label()]));
  }

}
