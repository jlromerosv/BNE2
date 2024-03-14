<?php

/**
 * @file
 * Contains \Drupal\tmgmt_plata_eu\PlataEuTranslatorUi.
 */

namespace Drupal\tmgmt_plata_eu;

use Drupal\tmgmt\TranslatorPluginUiBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plata Eu translator UI.
 */
class PlataEuTranslatorUi extends TranslatorPluginUiBase {

  /**
   * Overrides TMGMTDefaultTranslatorUIController::pluginSettingsForm().
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);

    /** @var \Drupal\tmgmt\TranslatorInterface $translator */
    $translator = $form_state->getFormObject()->getEntity();
    $form['api_key'] = array(
      '#type' => 'textfield',
      '#title' => t('Plata EU API key'),
      '#required' => TRUE,
      '#default_value' => $translator->getSetting('api_key'),
      '#description' => t('Please enter your Plata API key or visit <a href="@url">Plata APIs console</a> to create new one.',
        array('@url' => 'http://se-moses.redsara.es/PlataAdmin/')),
    );
    $form['url'] = array(
      '#type' => 'hidden',
      '#default_value' => $translator->getSetting('url'),
    );
    $form += parent::addConnectButton();
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
    parent::validateConfigurationForm($form, $form_state);
    /** @var \Drupal\tmgmt\TranslatorInterface $translator */
    $translator = $form_state->getFormObject()->getEntity();
    $supported_remote_languages = $translator->getPlugin()->getSupportedRemoteLanguages($translator);
    if (empty($supported_remote_languages)) {
      //$form_state->setErrorByName('settings][api_key', t('The "Plata API key" is not correct.'));
    }
  }

}
