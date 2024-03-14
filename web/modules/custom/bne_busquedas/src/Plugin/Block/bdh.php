<?php

namespace Drupal\bne_busquedas\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\bne_busquedas\Services\Consultas;
use Symfony\Component\DependencyInjection\ContainerInterface;



/**
 * @Block(
 * id = "bne_busquedas_api_bdh",
 * admin_label = @Translation("Bloque de búsqueda Api BDH"),
 * category = @Translation("Pulsia"),
 * )
 * Class bdh
 * @package Drupal\bne_busquedas\Plugin\Block
 */
class bdh extends BlockBase implements ContainerFactoryPluginInterface
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
            $container->get('bne_busquedas.consultas')
        );
    }

    public function build()
    {
        //Se obtiene el parametro de búsqueda
        $parametro_busqueda =  $this->consultas->get_parameter();

        //Se obtiene el numero de resultados consultando la api de la bdh.
        $response_bdh = $this->consultas->buscar_bdh($parametro_busqueda);

        //Se obtiene el numero de resultados consultando la api de la bdpi.
        $response_bdpi = $this->consultas->buscar_bdpi($parametro_busqueda);

         //Se obtiene el numero de resultados consultando la api de la Hemeroteca digital.
         $response_hd = $this->consultas->buscar_hemeroteca_digital($parametro_busqueda);

        //Se obtiene el numero de resultados consultando la api de Datos BNE.
        $response_datos = $this->consultas->buscar_datos_bne($parametro_busqueda);


        return [
            '#theme' => 'bdh_plantilla',
            '#resultado_bdh' => $response_bdh,
            '#resultado_bdpi' => $response_bdpi,
            '#resultado_hemeroteca' => $response_hd,
            '#resultado_datos' => $response_datos,
            '#parametro' => $parametro_busqueda,
        ];
    }

    /**
     * {@inheritdoc}
     */
       public function getCacheMaxAge()
       {
           return 0;
       }

    /**
     * {@inheritdoc}
     */
    // public function getCacheContexts() {
    //     return ['url.path', 'url.query_args'];
    // }
}
