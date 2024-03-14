<?php

namespace Drupal\archivo_web\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\archivo_web\Services\Consultas;
use Symfony\Component\DependencyInjection\ContainerInterface;



/**
 * @Block(
 * id = "archivo_web2",
 * admin_label = @Translation("Bloque filtros archivos de la web"),
 * category = @Translation("Pulsia"),
 * )
 * Class archivoweb2
 * @package Drupal\archivo_web\Plugin\Block
 */
class archivoweb2 extends BlockBase implements ContainerFactoryPluginInterface
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

    //Variable que contiene el resultado de la consulta de colecciones
    $colecciones = $this->consultas->get_colecciones();

    //Variable que contiene el resultado de la consulta de materias.
    $materias = $this->consultas->get_materias();

    //variable que agrupa el resultado de la consulta de colecciones y materias
    $filtros = array();
    $filtros['colecciones'] = $colecciones;
    $filtros['materias'] = $materias;




    //echo(json_encode($filtros));

     return [
         '#theme' => 'archivo_web2',
         '#resultado' => $filtros,
     ];
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
