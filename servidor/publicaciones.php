<?php
$crud = $_GET['action'];

include './conexion.php';

if($crud == "get"){
      $sql= "SELECT entradas.id,entradas.titulo,entradas.descripcion,entradas.imagen_url,entradas.id_usuario,entradas.fecha_creacion,usuarios.correo as correo FROM entradas,usuarios WHERE entradas.tipo='p' AND entradas.id_usuario=usuarios.id ORDER BY entradas.id DESC;";
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

if($crud == "post"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $titulo = $postData['titulo'];
    $descripcion = $postData['descripcion'];
    $url = $postData['imagen_url'];
    $categoria = $postData['categoria'];
    $activo= 1;
    $fecha_creacion = $postData['fecha_creacion'];
    $id_usuario = $postData['id_usuario'];
    $tipo = "p";
    
    $sql1 = "INSERT INTO entradas (titulo,descripcion,imagen_url,tipo,activo,fecha_creacion,id_usuario) VALUES('$titulo','$descripcion','$url','$tipo','$activo','$fecha_creacion','$id_usuario')";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql= "SELECT * FROM entradas WHERE tipo='p' ORDER BY id DESC";
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
  
    $sql= "SELECT * FROM entradas WHERE tipo='p' ORDER BY id DESC";
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