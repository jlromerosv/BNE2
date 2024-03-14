<?php

namespace Drupal\pulsia_notifications\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Drupal\Component\Datetime;
use Drupal\node\Entity\Node;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class CustomPostController.
 */
class CustomPostController extends ControllerBase {

    public function rssFunction() {

$response = 'Sistema de notificaciones de Pulsia Technology';

/*
$response = '<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
    <title>??</title>
    <link>{{ dominio }}</link>
    <description>??</description>
    <language>es</language>';
        
        // $tipoContenido = \Drupal::request()->request->get('contenido');
        $tipoContenido = 'contenido_generico';

        $Query_content = \Drupal::entityQuery('node')->condition('status', 1)->condition('type', $tipoContenido)->execute();

        $node = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($Query_content);
        foreach ($node as $node_content) {
            $guid = $node_content->id();
            $pubDate = $node_content->created->value;
            $title = $node_content->title->value;
            $link = $node_content->toUrl()->toString();
            $description = $node_content->body->value;

            $uid = $node_content->getOwnerID();
                $account = \Drupal\user\Entity\User::load($uid);
                $creator = $account->getUsername();

            //Imagenes
            $imageURI = $node_content->field_imagen->entity->field_media_image->entity->getFileUri();
            $imageURL = str_replace("public:/", "/sites/default/files", $imageURI);
            $imageTitle = $node_content->field_imagen->entity->getName();
            // $imageLink = $node_content->imagen_campo->value;

$response = $response . '
        <item>
            <title>' . $title . '</title>
            <link>' . $link . '</link>
            <description>' . $description . '</description>

            <image>
                <url>' . $imageURL . '</url>
                <title>' . $imageTitle . '</title>
            </image>
            <pubDate>' . $pubDate . '</pubDate>
            
            <dc:creator>' . $creator . '</dc:creator>
            <guid isPermaLink="true">' . $guid . '</guid>
        </item>';
        }
    // <author>author@w3schools.com</author>
    // <link>{{ imageLink }}</link>

$response = $response . '
    </channel>
</rss>';
*/

        return new Response( 
            $response
        );
	}
}