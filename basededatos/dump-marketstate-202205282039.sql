-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: marketstate
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `ruc` varchar(12) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `localizacion` varchar(100) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (2,'Matias Murto','Libertad esq Clavel','0982993406','5208222','foto','[-25.324699904591412, -57.52354502677918 ]','2',1,'2021-10-02 18:19:22',NULL,NULL,'matiasmurto1@gmail.com'),(4,'Carlos Murto','Libertad esq Clavel','0971218115','1718139',NULL,'[ -25.325432084463007  ,  -57.52703653650442 ]','1',1,'2022-05-28 20:14:47',NULL,NULL,'carlosmurto@gmail.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_cabeceras`
--

DROP TABLE IF EXISTS `compras_cabeceras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_cabeceras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_proveedor` int(11) NOT NULL,
  `condicion` int(1) DEFAULT 1,
  `timbrado` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fiscal` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `total_precio` int(11) DEFAULT 0,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_cabeceras`
--

LOCK TABLES `compras_cabeceras` WRITE;
/*!40000 ALTER TABLE `compras_cabeceras` DISABLE KEYS */;
INSERT INTO `compras_cabeceras` VALUES (2,'2022-05-28 20:20:21',3,1,'123456789','001-001-1234567',4625000,1,'2022-05-28 20:20:46',NULL,NULL);
/*!40000 ALTER TABLE `compras_cabeceras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_detalles`
--

DROP TABLE IF EXISTS `compras_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra_cabecera` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1,
  `precio` int(11) DEFAULT 1,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_detalles`
--

LOCK TABLES `compras_detalles` WRITE;
/*!40000 ALTER TABLE `compras_detalles` DISABLE KEYS */;
INSERT INTO `compras_detalles` VALUES (3,2,7,1,4325000,1,'2022-05-28 20:20:46',NULL,NULL),(4,2,9,3,100000,1,'2022-05-28 20:21:01',NULL,NULL);
/*!40000 ALTER TABLE `compras_detalles` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER compras_cabeceras_total_insert AFTER INSERT ON compras_detalles
       FOR EACH ROW
       BEGIN
	       UPDATE compras_cabeceras SET total_precio = total_precio + (NEW.cantidad * NEW.precio)
                WHERE id = NEW.id_compra_cabecera;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER compras_cabeceras_total_update AFTER UPDATE ON compras_detalles
       FOR EACH ROW
       BEGIN
	       UPDATE compras_cabeceras SET total_precio = total_precio - (OLD.cantidad * OLD.precio)
                WHERE id = OLD.id_compra_cabecera;
	       UPDATE compras_cabeceras SET total_precio = total_precio + (NEW.cantidad * NEW.precio)
                WHERE id = NEW.id_compra_cabecera;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER compras_cabeceras_total_delete AFTER DELETE ON compras_detalles
       FOR EACH ROW
       BEGIN
	       UPDATE compras_cabeceras SET total_precio = total_precio - (OLD.cantidad * OLD.precio)
                WHERE id = OLD.id_compra_cabecera;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `formularios`
--

DROP TABLE IF EXISTS `formularios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formularios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `icono` varchar(100) NOT NULL,
  `id_submenu` int(11) DEFAULT 1,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `formularios_un` (`nombre`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formularios`
--

LOCK TABLES `formularios` WRITE;
/*!40000 ALTER TABLE `formularios` DISABLE KEYS */;
INSERT INTO `formularios` VALUES (1,'Usuarios','frm/seguridad/usuarios/index.html','icono',6,1,'2021-07-08 19:55:33',NULL,NULL),(2,'Roles','frm/seguridad/roles/index.html','icono',6,1,'2021-07-08 20:13:20',NULL,NULL),(3,'Formularios','frm/seguridad/formularios/index.html','icono',6,1,'2021-07-08 20:13:45',NULL,NULL),(4,'Submenus','frm/seguridad/submenus/index.html','icono',6,1,'2021-07-08 20:15:05',NULL,NULL),(5,'Permisos','frm/seguridad/permisos/index.html','icono',6,1,'2021-07-08 20:15:05',NULL,NULL),(6,'Cambiar Contraseña','frm/seguridad/cambiar_clave/index.html','icono',6,1,'2021-07-08 20:16:17',NULL,NULL),(7,'Backups','frm/seguridad/copias_seguridad/index.html','icono',6,1,'2021-07-08 20:16:17',NULL,NULL),(8,'Clientes','frm/archivos/clientes/index.html','icono',1,1,'2021-08-23 21:23:23',NULL,NULL),(9,'Productos','frm/archivos/productos/index.html','icono',1,1,'2021-08-23 21:23:54',NULL,NULL),(10,'Proveedores','	frm/archivos/proveedores/index.html','',1,1,'2022-01-03 20:26:06',NULL,NULL),(11,'Compras','frm/procesos/compras/index.html','',2,1,'2022-01-03 21:16:02',NULL,NULL),(12,'Consulta de Compras','frm/consultas/compras/index.html','',3,1,'2022-01-21 20:23:14',NULL,NULL),(13,'Inventarios','frm/procesos/inventarios/index.html','',2,1,'2022-01-22 17:41:52',NULL,NULL),(14,'Ventas','frm/procesos/ventas/index.html','',2,1,'2022-02-04 20:43:56',NULL,NULL),(15,'Consultas de Ventas','frm/consultas/ventas/index.html','',3,1,'2022-02-07 21:41:11',NULL,NULL),(16,'Consulta de Inventarios','frm/consultas/inventario/index.html','',3,1,'2022-02-18 09:56:30',NULL,NULL);
/*!40000 ALTER TABLE `formularios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios_cabeceras`
--

DROP TABLE IF EXISTS `inventarios_cabeceras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventarios_cabeceras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `observaciones` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `total_costo` int(11) DEFAULT 0,
  `total_precio` int(11) DEFAULT 0,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios_cabeceras`
--

LOCK TABLES `inventarios_cabeceras` WRITE;
/*!40000 ALTER TABLE `inventarios_cabeceras` DISABLE KEYS */;
INSERT INTO `inventarios_cabeceras` VALUES (8,'2022-05-28 20:21:05','Hola',0,0,1,'2022-05-28 20:21:17',NULL,NULL);
/*!40000 ALTER TABLE `inventarios_cabeceras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios_detalles`
--

DROP TABLE IF EXISTS `inventarios_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventarios_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_inventario_cabecera` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1,
  `costo` int(11) DEFAULT 0,
  `precio` int(11) DEFAULT 1,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios_detalles`
--

LOCK TABLES `inventarios_detalles` WRITE;
/*!40000 ALTER TABLE `inventarios_detalles` DISABLE KEYS */;
INSERT INTO `inventarios_detalles` VALUES (5,8,9,3,50000,100000,1,'2022-05-28 20:21:18',NULL,NULL);
/*!40000 ALTER TABLE `inventarios_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) NOT NULL,
  `id_formulario` int(11) NOT NULL,
  `agregar` tinyint(1) DEFAULT NULL,
  `modificar` tinyint(1) DEFAULT NULL,
  `eliminar` tinyint(1) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,1,1,1,1,1,1,'2021-07-08 19:56:27',NULL,NULL),(2,1,2,1,0,0,1,'2021-07-08 20:16:50',NULL,NULL),(3,1,3,1,0,1,1,'2021-07-08 20:17:16',NULL,NULL),(4,1,4,1,1,0,1,'2021-07-08 20:17:16',NULL,NULL),(5,1,5,1,1,1,1,'2021-07-08 20:17:55',NULL,NULL),(6,1,6,1,0,1,1,'2021-07-08 20:17:55',NULL,NULL),(7,1,7,1,0,1,1,'2021-07-08 20:17:55',NULL,NULL),(8,1,8,1,1,1,1,'2021-08-23 21:24:25',NULL,NULL),(9,1,9,1,1,1,1,'2021-08-23 21:24:39',NULL,NULL),(10,1,10,1,1,1,1,'2022-01-03 20:26:18',NULL,NULL),(11,1,11,1,1,1,1,'2022-01-08 16:50:05',NULL,NULL),(12,1,12,1,1,1,1,'2022-01-21 20:23:23',NULL,NULL),(13,1,13,1,1,1,1,'2022-01-22 17:41:57',NULL,NULL),(14,1,14,1,1,1,1,'2022-02-04 20:44:13',NULL,NULL),(15,1,15,1,1,1,1,'2022-02-07 21:45:21',NULL,NULL),(16,1,16,1,1,1,1,'2022-02-18 09:56:42',NULL,NULL);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `costo` int(11) NOT NULL,
  `precio` decimal(12,3) NOT NULL,
  `stock` int(11) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  `descripcion` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (6,'Telefono',1000000,1600000.000,10,'img/productos/1.jpg',1,'2022-05-28 20:04:53',NULL,NULL,''),(7,'Parlante JBL Boombox 2',3900000,4325000.000,10,NULL,1,'2022-05-28 20:12:56',NULL,NULL,''),(8,'Cargador Samsung EP-TA20EWECGWW + Cable Type-C',25000,50000.000,10,NULL,1,'2022-05-28 20:13:23',NULL,NULL,''),(9,'LICUADORA TOKYO LICUA MAX 5 VELOCIDADES 500W 220V/50HZ',50000,100000.000,20,NULL,1,'2022-05-28 20:13:48',NULL,NULL,'');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ruc` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `localizacion` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (3,'Nissei ','España casi Mcal Lopez','021545633','123445668','email@niseei.com','[ -25.324804963588164  ,  -57.528766618557896 ]',1,'2022-05-28 20:15:39',NULL,NULL);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador',1,'2021-07-08 19:52:26',NULL,NULL),(3,'Editor',1,'2021-11-08 20:42:24',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submenus`
--

DROP TABLE IF EXISTS `submenus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submenus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submenus`
--

LOCK TABLES `submenus` WRITE;
/*!40000 ALTER TABLE `submenus` DISABLE KEYS */;
INSERT INTO `submenus` VALUES (1,'Archivos',1,'2021-07-08 19:52:53',NULL,NULL),(2,'Procesos',1,'2021-07-08 19:53:03',NULL,NULL),(3,'Consultas',1,'2021-07-08 19:53:16',NULL,NULL),(4,'Listados',1,'2021-07-08 19:53:32',NULL,NULL),(5,'Informes',1,'2021-07-08 19:53:43',NULL,NULL),(6,'Seguridad',1,'2021-07-08 19:53:57',NULL,NULL);
/*!40000 ALTER TABLE `submenus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `id_rol` int(11) DEFAULT 1,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Matias','admin','admin@email.com','1',1,1,'2021-07-08 19:52:09',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_cabeceras`
--

DROP TABLE IF EXISTS `ventas_cabeceras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas_cabeceras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_cliente` int(11) NOT NULL,
  `condicion` int(1) DEFAULT 1,
  `timbrado` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fiscal` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `total_costo` int(11) DEFAULT 0,
  `total_precio` int(11) DEFAULT 0,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_cabeceras`
--

LOCK TABLES `ventas_cabeceras` WRITE;
/*!40000 ALTER TABLE `ventas_cabeceras` DISABLE KEYS */;
INSERT INTO `ventas_cabeceras` VALUES (4,'2022-05-28 20:21:29',2,1,'5208222','001-001-00000001',0,0,1,'2022-05-28 20:21:58',NULL,NULL);
/*!40000 ALTER TABLE `ventas_cabeceras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_detalles`
--

DROP TABLE IF EXISTS `ventas_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta_cabecera` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1,
  `costo` int(11) DEFAULT 0,
  `precio` int(11) DEFAULT 1,
  `usuario_id` int(11) DEFAULT 1,
  `date_add` datetime DEFAULT current_timestamp(),
  `date_mod` datetime DEFAULT NULL,
  `date_del` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_detalles`
--

LOCK TABLES `ventas_detalles` WRITE;
/*!40000 ALTER TABLE `ventas_detalles` DISABLE KEYS */;
INSERT INTO `ventas_detalles` VALUES (6,4,6,1,1000000,1600000,1,'2022-05-28 20:21:58',NULL,NULL);
/*!40000 ALTER TABLE `ventas_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'marketstate'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-28 20:39:20
