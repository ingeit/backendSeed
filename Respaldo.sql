CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `idUsuario` int(11) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `fechaAlta` timestamp NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'ricardo','bruno','2018-08-15 12:20:36'),(2,'bruno','ricardo','2018-08-15 12:28:59'),(3,'brunoad','ricardoasd','2018-08-15 12:39:43'),(4,'brunoada','ricardoasdd','2018-08-15 12:48:01'),(5,'brunoadaasdasdadad','ricardoasdd','2018-08-15 13:04:50'),(6,'asdadad','ricardoasdd','2018-08-15 13:09:51'),(7,'asdadadasd','ricardoasdd','2018-08-15 13:45:15'),(8,'asdadadasdasd','ricardoasdd','2018-08-15 13:48:14');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'test'
--

--
-- Dumping routines for database 'test'
--
/*!50003 DROP PROCEDURE IF EXISTS `usuario_listar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_listar`()
PROC: BEGIN
	
    /* 
    En caso de querer filtrar la vista por fecha, se deberia hacer el control de q la fecha sea valida por ejemplo.
    y en caso de que no, hacer un SELECT 0 as codigo BLABLA as mensaje;
    LEAVE PROC;
    */
	START TRANSACTION; 
		SELECT 1 as codigo;
		SELECT * FROM Usuarios;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuario_nuevo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_nuevo`(uApellido VARCHAR(45), uNombre VARCHAR(45))
PROC: BEGIN

	DECLARE uIdUsuario INT;
    -- Manejo de errores
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	 BEGIN
		GET DIAGNOSTICS CONDITION 1
        @c1 = RETURNED_SQLSTATE, @c2 = MESSAGE_TEXT;
		SELECT -1 AS codigo, CONCAT('Error numero: ',@c1,'. Descripcion: ',@c2)AS mensaje;
		ROLLBACK;
	 END;
        
    IF (uApellido IS NULL OR uApellido = '') THEN
		SELECT 0 as codigo, 'Debe ingresar el apellido del usuario.' mensaje;
        LEAVE PROC;
	END IF;
    IF (uNombre IS NULL OR uNombre = '') THEN
		SELECT 0 as codigo, 'Debe ingresar el nombre del usuario.' mensaje;
        LEAVE PROC;
	END IF;
    
    
	IF EXISTS (SELECT apellido FROM Usuarios WHERE apellido=uApellido ) THEN
		SELECT 0 as codigo, 'El Usuario ya existe' mensaje;
        LEAVE PROC;
	END IF;
    
    START TRANSACTION;
		SET uIdUsuario = 1 + (SELECT COALESCE(MAX(idUsuario),0) FROM Usuarios);
		INSERT INTO Usuarios VALUES (uIdUsuario,uApellido, uNombre, NOW());
		SELECT uIdUsuario AS codigo, 'Usuario creado exitosamente' mensaje;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-15 10:50:43
