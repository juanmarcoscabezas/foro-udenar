<?php
$servidor = "localhost";    //Servidor
$usuario = "root";          //Usuario
$clave = "";                //Clave
$bd = "foro_udenar";		//Base de datos

  $conn=mysqli_connect($servidor,$usuario,$clave, $bd);
      
  if(mysqli_connect_errno()){
      echo mysqli_connect_error();
      exit(0);
  }
?>