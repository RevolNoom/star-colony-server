-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: star_colony
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` int NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `credit_cost` double DEFAULT NULL,
  `valor_cost` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES (1,'Fighter',10,0),(101,'Tetrahedron',200,0),(102,'Hexahedron',300,0),(103,'Octahedron',400,0),(104,'Dodecahedron',500,0),(201,'Headquarter',NULL,NULL),(202,'Reactor',500,0),(203,'ResearchCenter',400,0),(204,'FleetCommand',1000,0);
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building` (
  `id` int NOT NULL AUTO_INCREMENT,
  `planet_id` int DEFAULT NULL,
  `asset_id` int DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `planet_id` (`planet_id`),
  KEY `asset_id` (`asset_id`),
  CONSTRAINT `building_ibfk_4` FOREIGN KEY (`planet_id`) REFERENCES `planet` (`id`) ON DELETE CASCADE,
  CONSTRAINT `building_ibfk_5` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (131,103,201,1),(132,103,202,2),(133,103,204,3),(134,104,201,1),(135,104,202,2),(136,104,204,3),(137,105,201,1),(138,105,202,2),(139,105,204,3),(140,106,201,1),(141,106,202,2),(142,106,204,3),(143,107,201,1),(144,107,202,2),(145,107,204,3),(146,108,202,3),(147,109,203,2),(148,111,202,3),(149,113,202,3),(150,111,202,2),(151,104,202,4),(152,104,204,8),(153,108,204,2),(154,110,204,2),(155,112,202,1),(156,112,202,3),(157,113,202,2),(158,119,204,1),(159,114,202,1),(160,120,204,1),(161,103,202,4),(162,103,202,11),(163,115,202,1),(164,116,204,1),(165,117,202,1),(166,118,202,1),(167,104,203,10),(168,108,204,1),(169,121,203,5),(170,121,204,3),(171,122,201,1),(172,122,202,2),(173,122,204,3),(174,123,201,1),(175,123,202,2),(176,123,204,3),(177,124,201,1),(178,124,202,2),(179,124,204,3),(180,125,201,1),(181,125,202,2),(182,125,204,3),(183,126,201,1),(184,126,202,2),(185,126,204,3);
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `player_id` int NOT NULL,
  `asset_id` int NOT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`player_id`,`asset_id`),
  KEY `asset_id` (`asset_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (116,1,2000),(116,101,2),(116,102,7),(116,202,7),(116,204,3),(117,1,1705),(117,101,8),(117,102,1),(117,202,9),(117,203,3),(117,204,5),(118,1,100),(119,1,100),(120,1,0),(121,1,100),(122,1,100),(123,1,100),(124,1,100),(125,1,100);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet`
--

DROP TABLE IF EXISTS `planet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `bxx` float DEFAULT NULL,
  `bxy` float DEFAULT NULL,
  `bxz` float DEFAULT NULL,
  `byx` float DEFAULT NULL,
  `byy` float DEFAULT NULL,
  `byz` float DEFAULT NULL,
  `bzx` float DEFAULT NULL,
  `bzy` float DEFAULT NULL,
  `bzz` float DEFAULT NULL,
  `ox` float DEFAULT NULL,
  `oy` float DEFAULT NULL,
  `oz` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `asset_id` (`asset_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `planet_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`) ON DELETE CASCADE,
  CONSTRAINT `planet_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet`
--

LOCK TABLES `planet` WRITE;
/*!40000 ALTER TABLE `planet` DISABLE KEYS */;
INSERT INTO `planet` VALUES (103,104,116,1,0,0,0,1,0,0,0,1,0,0,0),(104,104,117,1,0,0,0,1,0,0,0,1,0,0,0),(105,104,118,1,0,0,0,1,0,0,0,1,0,0,0),(106,104,119,1,0,0,0,1,0,0,0,1,0,0,0),(107,104,120,1,0,0,0,1,0,0,0,1,0,0,0),(108,101,117,1,0,0,0,1,0,0,0,1,-0.263306,0.0476074,-0.505493),(109,101,117,1,0,0,0,1,0,0,0,1,0.255493,0.228027,-0.267212),(110,101,117,1,0,0,0,1,0,0,0,1,0.18689,0.302002,0.41748),(111,101,117,1,0,0,0,1,0,0,0,1,-0.492676,0.253662,-0.150635),(112,101,117,1,0,0,0,1,0,0,0,1,-0.290771,-0.300293,0.122681),(113,101,117,1,0,0,0,1,0,0,0,1,-0.0623779,0.471436,-0.134277),(114,102,116,1,0,0,0,1,0,0,0,1,0.00744629,-0.248779,-0.174072),(115,102,116,1,0,0,0,1,0,0,0,1,-0.219482,-0.0668945,0.267578),(116,102,116,1,0,0,0,1,0,0,0,1,0.139404,0.262695,0.143311),(117,102,116,1,0,0,0,1,0,0,0,1,0.381592,-0.0766602,-0.264648),(118,102,116,1,0,0,0,1,0,0,0,1,-0.15625,-0.0415039,-0.331177),(119,102,116,1,0,0,0,1,0,0,0,1,-0.282959,0.228271,0.256836),(120,102,116,1,0,0,0,1,0,0,0,1,0.336914,-0.0517578,0.203979),(121,102,117,0.852869,0.507504,0.122579,-0.483153,0.856161,-0.183087,-0.19787,0.0969252,0.975415,-0.435059,0.11377,-0.324829),(122,104,121,1,0,0,0,1,0,0,0,1,0,0,0),(123,104,122,1,0,0,0,1,0,0,0,1,0,0,0),(124,104,123,1,0,0,0,1,0,0,0,1,0,0,0),(125,104,124,1,0,0,0,1,0,0,0,1,0,0,0),(126,104,125,1,0,0,0,1,0,0,0,1,0,0,0);
/*!40000 ALTER TABLE `planet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `credit` double DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `used_valor` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (116,'Space Tyrant','2024-05-30 15:13:28',10187.4855957031,4689.85717773438,NULL),(117,'Liberator','2024-05-29 11:13:28',13588.5144042969,7592.14282226562,NULL),(118,'New Player 1717515789915','2024-06-04 15:43:10',1000,1000,NULL),(119,'New Player 1717515790892','2024-06-04 01:43:11',694.166656494141,694.166656494141,NULL),(120,'New Player 1717515799171','2024-06-03 11:43:19',1620.83334350586,1350.83334350586,NULL),(121,'New Player 1720083905690','2024-07-04 09:05:06',1000,1000,NULL),(122,'New Player 1720083907065','2024-07-04 09:05:07',1000,1000,NULL),(123,'New Player 1720083907756','2024-07-04 09:05:08',1000,1000,NULL),(124,'New Player 1720083908373','2024-07-04 09:05:08',1000,1000,NULL),(125,'New Player 1720083908930','2024-07-04 09:05:09',1000,1000,NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-04 17:42:26
