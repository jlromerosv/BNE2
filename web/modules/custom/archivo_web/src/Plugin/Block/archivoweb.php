<?php

namespace Drupal\archivo_web\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\archivo_web\Services\Consultas;
use Symfony\Component\DependencyInjection\ContainerInterface;





/**
 * @Block(
 * id = "archivo_web",
 * admin_label = @Translation("Bloque Resultados archivos de la web"),
 * category = @Translation("Pulsia"),
 * )
 * Class bdh
 * @package Drupal\archivo_web\Plugin\Block
 */
class archivoweb extends BlockBase implements ContainerFactoryPluginInterface
{

    /**
     * @var consultas
     */
    private $consultas;



    // Constructor de clase
    public function __construct(array $configuration, $plugin_id, $plugin_definition, Consultas $consultas)
    {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->consultas = $consultas;
    }

    //Función donde se inyectan los servicios.
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
    {
        return new static(
            $configuration,
            $plugin_id,
            $plugin_definition,
            $container->get('archivo_web.consultas')
        );
    }

    public function build()
    {

        try {
            //Se obtienen los resultados de la búsqueda
            $response_query = $this->consultas->get_archivos_web();

            return [
                '#theme' => 'archivo_web',
                '#resultado' => $response_query,
            ];
        } catch (Exception $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        }
    }

    /**
     * {@inheritdoc}
     * Establece la cache a cero para que se actualice el bloque cada vez que se refresque la página.
     */
    public function getCacheMaxAge()
    {
        return 0;
    }

    /**
     * {@inheritdoc}
     * Se omite cache cuando cambia algun parametro de la url
     */
    // public function getCacheContexts() {
    //     return ['url.path', 'url.query_args'];
    // }
}




