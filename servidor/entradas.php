<?php
$crud = $_GET['action'];

include './conexion.php';

if($crud == "get"){
      $sql= "SELECT entradas.id,entradas.titulo,entradas.descripcion,entradas.imagen_url,entradas.id_usuario,entradas.fecha_creacion,usuarios.correo as correo FROM entradas,usuarios WHERE entradas.tipo='e' AND entradas.id_usuario=usuarios.id ORDER BY entradas.id DESC";
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
    $sql= "SELECT * FROM entradas WHERE id='$id'";
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

if($crud == "postEntradas"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $titulo = $postData['titulo'];
    $descripcion = $postData['descripcion'];
    $url = $postData['imagen_url'];
    $categoria = $postData['categoria'];
    $activo= 1;
    $fecha_creacion = $postData['fecha_creacion'];
    $id_usuario = $postData['id_usuario'];
    $tipo = "e";

    $sql1 = "INSERT INTO entradas (titulo,descripcion,imagen_url,tipo,activo,fecha_creacion,id_usuario) VALUES('$titulo','$descripcion','$url','$tipo','$activo','$fecha_creacion','$id_usuario')";
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

if($crud == "updateEntradas"){
    $id = $_GET['id'];
    $postData = json_decode(file_get_contents('php://input'),true);
    $titulo = $postData['titulo'];
    $descripcion = $postData['descripcion'];
    $url = $postData['imagen_url'];
    $categoria = $postData['categoria'];
    $id_usuario = $postData['id_usuario'];

    $sql1 = "UPDATE entradas SET titulo = '$titulo', descripcion = '$descripcion', imagen_url = '$url' WHERE id='$id'";
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

if($crud == "getComentarios"){
    $id = $_GET['id'];
    $sql="SELECT comentarios.id,comentarios.id_usuario,comentarios.fecha_creacion,comentarios.descripcion,usuarios.correo,usuarios.img_url AS img FROM comentarios JOIN usuarios,entradas WHERE comentarios.id_usuario=usuarios.id AND entradas.id=comentarios.id_entrada AND id_entrada='$id' ORDER BY id DESC";
    //$sql= "SELECT * FROM comentarios WHERE id_entrada='$id' ORDER BY id DESC";
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

if($crud == "postComentarios"){

    $id = $_GET['id'];

    $postData = json_decode(file_get_contents('php://input'),true);
    $id_entrada = $postData['id_entrada'];
    $id_usuario = $postData['id_usuario'];
    $descripcion = $postData['descripcion'];
    $fecha_creacion = $postData['fecha_creacion'];
    $activo = 1;

    $sql1 = "INSERT INTO comentarios (id_entrada,id_usuario,descripcion,fecha_creacion,activo) VALUES('$id_entrada','$id_usuario','$descripcion','$fecha_creacion','$activo')";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql="SELECT comentarios.id,comentarios.id_usuario,comentarios.fecha_creacion,comentarios.descripcion,usuarios.correo,usuarios.img_url AS img FROM comentarios JOIN usuarios,entradas WHERE comentarios.id_usuario=usuarios.id AND entradas.id=comentarios.id_entrada AND id_entrada='$id' ORDER BY id DESC";
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

if($crud == "deleteComentarios"){

    $id_entrada = $_GET['id'];

    $postData = json_decode(file_get_contents('php://input'),true);
    $id = $postData['id'];

    $sql1 = "DELETE FROM comentarios WHERE id='$id'";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql="SELECT comentarios.id,comentarios.id_usuario,comentarios.fecha_creacion,comentarios.descripcion,usuarios.correo,usuarios.img_url AS img FROM comentarios JOIN usuarios,entradas WHERE comentarios.id_usuario=usuarios.id AND entradas.id=comentarios.id_entrada AND id_entrada='$id_entrada' ORDER BY id DESC";
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


?>