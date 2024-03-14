<?php

namespace Drupal\bne_busquedas\Services;

use GuzzleHttp\Exception\GuzzleException;
use LDAP\Result;
use JsonException;

class Consultas
{

    // Método que devuelve el parametro buscar de la url
    public function get_parameter()
    {
        $parametro = \Drupal::request()->query->get('search_api_fulltext');
        return $parametro;
    }

    //Método que realiza la consulta a la api de la bdh con el pararametro suministrado.
    public function buscar_bdpi($parametro)
    {
        try {
            $method = "POST";
            $endpoint = "http://www.iberoamericadigital.net/BDPI/GetHits.do?text=" . $parametro;
            $options = [
                'timeout' => 10,
                'Accept' => 'application/json;charset=ISO-8859-1',
                'content-type' => 'application/json',
            ];

            $client = \Drupal::httpClient();
            $response = $client->request($method, $endpoint, $options);

            if ($response->getStatusCode() == 200) {
                $result = json_decode($response->getBody(), TRUE);
                //echo($response->getBody());
                return $result;
            }
        } catch (GuzzleException $error) {
            \Drupal::logger('Consulta api BDPI')->error($error);
        }
    }

    //Método que realiza la consulta a la api de la bdh con el pararametro suministrado.
    public function buscar_bdh($parametro)
    {
        try {
            $method = "POST";
            $endpoint = "http://bdh.bne.es/bnesearch/GetHits.do?text=" . $parametro;
            $options = [
                'timeout' => 10,
                'Accept' => 'application/json;charset=ISO-8859-1',
                'content-type' => 'application/json',
            ];

            $client = \Drupal::httpClient();
            $response = $client->request($method, $endpoint, $options);

            if ($response->getStatusCode() == 200) {
                $result = json_decode($response->getBody(), TRUE);
                //echo($response->getBody());
                return $result;
            }
        } catch (GuzzleException $error) {
            \Drupal::logger('Consulta api BDH')->error($error);
        }
    }


    //Método que realiza la consulta a la api de la bdh con el pararametro suministrado.
    public function buscar_hemeroteca_digital($parametro)
    {
        try {
            $method = "GET";
            $endpoint = "https://hemerotecadigital.bne.es/hd/es/search?w=" . $parametro;


            $options = [
                'timeout' => 10,
                'Accept' => 'application/json;charset=ISO-8859-1',
                'content-type' => 'application/json',
            ];

            $client = \Drupal::httpClient();
            $response = $client->request($method, $endpoint, $options);

            if ($response->getStatusCode() == 200) {
                $result = json_decode($response->getBody());
                //echo($response->getBody());
                return $result;
            }
        } catch (GuzzleException $error) {
            \Drupal::logger('Consulta api Hemeroteca digital')->error($error);
        }
    }


    //Método que realiza la consulta a la api de datos bne con el pararametro suministrado. En esta api el resultado viene en html y por ello utilizamos la funcion strip_tags para eliminar las etiquetas y poder formatear a json.
    public function buscar_datos_bne($parametro)
    {
        try {
            $method = "GET";
            $endpoint = "https://datos.bne.es/apisearch?s=" . $parametro;


            $options = [
                'timeout' => 10,
                'Accept' => 'application/json;charset=ISO-8859-1',
                'content-type' => 'application/json',
            ];

            $client = \Drupal::httpClient();
            $response = $client->request($method, $endpoint, $options);

            if ($response->getStatusCode() == 200) {
                $result = json_decode(strip_tags($response->getBody()));
                //echo($response->getBody());
                return $result;
            }
        } catch (GuzzleException $error) {
            \Drupal::logger('Consulta api Datos BNE')->error($error);
        }
    }


    function format_bdh_object($mystring)
    {
        $results = explode(",", $mystring);
        //dpm($results);
    }
}
