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
-- Current Database: `star_colony`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `star_colony` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `star_colony`;

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
-- Table structure for table `base`
--

DROP TABLE IF EXISTS `base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base` (
  `player_id` int NOT NULL,
  `file_path` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`player_id`),
  CONSTRAINT `base_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base`
--

LOCK TABLES `base` WRITE;
/*!40000 ALTER TABLE `base` DISABLE KEYS */;
/*!40000 ALTER TABLE `base` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (118,92,201,1),(119,92,202,2),(120,92,204,3),(121,93,201,1),(122,93,202,2),(123,93,204,3),(124,94,202,3),(125,101,201,1),(126,101,202,2),(127,101,204,3),(128,102,201,1),(129,102,202,2),(130,102,204,3);
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
INSERT INTO `inventory` VALUES (112,1,2000),(112,102,10),(113,1,17),(113,101,2),(113,202,1),(114,1,100),(115,1,100);
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet`
--

LOCK TABLES `planet` WRITE;
/*!40000 ALTER TABLE `planet` DISABLE KEYS */;
INSERT INTO `planet` VALUES (92,104,112,1,0,0,0,1,0,0,0,1,0,0,0),(93,104,113,1,0,0,0,1,0,0,0,1,0,0,0),(94,101,113,1,0,0,0,1,0,0,0,1,-0.228516,-0.000732422,0.191895),(96,102,112,1,0,0,0,1,0,0,0,1,-0.157593,0.0266113,0.175537),(97,102,112,1,0,0,0,1,0,0,0,1,-0.157593,0.0266113,0.175537),(98,102,112,1,0,0,0,1,0,0,0,1,-0.157593,0.0266113,0.175537),(99,102,112,1,0,0,0,1,0,0,0,1,-0.157593,0.0266113,0.175537),(100,101,113,1,0,0,0,1,0,0,0,1,-0.195679,-0.0791016,-0.045166),(101,104,114,1,0,0,0,1,0,0,0,1,0,0,0),(102,104,115,1,0,0,0,1,0,0,0,1,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (112,'New Player 1717043390098','2024-05-29 14:29:50',204.799995422363,512,NULL),(113,'New Player 1717308808267','2024-06-01 09:13:28',1595.20001220703,1808,NULL),(114,'New Player 1717322114627','2024-06-02 09:55:15',1000,1000,NULL),(115,'New Player 1717322115728','2024-06-02 02:55:16',800,800,NULL);
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

-- Dump completed on 2024-06-02 21:21:55
