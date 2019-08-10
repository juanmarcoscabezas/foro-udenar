<?php
$crud = $_GET['login'];

include './conexion.php';

if($crud == "ingreso"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $codigo = $postData['codigo'];
    $password = $postData['password'];

    $sql= "SELECT * FROM usuarios WHERE codigo='$codigo'";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    $errores = array();
    if ($rs->num_rows > 0) {
        $array = array();
        $array['activo'] = true;
        $pass = "";
        while($row = $rs->fetch_assoc()) {
            $array['correo'] = $row['correo'];
            $array['img_url'] = $row['img_url'];
            $pass = $row['password'];
            $array['id_usuario'] = $row['id'];
        }
        if (!password_verify ($password,$pass)){
            array_push($errores, "contraseña no válida");
            $array = $errores;
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
        array_push($errores, "usuario no válido");
        $res = json_encode($errores, JSON_NUMERIC_CHECK);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "registro"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $codigo = $postData['codigo'];
    $password = $postData['password'];
    $nombre = $postData['nombre'];
    $apellido = $postData['apellido'];
    $correo = $postData['correo'];
    $programa = $postData['programa'];
    $img_url = "./assets/user/7.png";
    $activo = 1;
    $tipo = 0;
    $passwordSecure = password_hash($password, PASSWORD_DEFAULT);
    $errores = array();

    $sql= "SELECT codigo FROM usuarios WHERE codigo='$codigo'";
    $rs = mysqli_query($conn, $sql);
    if ($rs->num_rows > 0) {
        array_push($errores, "El código ya se encuentra en uso");
    }
    $sql= "SELECT correo FROM usuarios WHERE correo='$correo'";
    $rs = mysqli_query($conn, $sql);
    if ($rs->num_rows > 0) {
        array_push($errores, "El correo ya se encuentra en uso");
    }
    $sql1 = "INSERT INTO usuarios (codigo,password,nombre,apellido,correo,programa,img_url,activo,tipo) VALUES('$codigo','$passwordSecure','$nombre','$apellido','$correo','$programa','$img_url','$activo','$tipo')";
    $rs1 = mysqli_query($conn, $sql1);
    mysqli_close($conn);
    if(count($errores) > 0){
        $res = json_encode($errores, JSON_NUMERIC_CHECK);
        echo $res;
    }
}

if($crud == "ingresoAdmin"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $codigo = $postData['codigo'];
    $password = $postData['password'];

    $sql= "SELECT * FROM usuarios WHERE codigo='$codigo'";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    $errores = array();
    if ($rs->num_rows > 0) {
        $array = array();
        $array['activo'] = true;
        $pass = "";
        $tipo = "";
        while($row = $rs->fetch_assoc()) {
            $array['correo'] = $row['correo'];
            $array['img_url'] = $row['img_url'];
            $pass = $row['password'];
            $tipo = $row['tipo'];
            $array['id_usuario'] = $row['id'];
        }
        if (!password_verify ($password,$pass)){
            array_push($errores, "contraseña no válida");
            $array = $errores;
        }else{
            if($tipo != true){
                array_push($errores, "El usuario no tiene permisos de Administrador");
                $array = $errores;
            }
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
        array_push($errores, "usuario no válido");
        $res = json_encode($errores, JSON_NUMERIC_CHECK);
    }
    mysqli_close($conn);
    echo $res;
}

if($crud == "imagen"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $img_url = $postData['img_url'];
    $id_usuario = $postData['id_usuario'];
    $errores = array();

    $sql1 = "UPDATE usuarios SET img_url='$img_url' WHERE id='$id_usuario'";
    $rs1 = mysqli_query($conn, $sql1);

    $sql= "SELECT img_url FROM usuarios WHERE id='$id_usuario'";
    $rs = mysqli_query($conn, $sql);

    if ($rs->num_rows > 0) {
        $array = array();
        while($row = $rs->fetch_assoc()) {
            $array['img_url'] = $row['img_url'];
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }

    mysqli_close($conn);
    echo $res;
}

?>