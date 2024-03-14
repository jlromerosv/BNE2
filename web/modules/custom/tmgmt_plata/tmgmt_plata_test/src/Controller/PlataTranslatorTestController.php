<?php

/**
 * @file
 * Contains \Drupal\block\Controller\CategoryAutocompleteController.
 */

namespace Drupal\tmgmt_plata_test\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Returns autocomplete responses for block categories.
 */
class PlataTranslatorTestController {

  /**
   * Mock service to get available languages.
   */
  public function availableLanguages(Request $request) {
    if ($response = $this->validateKey($request)) {
      return $response;
    }

    $response = array(
      'data' => array(
        'languages' => array(
          array('language' => 'es'),
          array('language' => 'ca'),
          array('language' => 'gl'),
        ),
      ),
    );

    return new JsonResponse($response);
  }

  /**
   * Key validator helper.
   */
  protected function validateKey(Request $request) {
    if ($request->get('key') != 'correct key') {
      return $this->trigger_response_error('usageLimits', 'keyInvalid', 'Bad Request');
    }
  }

  /**
   * Helper to trigger mok response error.
   *
   * @param string $domain
   * @param string $reason
   * @param string $message
   * @param string $locationType
   * @param string $location
   */
  public function trigger_response_error($domain, $reason, $message, $locationType = NULL, $location = NULL) {

    $response = array(
      'error' => array(
        'errors' => array(
          'domain' => $domain,
          'reason' => $reason,
          'message' => $message,
        ),
        'code' => 400,
        'message' => $message,
      ),
    );

    if (!empty($locationType)) {
      $response['error']['errors']['locationType'] = $locationType;
    }
    if (!empty($location)) {
      $response['error']['errors']['location'] = $location;
    }

    return new JsonResponse($response);
  }

  /**
   * Mok service to translate request.
   */
  public function translate(Request $request) {

    $this->validateKey($request);

    if (!$request->query->has('-q')) {
      $this->trigger_response_error('global', 'required', 'Required parameter: q', 'parameter', 'q');
    }
    if (!$request->query->has('source')) {
      $this->trigger_response_error('global', 'required', 'Required parameter: source', 'parameter', 'source');
    }
    if (!$request->query->has('target')) {
      $this->trigger_response_error('global', 'required', 'Required parameter: target', 'parameter', 'target');
    }

    $translations = array(
      'ca' => 'Hallo Welt &amp; willkommen',
      'gl' => 'Bonjour tout le monde',
    );

    $response = array(
      'data' => array(
        'translations' => array(
          array('translatedText' => $translations[$_GET['target']]),
        ),
      ),
    );

    return new JsonResponse($response);
  }

}
