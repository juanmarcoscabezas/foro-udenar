-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2018 at 03:56 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foro_udenar`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(10) NOT NULL,
  `id_entrada` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `descripcion` text CHARACTER SET utf8 NOT NULL,
  `fecha_creacion` varchar(20) CHARACTER SET utf8 NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_entrada`, `id_usuario`, `descripcion`, `fecha_creacion`, `activo`) VALUES
(95, 32, 11, 'comentario', '12-06-2018', 1),
(96, 32, 9, 'asas', '12-06-2018', 1);

-- --------------------------------------------------------

--
-- Table structure for table `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(5) NOT NULL,
  `titulo` varchar(200) CHARACTER SET utf16 NOT NULL,
  `pregunta` text NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `fecha_creacion` varchar(30) CHARACTER SET utf16 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `encuestas`
--

INSERT INTO `encuestas` (`id`, `titulo`, `pregunta`, `id_usuario`, `fecha_creacion`) VALUES
(1, 'Primera encuesta', '¿Va todo bien?', 11, '11-12-2018'),
(9, 'encuesta del salon', 'Â¿ganaremos seminario de computacion e informacion I?', 9, ''),
(10, 'encuesta de comida', 'le gusta el camaron?', 9, '');

-- --------------------------------------------------------

--
-- Table structure for table `entradas`
--

CREATE TABLE `entradas` (
  `id` int(10) NOT NULL,
  `titulo` varchar(200) CHARACTER SET utf8 NOT NULL,
  `descripcion` text CHARACTER SET utf8 NOT NULL,
  `imagen_url` varchar(400) CHARACTER SET utf8 NOT NULL,
  `tipo` varchar(2) CHARACTER SET utf8 NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` varchar(15) CHARACTER SET utf8 NOT NULL,
  `id_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entradas`
--

INSERT INTO `entradas` (`id`, `titulo`, `descripcion`, `imagen_url`, `tipo`, `activo`, `fecha_creacion`, `id_usuario`) VALUES
(32, 'Mi primer post', 'Este post es para introducirlos al foro', 'https://aforisticamente.com/wp-content/uploads/2016/12/paisaje1.jpg', 'e', 1, '12-06-2018', 9),
(48, 'Asamblea Departamental, unánime respaldo a la Udenar', 'El señor Rector y su equipo participaron en la sesión de la Asamblea Departamental de Nariño, ante quien presentó un informe sobre el tema de desfinanciamiento del sistema universitario estatal', 'http://www.udenar.edu.co/recursos/wp-content/uploads/2018/06/rector-carlos-solarte-portilla-en-reunion-con-la-asamblea-departamental-de-narino-udenar-periodico-com.jpg', 'p', 1, '12-06-2018', 9),
(54, 'En busca de la productividad y competitividad de las empresas en Nariño', 'La Universidad de Nariño, el CUEEN y la Facultad de Ciencias Económicas y Administrativas -FACEA-, llevaron a cabo el “Foro colaborativo e informativo CUEEN”', 'http://www.udenar.edu.co/recursos/wp-content/uploads/2018/06/crecimiento-del-sector-empresarial-de-narino-principal-udenar-periodico-com.jpg', 'p', 1, '12-06-2018', 9),
(55, 'Boletín No. 1 – Concurso Docente', 'Suspensión de términos correspondientes al Departamento de Ingeniería Civil, considerando que se presentó recusación en contra de dos integrantes del comité de selección y evaluación', 'http://www.udenar.edu.co/recursos/wp-content/uploads/2018/02/logo-universidad-de-narino-udenar-periodico.jpg', 'p', 1, '12-06-2018', 9),
(56, 'Esta entrada es la segunda', 'Pues me interesaba crear esta entrada para ver que tal se veian los estilos en la pagina', 'https://aforisticamente.com/wp-content/uploads/2016/12/paisaje1.jpg', 'e', 1, '13-06-2018', 9);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int(10) NOT NULL,
  `respuesta` tinyint(1) NOT NULL,
  `id_encuesta` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `respuestas`
--

INSERT INTO `respuestas` (`id`, `respuesta`, `id_encuesta`, `id_usuario`) VALUES
(36, 0, 1, 9),
(37, 1, 1, 11),
(38, 1, 9, 9),
(39, 1, 10, 9),
(40, 0, 9, 11);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `codigo` int(15) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8 NOT NULL,
  `apellido` varchar(20) CHARACTER SET utf8 NOT NULL,
  `correo` varchar(40) CHARACTER SET utf8 NOT NULL,
  `programa` varchar(40) CHARACTER SET utf8 NOT NULL,
  `img_url` varchar(255) CHARACTER SET utf8 NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `codigo`, `password`, `nombre`, `apellido`, `correo`, `programa`, `img_url`, `activo`, `tipo`) VALUES
(9, 2141511010, '$2y$10$EOjcC.61sRIPc9o8P8f2l.yuf/yIWArn8ceoRk4DoeyIdO7mmKvTS', 'Juan Marcos', 'Cabezas Garcia', 'juanmarcoscabezas@gmail.com', 'sistemas', './assets/user/1.png', 1, 1),
(11, 2141511011, '$2y$10$tJR/wVfg4hK2W35LWk3zSutDzLdWSWPW37.5h0N.vT.9X/4RPoODO', 'Jesus Vicente', 'Beltran Cortes', 'jesusvicente@gmail.com', 'sistemas', './assets/user/2.png', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_entradas` (`id_entrada`),
  ADD KEY `id_usuarios` (`id_usuario`);

--
-- Indexes for table `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuarios` (`id_usuario`);

--
-- Indexes for table `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_encuestas` (`id_encuesta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `entradas`
--
ALTER TABLE `entradas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `entradas` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`id_encuesta`) REFERENCES `encuestas` (`id`),
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `respuestas_ibfk_3` FOREIGN KEY (`id_encuesta`) REFERENCES `encuestas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
