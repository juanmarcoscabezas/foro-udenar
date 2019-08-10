<?php
$crud = $_GET['action'];

include './conexion.php';

if($crud == "get"){
      $sql= "SELECT encuestas.id,encuestas.titulo,encuestas.pregunta,encuestas.id_usuario,usuarios.correo AS correo FROM encuestas,usuarios WHERE encuestas.id_usuario=usuarios.id ORDER BY encuestas.id DESC;";
      $rs = mysqli_query($conn, $sql);
      $array = array();
      if ($rs) {
          $array = array();
          while ($fila = mysqli_fetch_assoc($rs)) {	
              $array[] = array_map('utf8_encode', $fila);
          }
          $res = json_encode($array, JSON_NUMERIC_CHECK);
      }else{
          $res = null;
          echo mysqli_error($conn);
      }
      mysqli_close($conn);
      echo $res;
}

if($crud == "getById"){
    $id = $_GET['id'];
    $sql= "SELECT * FROM encuestas WHERE id='$id'";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array['encuesta'] = array_map('utf8_encode', $fila);
        }
        $sql= "SELECT COUNT(id) AS positivos FROM respuestas WHERE id_encuesta='$id' AND respuesta='1' GROUP BY id_encuesta";
        $rs = mysqli_query($conn, $sql);
        if ($rs) {
            while ($fila = mysqli_fetch_assoc($rs)) {	
                $array['positivos'] = array_map('utf8_encode', $fila);
            }
        }

        $sql= "SELECT COUNT(id) AS negativos FROM respuestas WHERE id_encuesta='$id' AND respuesta='0' GROUP BY id_encuesta";
        $rs = mysqli_query($conn, $sql);
        if ($rs) {
            while ($fila = mysqli_fetch_assoc($rs)) {	
                $array['negativos'] = array_map('utf8_encode', $fila);
            }
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "post"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $titulo = $postData['titulo'];
    $pregunta = $postData['pregunta'];
    $id_usuario = $postData['id_usuario'];

    $sql1 = "INSERT INTO encuestas (titulo,pregunta,id_usuario) VALUES('$titulo','$pregunta','$id_usuario')";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql= "SELECT * FROM encuestas ORDER BY id DESC";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array[] = array_map('utf8_encode', $fila);
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "delete"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $id = $postData['id'];

    $sql1 = "DELETE FROM entradas WHERE id='$id'";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql= "SELECT * FROM entradas WHERE tipo='e' ORDER BY id DESC";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array[] = array_map('utf8_encode', $fila);
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "deleteencuesta"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $id = $postData['id'];

    $sql1 = "DELETE FROM encuestas WHERE id='$id'";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql= "SELECT * FROM encuestas ORDER BY id DESC";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array[] = array_map('utf8_encode', $fila);
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}
//////////////////////
if($crud == "getRespuestas"){
    $id = $_GET['id'];
    $sql="SELECT * FROM encuestas WHERE id='$id";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array[] = array_map('utf8_encode', $fila);
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "postRespuestas"){

    $id_encuesta = $_GET['id'];

    $postData = json_decode(file_get_contents('php://input'),true);
    $respuesta= $postData['respuesta'];
    $id_usuario= $postData['id_usuario'];
  
    $sql="SELECT * FROM respuestas WHERE id_usuario='$id_usuario' AND id_encuesta='$id_encuesta'";
    $rs = mysqli_query($conn, $sql);
    $errores = array();
    if ($rs->num_rows > 0) {
        array_push($errores, "Usted ya ha votado");
    }else{
        $sql1 = "INSERT INTO respuestas (respuesta, id_encuesta, id_usuario) VALUES('$respuesta','$id_encuesta','$id_usuario')";
        $rs1 = mysqli_query($conn, $sql1);
    }
    mysqli_close($conn);
    if(count($errores) > 0){
        $res = json_encode($errores, JSON_NUMERIC_CHECK);
        echo $res;
    }
}
?>