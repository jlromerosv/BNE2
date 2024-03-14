<?php

namespace Drupal\archivo_web\Services;

use Drupal\Core\Database\DatabaseExceptionWrapper;


class Consultas
{

    // Método que devuelve las condiciones de búsqueda.
    public function get_facetas_condition()
    {
        $materias = $this->get_materia_url();
        $materia_condition = "";
        if ($materias != null) {
            $materia_array = [];
            foreach ($materias as $faceta) {
                array_push($materia_array, "web_bcweb.proposition.thematic_id = " . $faceta);
            }
            $condition = implode(' or ', $materia_array);
            $materia_condition = " and (" . $condition . ")";
        }


        $colecciones = $this->get_coleccion_url();
        $colecciones_condition = "";
        if ($colecciones != null) {
            $colecciones_array = [];
            foreach ($colecciones as $faceta) {
                array_push($colecciones_array, "web_bcweb.proposition.basket_id = " . $faceta);
            }
            $condition = implode(' or ', $colecciones_array);
            $colecciones_condition = " and (" . $condition . ")";
        }

        return $materia_condition . $colecciones_condition;
    }

    //Función que obtiene un array con las materias del parametro materia de la url
    public function get_materia_url()
    {
        $materias = \Drupal::request()->query->get("materia");
        $materias_array = [];
        if ($materias == "" or $materias == null) {
            $materias_array = null;
            return $materias_array;
        } else {
            $materias_array = explode("-", $materias);
            return $materias_array;
        }
    }

    //Función que obtiene un array con las colecciones del parametro coleccion de la url
    public function get_coleccion_url()
    {
        $colecciones = \Drupal::request()->query->get("coleccion");
        $colecciones_array = [];
        if ($colecciones == "" or $colecciones == null) {
            $colecciones_array = null;
            return $colecciones_array;
        } else {
            $colecciones_array = explode("-", $colecciones);
            return $colecciones_array;
        }
    }


    // Método que devuelve las condiciones de búsqueda.
    public function get_query_condition()
    {
        $texto = $this->get_texto_buscar();
        if ($texto != null) {

            $titulo = \Drupal::request()->query->get("titulo");
            $palabras_clave = \Drupal::request()->query->get("palabras-clave");

            if ($titulo == "on") {

                return $this->buscar_en_titulo($texto);
            } elseif ($palabras_clave == "on") {

                return $this->buscar_en_palabras($texto);
            } else {

                return $this->buscar_en_todo($texto);
            }
        } else {
            return "";
        }
    }

    //Funciion que obtiene un array con las palabras a buscar.
    public function get_texto_buscar()
    {
        //variable que contiene el texto del parametro buscar de la url.
        $string = \Drupal::request()->query->get("buscar");
        $splitString = preg_split('/\s+(?=([^"]*"[^"]*")*[^"]*$)/', $string);
        $filteredWords = array();
        foreach ($splitString as $word) {
            if (preg_match('/^".*"$/', $word)) {
                //$filteredWords[] = trim($word, '"');
                $filteredWords[] = $word;
            } else {
                $word = strtolower($word);
                if (strlen($word) >= 4 || in_array($word, array('and', 'or', 'not', 'AND', 'OR', 'NOT'))) {
                    $filteredWords[] = $word;
                }
            }
        }

        // echo '<pre>';
        // print_r($filteredWords);
        // echo '</pre>';

        return $filteredWords;
    }

    //Función que obtiene un array con las palabras a buscar del parametro buscar de la url.
    // public function get_texto_buscar()
    // {
    //     //variable que contiene el texto del parametro buscar de la url.
    //     $buscar = \Drupal::request()->query->get("buscar");

    //     //Texto del parametro de la url buscar sin los caracteres especiales, sin tildes y cambiando ñ por n.
    //     $texto_formateado = $this->quitar_caracteres_especiales($buscar);


    //     //Se convierte el texto del parametro buscar en la url en un array de palabras.
    //     //$texto = explode(" ", $texto_formateado);

    //     $texto = $this->formatearTexto($texto_formateado);

    //     //variable que contiene un array con las palabras que estan entrecomilladas que será utilizado para cotejar las palabras con menos de cuatro letras que si deben buscarse.
    //     $texto_entrecomillado = $this->obtenerPalabrasComillas($texto_formateado);

    //     //Nuevo array donde se añadirán los elememos del array $texto con mas de 3 caracteres.
    //     $textos_a_buscar = [];

    //     /*Se comprueba que el parametro buscar exista en la url o que su valor no sea cadena vacia. Si no esta vacio se recorre el array  $texto que contiene las palabras del parametro buscar y se añaden las palabras mayores de tres caracteres al array $textos_a_buscar.
    //      */
    //     if ($buscar == "" or $buscar == null) {
    //         $textos_a_buscar = null;
    //     } else {
    //         foreach ($texto as $palabra) {
    //             $numero_caracteres = strlen($palabra);

    //             if ($palabra == "OR" | $palabra == "or") {
    //                 $textos_a_buscar[] = strtolower($palabra);
    //             } elseif ($palabra == "AND" | $palabra == "and") {
    //                 $textos_a_buscar[] = strtolower($palabra);
    //             } elseif ($palabra == "NOT" | $palabra == "not") {
    //                 $textos_a_buscar[] = strtolower($palabra);
    //             } elseif ($numero_caracteres > 3) {
    //                 $textos_a_buscar[] = strtolower($palabra);
    //             }
    //             //Si la palabra es mayor de 3 caracteres y no es OR, AND o NOT, se comprueba
    //             //si esta en el array de palabras entrecomilladas y en caso afirmativo se añade al array de palabras a buscar.
    //             else {
    //                 $termino = '"' . $palabra . '"';
    //                 foreach ($texto_entrecomillado as $termino_array) {
    //                     if ($termino_array == $termino) {
    //                         $textos_a_buscar[] = strtolower($palabra);
    //                     }
    //                 }
    //             }
    //         }
    //         // echo '<pre>';
    //         // print_r($textos_a_buscar);
    //         // echo '</pre>';

    //         return $textos_a_buscar;
    //     }
    // }


    //Metodo que devuelve un array con las palabras entrecomilladas que hay en el texto.
    public function obtenerPalabrasComillas($string)
    {
        if (preg_match_all('/"([^"]+)"/', $string, $entrecomilladas)) {
            return $entrecomilladas[0];
        } else {
            return null;
        }
    }

    // Método que da formato al array de térmimos de búsqueda eleminando elementos vacios y los espacios al inicio y final de cada término.
    public function formatearTexto($string)
    {

        // Se crea el array usando " como delimitador
        $array = explode('"', $string);

        //Se elimina el primer elemento del array si esta vacio y en caso contrario se divide en palabras añadiendolas al inicio del array.
        if ($array[0] == " ") {
            unset($array[0]);
        } else {
            $subArray = array_reverse(explode(' ', $array[0]));
            unset($array[0]);
            foreach ($subArray as &$value) {
                array_unshift($array, $value);
            }
        }

        //Se elimina el último elemento del array si esta vacio y en caso contrario se divide en palabras añadiendolas al final del array.
        $ultimo = count($array) - 1;
        if ($array[$ultimo] == " ") {
            unset($array[count($array)]);
        } else {
            $ultimo = count($array) - 1;
            $subArray1 = explode(' ', $array[$ultimo]);
            unset($array[$ultimo]);
            foreach ($subArray1 as &$value) {
                array_push($array, $value);
            }
        }

        //Se eliminan los elementos vacios y los espacios al inicio y final de cada término de búsqueda.
        foreach ($array as $key => $value) {
            if ($value == '') {
                unset($array[$key]);
            } else {
                $array[$key] = trim($array[$key]);
            }
        }

        return $array;
    }

    // Metodo que comprueba si la palabra o texto esta entrecomillado
    public function estaEntrecomillado($cadena) {
        return (substr($cadena, 0, 1) === '"' && substr($cadena, -1) === '"') || (substr($cadena, 0, 1) === "'" && substr($cadena, -1) === "'");
    }

    // Metodo que elimina las comillas a un texto
    public function quitarComillas($string) {
        // Comprobamos si el string empieza y termina con comillas
        if (substr($string, 0, 1) == '"' && substr($string, -1) == '"') {
          // Si es así, eliminamos las comillas y devolvemos el string resultante
          return substr($string, 1, -1);
        } else {
          // Si no, devolvemos el string original
          return $string;
        }
      }


    // Método que devuelve el fragmento de la consulta sql para buscar en el campo título.
    public function buscar_en_titulo($texto)
    {
        $title_array = [];
        $primer = true;
        $operador_OR = false;
        $operador_AND = false;
        $operador_NOT = false;

        foreach ($texto as $palabra) {

            if ($palabra == "or") {
                array_push($title_array, " OR ");
                $operador_OR = true;
                $operador_AND = false;
                $operador_NOT = false;
            } elseif ($palabra == "and") {
                array_push($title_array, " AND ");
                $operador_AND = true;
                $operador_OR = false;
                $operador_NOT = false;
            } elseif ($palabra == "not") {
                $operador_NOT = true;
                $operador_AND = false;
                $operador_OR = false;
            } else {

                if ($operador_OR == true) {

                    $esTextoEntrecomillado = $this->estaEntrecomillado($palabra);
                    if ( $esTextoEntrecomillado){

                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')");

                        $word = $this->quitarComillas($palabra);

                        $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "'
                        OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "'
                        OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %'
                        OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %'
                        OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')";

                        array_push($title_array, $consulta);
                    }
                    else{
                        // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");

                        $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%'
                        OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')";

                        array_push($title_array, $consulta);
                    }
                    $operador_OR = false;

                } elseif ($operador_AND == true) {

                    $esTextoEntrecomillado = $this->estaEntrecomillado($palabra);
                    if ( $esTextoEntrecomillado){

                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')");

                        $word = $this->quitarComillas($palabra);

                        $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "'
                        OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "'
                        OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %'
                        OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %'
                        OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')";

                        array_push($title_array, $consulta);
                    }
                    else{
                        // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");

                        $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%'
                        OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')";

                        array_push($title_array, $consulta);
                    }
                    $operador_AND = false;

                } elseif ($operador_NOT == true) {

                    $esTextoEntrecomillado = $this->estaEntrecomillado($palabra);
                    if ( $esTextoEntrecomillado){

                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "AND (UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '" . $word . "' OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '% " . $word . "' OR web_bcweb.proposition.seedtitle NOT ILIKE '% " . $word . " %' OR web_bcweb.proposition.seedtitle NOT ILIKE '" . $word . " %' OR web_bcweb.proposition.seedtitle NOT ILIKE '% " . $word . "')");

                        $word = $this->quitarComillas($palabra);
                        $consulta = "AND (UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '% " . $word . "'
                        OR web_bcweb.proposition.seedtitle NOT ILIKE '" . $word . "'
                        OR web_bcweb.proposition.seedtitle NOT ILIKE '% " . $word . " %'
                        OR web_bcweb.proposition.seedtitle NOT ILIKE '" . $word . " %'
                        OR web_bcweb.proposition.seedtitle NOT ILIKE '% " . $word . "')";

                        array_push($title_array, $consulta);
                    }
                    else{

                        // array_push($title_array, "AND (UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle NOT ILIKE '%" . $palabra . "%')");

                        $consulta = "AND (UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '%" . $palabra . "%'
                        OR web_bcweb.proposition.seedtitle NOT ILIKE '%" . $palabra . "%')";

                        array_push($title_array, $consulta);
                    }


                    $operador_NOT = false;
                } else {

                    if ($primer == true) {

                        $esTextoEntrecomillado = $this->estaEntrecomillado($palabra);
                        if ( $esTextoEntrecomillado){

                            // $word = $this->quitarComillas($palabra);
                            // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "'  OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')");

                            $word = $this->quitarComillas($palabra);
                            $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "'
                             OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %'
                             OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %'
                             OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "'
                             OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "'
                             OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %'
                             OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %'
                             OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')";

                             array_push($title_array, $consulta);

                        }
                        else{

                            // array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");

                            $consulta = "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%'
                            OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')";

                            array_push($title_array, $consulta);
                        }

                        global $primer;
                        $primer = false;

                    } else {

                        $esTextoEntrecomillado = $this->estaEntrecomillado($palabra);
                        if ( $esTextoEntrecomillado){

                            // $word = $this->quitarComillas($palabra);
                            // array_push($title_array, " AND (UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "'  OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %' OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')");

                            $word = $this->quitarComillas($palabra);

                            $consulta = " AND (UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . " %'
                            OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . "'
                            OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '" . $word . " %'
                            OR UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '% " . $word . "'
                            OR web_bcweb.proposition.seedtitle ILIKE '" . $word . "'
                            OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . " %'
                            OR web_bcweb.proposition.seedtitle ILIKE '" . $word . " %'
                            OR web_bcweb.proposition.seedtitle ILIKE '% " . $word . "')";

                            array_push($title_array, $consulta);
                        }
                        else{
                            // array_push($title_array, " AND (UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");

                            $consulta = " AND (UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%'
                            OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')";

                            array_push($title_array, $consulta);


                        }

                    }
                }
            }
        }
        $title_condition = "(" . implode(' ', $title_array) . ") ";
        $query_condition = "and " . $title_condition;
       // echo ($query_condition);
        return $query_condition;
    }

    // Método que devuelve el fragmento de la consulta sql para buscar en el campo palabras claves.
    public function buscar_en_palabras($texto)
    {
        $title_array = [];
        $primero = true;
        $operador_OR = false;
        $operador_AND = false;
        $operador_NOT = false;

        foreach ($texto as $palabra) {

            if ($palabra == "or") {
                array_push($title_array, " OR ");
                $operador_OR = true;
                $operador_AND = false;
                $operador_NOT = false;
            } elseif ($palabra == "and") {
                array_push($title_array, " AND ");
                $operador_AND = true;
                $operador_OR = false;
                $operador_NOT = false;
            } elseif ($palabra == "not") {
                $operador_NOT = true;
                $operador_AND = false;
                $operador_OR = false;
            } else {

                if ($operador_OR == true) {
                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){

                        echo ("linea 478");

                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                        $word = $this->quitarComillas($palabra);

                        $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "'
                        OR web_bcweb.keyword.name ILIKE '" . $word . "'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '" . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . "'))";

                        array_push($title_array, $consulta);

                    }
                    else{
                        // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");

                        $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%'
                        OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))";

                        array_push($title_array, $consulta);
                    }
                    $operador_OR = false;

                } elseif ($operador_AND == true) {

                    echo ("linea 511");

                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){
                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                        $word = $this->quitarComillas($palabra);

                        $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "'
                        OR web_bcweb.keyword.name ILIKE '" . $word . "'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '" . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . "'))";

                        array_push($title_array, $consulta);

                    }
                    else{
                        // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");

                        $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%'
                        OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))";

                        array_push($title_array, $consulta);
                    }
                    $operador_AND = false;

                } elseif ($operador_NOT == true) {

                    echo ("linea 546");

                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){
                        // $word = $this->quitarComillas($palabra);
                        // array_push($title_array, "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                        $word = $this->quitarComillas($palabra);

                        $consulta = "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . "'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %'
                        OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "'
                        OR web_bcweb.keyword.name ILIKE '" . $word . "'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '" . $word . " %'
                        OR web_bcweb.keyword.name ILIKE '% " . $word . "'))";

                        array_push($title_array, $consulta);

                    }
                    else{
                        // array_push($title_array, "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");

                        $consulta = "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                        (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%'
                        OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))";

                        array_push($title_array, $consulta);
                    }

                    $operador_NOT = false;

                } else {

                    echo ("linea 582");

                    if ($primero == true) {
                        global $primero;

                        echo ("es primero");

                        $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                        if ( $espalabraEntrecomillada){
                            // $word = $this->quitarComillas($palabra);
                            // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                            $word = $this->quitarComillas($palabra);

                            $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                            (UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . "'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "'
                            OR web_bcweb.keyword.name ILIKE '" . $word . "'
                            OR web_bcweb.keyword.name ILIKE '% " . $word . " %'
                            OR web_bcweb.keyword.name ILIKE '" . $word . " %'
                            OR web_bcweb.keyword.name ILIKE '% " . $word . "'))";

                            array_push($title_array, $consulta);

                        }
                        else{
                            // array_push($title_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");

                            $consulta = "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                            (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%'
                            OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))";

                            array_push($title_array, $consulta);
                        }

                        $this->$primero = false;

                    } else {
                        $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                        if ( $espalabraEntrecomillada){
                            // $word = $this->quitarComillas($palabra);
                            // array_push($title_array, "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                            $word = $this->quitarComillas($palabra);

                            $consulta = "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                            (UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . "'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %'
                            OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "'
                            OR web_bcweb.keyword.name ILIKE '" . $word . "'
                            OR web_bcweb.keyword.name ILIKE '% " . $word . " %'
                            OR web_bcweb.keyword.name ILIKE '" . $word . " %'
                            OR web_bcweb.keyword.name ILIKE '% " . $word . "'))";

                            array_push($title_array, $consulta);

                        }
                        else{
                            // array_push($title_array, "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");

                            $consulta = "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where
                            (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%'
                            OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))";

                            array_push($title_array, $consulta);
                        }

                    }
                }
            }
        }
        $title_condition = implode(' ', $title_array);
        $query_condition = "and (" . $title_condition . ")";
        //echo ($query_condition);
        return $query_condition;
    }

    // Método que devuelve el fragmento de la consulta sql para buscar en el campo título y en palabras clave.
    public function buscar_en_todo($texto)
    {
        $title_array = [];
        $primer = true;
        $operador_OR = false;
        $operador_AND = false;
        $operador_NOT = false;
        foreach ($texto as $palabra) {

            if ($palabra == "or") {
                array_push($title_array, " OR ");
                $operador_OR = true;
                $operador_AND = false;
                $operador_NOT = false;
            } elseif ($palabra == "and") {
                array_push($title_array, " AND ");
                $operador_AND = true;
                $operador_OR = false;
                $operador_NOT = false;
            } elseif ($palabra == "not") {
                $operador_NOT = true;
                $operador_AND = false;
                $operador_OR = false;
            } else {

                if ($operador_OR == true) {
                    array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");
                    $operador_OR = false;
                } elseif ($operador_AND == true) {
                    array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");
                    $operador_AND = false;
                } elseif ($operador_NOT == true) {
                    array_push($title_array, "AND (UNACCENT(web_bcweb.proposition.seedtitle) NOT ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle NOT ILIKE '%" . $palabra . "%')");
                    $operador_NOT = false;
                } else {
                    if ($primer == true) {
                        global $primer;
                        array_push($title_array, "(UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");
                        $primer = false;
                    } else {
                        array_push($title_array, " AND (UNACCENT(web_bcweb.proposition.seedtitle) ILIKE '%" . $palabra . "%' OR web_bcweb.proposition.seedtitle ILIKE '%" . $palabra . "%')");
                    }
                }
            }
        }
        $title_condition = implode('', $title_array);

        // echo '<pre>';
        // print_r($title_condition);
        // echo '</pre>';

        $palabras_array = [];
        $primeraPalabra = true;
        $oper_OR = false;
        $oper_AND = false;
        $oper_NOT = false;
        foreach ($texto as $palabra) {

            if ($palabra == "or") {
                array_push($palabras_array, " OR ");
                $oper_OR = true;
                $oper_AND = false;
                $oper_NOT = false;
            } elseif ($palabra == "and") {
                array_push($palabras_array, " AND ");
                $oper_AND = true;
                $oper_OR = false;
                $oper_NOT = false;
            } elseif ($palabra == "not") {
                $oper_NOT = true;
                $oper_AND = false;
                $oper_OR = false;
            } else {

                if ($oper_OR == true) {
                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){
                        $word = $this->quitarComillas($palabra);
                        array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                    }
                    else{
                        array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");
                    }
                    $oper_OR = false;

                } elseif ($oper_AND == true) {

                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){
                        $word = $this->quitarComillas($palabra);
                        array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                    }
                    else{
                        array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");
                    }
                    $oper_AND = false;

                } elseif ($oper_NOT == true) {


                    $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                    if ( $espalabraEntrecomillada){
                        $word = $this->quitarComillas($palabra);
                        array_push($palabras_array, "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                    }
                    else{
                        array_push($palabras_array, "AND web_bcweb.proposition.uid NOT IN (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");
                    }

                    $oper_NOT = false;

                } else {
                    if ($primeraPalabra == true) {
                        global $primero;

                        $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                        if ( $espalabraEntrecomillada){
                            $word = $this->quitarComillas($palabra);
                            array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                        }
                        else{
                            array_push($palabras_array, "web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");
                        }

                        $this->$primeraPalabra = false;

                    } else {
                        $espalabraEntrecomillada = $this->estaEntrecomillado($palabra);
                        if ( $espalabraEntrecomillada){
                            $word = $this->quitarComillas($palabra);
                            array_push($palabras_array, "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '" . $word . " %' OR UNACCENT(web_bcweb.keyword.name) ILIKE '% " . $word . "' OR web_bcweb.keyword.name ILIKE '% " . $word . " %' OR web_bcweb.keyword.name ILIKE '" . $word . " %' OR web_bcweb.keyword.name ILIKE '% " . $word . "'))");

                        }
                        else{
                            array_push($palabras_array, "AND web_bcweb.proposition.uid in (select web_bcweb.proposition.uid from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where (UNACCENT(web_bcweb.keyword.name) ILIKE '%" . $palabra . "%' OR web_bcweb.keyword.name ILIKE '%" . $palabra . "%'))");
                        }

                    }
                }
            }
        }

        $palabras_condition = implode(' ', $palabras_array);
        $query_condition = "and (" . $title_condition . ") and (" . $palabras_condition . ")";


        // echo '<pre>';
        // print_r($query_condition);
        // echo '</pre>';



        return $query_condition;
    }






    /* Función que elimina los caracteres especiales*/
    function quitar_caracteres_especiales($cadena)
    {
        $caracteres_especiales = array("[", "]", ".", ";", "{", "}", "?", "¿", "!", "$", "¡");
        $texto_formateado = str_replace($caracteres_especiales, '', $cadena);
        return $texto_formateado;
    }

    /* Función que elimina los acentos y letras ñ*/
    function quitar_acentos($cadena)
    {
        $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿ';
        $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyyby';
        $cadena = utf8_decode($cadena);
        $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
        return utf8_encode($cadena);
    }


    // Método que devuelve el valor de un  parametro de la url.
    public function get_parameter($parameter)
    {
        $parametro = \Drupal::request()->query->get($parameter);
        return $parametro;
    }

    //Método que devuelve un array con las paralabras clave asociadas a un registro.
    public function get_palabras_clave($id)
    {

        try {
            //Se inicializa la variable de conexión a base de datos.
            $database = \Drupal\Core\Database\Database::getConnection('default', 'external');

            //Se genera la consulta que traerá las palabras clave asociadas al id suministrado mediante parámetro.
            $query = $database->query("select web_bcweb.keyword.name from web_bcweb.proposition left join web_bcweb.proposition_keyword on web_bcweb.proposition_keyword.proposition_id = web_bcweb.proposition.uid left join web_bcweb.keyword on web_bcweb.proposition_keyword.keyword_id = web_bcweb.keyword.uid where web_bcweb.proposition.uid = " . $id . ";");

            $result = $query->fetchAll();

            //creamos la variable de tipo array con las palabras clave asociadas al registro con el id suministrado.
            $palabras_clave = array();

            //Recorremos el resultado de la consulta y creamos el array con los valores a mostrar en el template.
            foreach ($result as $field) {
                array_push($palabras_clave, $field->name);
            }


            return $palabras_clave;
        } catch (DatabaseExceptionWrapper $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        } catch (\Exception $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        }
    }



    //Método que realiza la consulta a la base de datos archivo de la web.
    public function get_archivos_web()
    {
        try {
            //Se inicializa la variable de conexión a base de datos.
            $database = \Drupal\Core\Database\Database::getConnection('default', 'external');

            //Variable que contiene la condición de busqueda del campo texto del formulario.
            $query_condition = $this->get_query_condition();

           // echo($query_condition);

            //Variable que contiene la condición de busqueda para las facetas.
            $query_facetas_condition = $this->get_facetas_condition();

            //variable que determina el nuemro de resultados a mostrar por página.
            $limit = 24;

            //Variable que obtiene el numero de pagina a mostrar obtenido el parametro page de la url.
            $page = $this->get_parameter("page");

            //Variable utilizada para determina el primer registro a mostrar en la consulta.
            $offset = $limit * ($page - 1);
            if ($page == null) {  //Si no existe el parametro page en la url se establece el valor de offset a 1.
                $offset = 1;
            }

            //Parámetro orden de la url
            $parametro_orden = $this->get_parameter("orden");

            //Se establece el orden por defecto en título ascendente
            $orden = "ORDER BY web_bcweb.proposition.seedtitle ASC";

            //Se evaluan las distintas conbinaciones de ordenación
            if ($parametro_orden == "titulo_desc"){
                $orden = "ORDER BY web_bcweb.proposition.seedtitle DESC";
            }
            if ($parametro_orden == "titulo_asc"){
                $orden = "ORDER BY web_bcweb.proposition.seedtitle ASC";
            }
            if ($parametro_orden == "fecha_asc"){
                $orden = "ORDER BY web_bcweb.proposition.createdon ASC";
            }
            if ($parametro_orden == "fecha_desc"){
                $orden = "ORDER BY web_bcweb.proposition.createdon DESC";
            }



            //Consulta que trae los registros.
            $query = $database->query("select web_bcweb.proposition.uid, web_bcweb.proposition.createdon, web_bcweb.proposition.url, web_bcweb.proposition.additionalurls, web_bcweb.proposition.seedtitle, web_bcweb.proposition.active, web_bcweb.basket.name basket, web_bcweb.proposition.basket_id, web_bcweb.proposition.thematic_id, web_bcweb.thematic.name tematica from web_bcweb.proposition left join web_bcweb.basket on web_bcweb.proposition.basket_id = basket.uid left join web_bcweb.thematic on proposition.thematic_id = web_bcweb.thematic.uid where 1 = 1 " . $query_condition . $query_facetas_condition . $orden . " limit " . $limit . " offset " . $offset . ";");

            $result = $query->fetchAll();

            //creamos la variable de tipo array que pasaremos al template.
            $resultado = array();



            //Recorremos el resultado de la consulta y creamos el array con los valores a mostrar en el template.
            foreach ($result as $field) {
                $palabras_clave = $this->get_palabras_clave($field->uid);
                $registro = array(
                    "titulo" => $field->seedtitle,
                    "url" => $field->url,
                    "url_alternativa" => $field->additionalurls,
                    "coleccion" => $field->basket,
                    "tematica" => $field->tematica,
                    "palabras_clave" => $palabras_clave,
                );

                $resultado['registros'][] = $registro; //Se añade el registro
            }

            //Consulta que trae el numero de registros
            $query_count = $database->query("select count(*) as total from web_bcweb.proposition left join  web_bcweb.basket on  web_bcweb.proposition.basket_id =  web_bcweb.basket.uid left join  web_bcweb.thematic on  web_bcweb.proposition.thematic_id =  web_bcweb.thematic.uid where 1 = 1 " . $query_condition . $query_facetas_condition . ";");

            $result_count = $query_count->fetchAll();

            //variable que contiene el total de registros de la consulta.
            $total_resultados = 0;

            //Recorremos el resultado de la consulta para optener el numero de registros.
            foreach ($result_count as $field) {
                $total_resultados = $field->total;
            }

            //calculamos el numero de paginas dividiendo el numero de registros total entre el número de registros a mostrar por página.
            $registros_pagina = ceil($total_resultados / $limit);

            //Se añade el total de paginas a la variable que se pasa al template.
            if ($total_resultados > 0) {
                $resultado['total-resultados'] = $total_resultados;
            }
            if ($page < 1 || $page == null) {
                $page = 1;
            }
            $resultado['page'] = $page;

            $resultado['total'] = $registros_pagina;

            $termino = $this->get_parameter("buscar");
            $resultado['termino'] = trim($termino, '"');


            // echo json_encode($resultado, JSON_PRETTY_PRINT);

            //Se retorna el array con los datos necesarios para mostrar en el template.
            return $resultado;
        } catch (DatabaseExceptionWrapper $e) {

            \Drupal::logger('Archivos de la web')->error($e->getMessage());

            $resultado_error = array(
                "mensaje_error" => "Búsqueda incorrecta",
            );
            return $resultado_error;
        } catch (\Exception $e) {
            \Drupal::logger('Archivosdelaweb')->error($e->getMessage());
        }
    }


    public function groupByName($query_result)
    {
        $grouped_array = array();

        foreach ($query_result as $row) {
            $name = $row['name'];
            if (!isset($grouped_array[$name])) {
                $grouped_array[$name] = array();
            }
            array_push($grouped_array[$name], $row);
        }

        return $grouped_array;
    }





    //Método que realiza la consulta a base de datos para obtener las colecciones.
    public function get_colecciones()
    {
        try {
            $database = \Drupal\Core\Database\Database::getConnection('default', 'external');
            $query = $database->query("select web_bcweb.apartado.uid as uid, web_bcweb.apartado.orden, web_bcweb.apartado.nombre, web_bcweb.basket.uid as id, web_bcweb.basket.name, web_bcweb.basket.active FROM web_bcweb.apartado_basket join web_bcweb.apartado on web_bcweb.apartado.uid = web_bcweb.apartado_basket.id_apartado join web_bcweb.basket on web_bcweb.basket.uid = web_bcweb.apartado_basket.id_basket order by web_bcweb.apartado.orden, web_bcweb.basket.name asc;");
            $result = $query->fetchAll();

            // echo '<pre>';
            // print_r($result);
            // echo '</pre>';

            $grouped_array_colecciones = array();

            //Se agrupan los resultados por el campo nombre.
            foreach ($result as $field) {
                $name = $field->nombre;
                if (!isset($grouped_array_colecciones[$name])) {
                    $grouped_array_colecciones[$name] = array();
                }
                array_push($grouped_array_colecciones[$name], $field);
            }


            // echo '<pre>';
            // print_r($grouped_array_colecciones);
            // echo '</pre>';

            //variable que  contiene un array con los resultados de la consulta de colecciones
            // $colecciones = array();

            //Variable utilizada para agrupar las colecciones. el valor determina la coleccion de primer nivel donde incluir la subcolección.
            // $coleccion_activa = "";

            //Se recorre cada uno de los registros. Si existe la coleccion de primer nivel se crea la subcolección y se le añade. Si no existe la colección de primer nivel se crea y a continuación se crea la subcolección y se le añade.
            // foreach ($result as $field) {
            //     if ($coleccion_activa != $field->nombre) { //si no tiene valor se asigna el id de la coleccion
            //         $coleccion_activa = $field->nombre;
            //         $colecciones[$field->nombre] = [];
            //         $subcolección = array("id" => $field->id, "name" => $field->name, "uid" => $field->uid);
            //         array_push($colecciones[$field->nombre], $subcolección);
            //     } else {
            //         $subcolección = array("id" => $field->id, "name" => $field->name, "uid" => $field->uid);
            //         array_push($colecciones[$field->nombre], $subcolección);
            //     }
            // }

            // echo '<pre>';
            // print_r($colecciones);
            // echo '</pre>';

            //return $colecciones;
            return $grouped_array_colecciones;
        } catch (DatabaseExceptionWrapper $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        } catch (\Exception $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        }
    }

    //Método que realiza la consulta a base de datos para obtener las materias.
    public function get_materias()
    {
        try {
            $database = \Drupal\Core\Database\Database::getConnection('default', 'external');
            $query = $database->query("select web_bcweb.temotes.uid as uid, web_bcweb.temotes.nombre, web_bcweb.temotes.orden, web_bcweb.thematic.uid as id, web_bcweb.thematic.name FROM web_bcweb.temotes_thematic join web_bcweb.temotes on web_bcweb.temotes.uid = web_bcweb.temotes_thematic.id_temotes join web_bcweb.thematic on web_bcweb.thematic.uid = web_bcweb.temotes_thematic.id_thematic order by web_bcweb.temotes.orden, web_bcweb.thematic.name asc ;");
            $result = $query->fetchAll();

            $grouped_array_materias = array();

            //Se agrupan los resultados por el campo nombre.
            foreach ($result as $field) {
                $name = $field->nombre;
                if (!isset($grouped_array_materias[$name])) {
                    $grouped_array_materias[$name] = array();
                }
                array_push($grouped_array_materias[$name], $field);
            }

            // echo '<pre>';
            // print_r($grouped_array_materias);
            // echo '</pre>';



            //variable que  contiene un array con los resultados de la consulta de colecciones
            // $materias = array();

            //Variable utilizada para agrupar las materias. el valor determina la materia de primer nivel donde incluir la submateria.
            // $materia_activa = "";

            //Se recorre cada uno de los registros. Si existe la materia de primer nivel se crea la submateria y se le añade. Si no existe la materia de primer nivel se crea y a continuación se crea la submateria y se le añade.
            // foreach ($result as $field) {
            //     if ($materia_activa != $field->nombre) { //si no tiene valor se asigna el id de la coleccion
            //         $materia_activa = $field->nombre;
            //         $materias[$field->nombre] = [];
            //         $submateria = array("id" => $field->id, "name" => $field->name, "uid" => $field->uid);
            //         array_push($materias[$field->nombre], $submateria);
            //     } else {
            //         $submateria = array("id" => $field->id, "name" => $field->name, "uid" => $field->uid);
            //         array_push($materias[$field->nombre], $submateria);
            //     }
            // }

            //return $materias;
            return $grouped_array_materias;
        } catch (DatabaseExceptionWrapper $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        } catch (\Exception $e) {
            \Drupal::logger('Archivos de la web')->error($e->getMessage());
        }
    }
}
