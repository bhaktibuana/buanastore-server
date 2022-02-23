CREATE DATABASE  IF NOT EXISTS `buanastore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `buanastore`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: buanastore
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `user_id` int NOT NULL,
  `product_code_code` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`product_code_code`),
  KEY `product_code_code` (`product_code_code`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_code_code`) REFERENCES `product_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount_value` int NOT NULL DEFAULT '0',
  `product_code_code` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_code_code` (`product_code_code`),
  CONSTRAINT `discount_ibfk_1` FOREIGN KEY (`product_code_code`) REFERENCES `product_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (1,30,'UY-001-M-XL','2022-01-31 23:14:06','2022-01-31 23:14:06'),(2,30,'UY-001-M-L','2022-01-31 23:14:07','2022-01-31 23:14:07'),(3,30,'UY-001-M-M','2022-01-31 23:14:08','2022-01-31 23:14:08'),(4,30,'UY-001-M-S','2022-01-31 23:14:08','2022-01-31 23:14:08'),(5,30,'UY-001-M-XS','2022-01-31 23:14:09','2022-01-31 23:14:09'),(6,30,'HOV-001-U-XL','2022-01-31 23:14:09','2022-01-31 23:14:09'),(7,30,'HOV-001-U-L','2022-01-31 23:14:10','2022-01-31 23:14:10'),(8,30,'HOV-001-U-M','2022-01-31 23:14:10','2022-01-31 23:14:10'),(9,30,'HOV-001-U-S','2022-01-31 23:14:11','2022-01-31 23:14:11'),(10,30,'HOV-001-U-XS','2022-01-31 23:14:11','2022-01-31 23:14:11'),(11,30,'SDS-001-M-XL','2022-01-31 23:14:12','2022-01-31 23:14:12'),(12,30,'SDS-001-M-L','2022-01-31 23:14:12','2022-01-31 23:14:12'),(13,30,'SDS-001-M-M','2022-01-31 23:14:13','2022-01-31 23:14:13'),(14,30,'SDS-001-M-S','2022-01-31 23:14:13','2022-01-31 23:14:13'),(15,30,'SDS-001-M-XS','2022-01-31 23:14:14','2022-01-31 23:14:14'),(16,30,'BK-001-F-XL','2022-01-31 23:14:14','2022-01-31 23:14:14'),(17,30,'BK-001-F-L','2022-01-31 23:14:15','2022-01-31 23:14:15'),(18,30,'BK-001-F-M','2022-01-31 23:14:15','2022-01-31 23:14:15'),(19,30,'BK-001-F-S','2022-01-31 23:14:16','2022-01-31 23:14:16'),(20,30,'BK-001-F-XS','2022-01-31 23:14:16','2022-01-31 23:14:16'),(21,30,'HKV-001-U-XL','2022-01-31 23:14:16','2022-01-31 23:14:16'),(22,30,'HKV-001-U-L','2022-01-31 23:14:17','2022-01-31 23:14:17'),(23,30,'HKV-001-U-M','2022-01-31 23:14:17','2022-01-31 23:14:17'),(24,30,'HKV-001-U-S','2022-01-31 23:14:18','2022-01-31 23:14:18'),(25,30,'HKV-001-U-XS','2022-01-31 23:14:18','2022-01-31 23:14:18'),(26,30,'SSS-001-M-XL','2022-01-31 23:14:19','2022-01-31 23:14:19'),(27,30,'SSS-001-M-L','2022-01-31 23:14:19','2022-01-31 23:14:19'),(28,30,'SSS-001-M-M','2022-01-31 23:14:20','2022-01-31 23:14:20'),(29,30,'SSS-001-M-S','2022-01-31 23:14:20','2022-01-31 23:14:20'),(30,30,'SSS-001-M-XS','2022-01-31 23:14:21','2022-01-31 23:14:21'),(31,30,'UY-002-M-XL','2022-01-31 23:14:21','2022-01-31 23:14:21'),(32,30,'UY-002-M-L','2022-01-31 23:14:22','2022-01-31 23:14:22'),(33,30,'UY-002-M-M','2022-01-31 23:14:22','2022-01-31 23:14:22'),(34,30,'UY-002-M-S','2022-01-31 23:14:23','2022-01-31 23:14:23'),(35,30,'UY-002-M-XS','2022-01-31 23:14:23','2022-01-31 23:14:23'),(36,30,'HJV-001-U-XL','2022-01-31 23:14:24','2022-01-31 23:14:24'),(37,30,'HJV-001-U-L','2022-01-31 23:14:24','2022-01-31 23:14:24'),(38,30,'HJV-001-U-M','2022-01-31 23:14:25','2022-01-31 23:14:25'),(39,30,'HJV-001-U-S','2022-01-31 23:14:25','2022-01-31 23:14:25'),(40,30,'HJV-001-U-XS','2022-01-31 23:14:26','2022-01-31 23:14:26'),(41,30,'SLC-001-F-XL','2022-01-31 23:14:26','2022-01-31 23:14:26'),(42,30,'SLC-001-F-L','2022-01-31 23:14:27','2022-01-31 23:14:27'),(43,30,'SLC-001-F-M','2022-01-31 23:14:27','2022-01-31 23:14:27'),(44,30,'SLC-001-F-S','2022-01-31 23:14:28','2022-01-31 23:14:28'),(45,30,'SLC-001-F-XS','2022-01-31 23:14:28','2022-01-31 23:14:28'),(46,30,'BK-002-F-XL','2022-01-31 23:14:29','2022-01-31 23:14:29'),(47,30,'BK-002-F-L','2022-01-31 23:14:29','2022-01-31 23:14:29'),(48,30,'BK-002-F-M','2022-01-31 23:14:30','2022-01-31 23:14:30'),(49,30,'BK-002-F-S','2022-01-31 23:14:30','2022-01-31 23:14:30'),(50,30,'BK-002-F-XS','2022-01-31 23:14:31','2022-01-31 23:14:31'),(51,30,'HSV-001-U-XL','2022-01-31 23:14:31','2022-01-31 23:14:31'),(52,30,'HSV-001-U-L','2022-01-31 23:14:32','2022-01-31 23:14:32'),(53,30,'HSV-001-U-M','2022-01-31 23:14:32','2022-01-31 23:14:32'),(54,30,'HSV-001-U-S','2022-01-31 23:14:33','2022-01-31 23:14:33'),(55,30,'HSV-001-U-XS','2022-01-31 23:14:33','2022-01-31 23:14:33'),(56,30,'SGS-001-F-XL','2022-01-31 23:14:34','2022-01-31 23:14:34'),(57,30,'SGS-001-F-L','2022-01-31 23:14:34','2022-01-31 23:14:34'),(58,30,'SGS-001-F-M','2022-01-31 23:14:35','2022-01-31 23:14:35'),(59,30,'SGS-001-F-S','2022-01-31 23:14:35','2022-01-31 23:14:35'),(60,30,'SGS-001-F-XS','2022-01-31 23:14:35','2022-01-31 23:14:35'),(61,30,'UY-003-M-XL','2022-01-31 23:14:36','2022-01-31 23:14:36'),(62,30,'UY-003-M-L','2022-01-31 23:14:36','2022-01-31 23:14:36'),(63,30,'UY-003-M-M','2022-01-31 23:14:37','2022-01-31 23:14:37'),(64,30,'UY-003-M-S','2022-01-31 23:14:37','2022-01-31 23:14:37'),(65,30,'UY-003-M-XS','2022-01-31 23:14:38','2022-01-31 23:14:38'),(66,30,'HYV-001-U-XL','2022-01-31 23:14:38','2022-01-31 23:14:38'),(67,30,'HYV-001-U-L','2022-01-31 23:14:39','2022-01-31 23:14:39'),(68,30,'HYV-001-U-M','2022-01-31 23:14:40','2022-01-31 23:14:40'),(69,30,'HYV-001-U-S','2022-01-31 23:14:40','2022-01-31 23:14:40'),(70,30,'HYV-001-U-XS','2022-01-31 23:14:41','2022-01-31 23:14:41'),(71,30,'SCR-001-F-XL','2022-01-31 23:14:41','2022-01-31 23:14:41'),(72,30,'SCR-001-F-L','2022-01-31 23:14:42','2022-01-31 23:14:42'),(73,30,'SCR-001-F-M','2022-01-31 23:14:42','2022-01-31 23:14:42'),(74,30,'SCR-001-F-S','2022-01-31 23:14:43','2022-01-31 23:14:43'),(75,30,'SCR-001-F-XS','2022-01-31 23:14:43','2022-01-31 23:14:43'),(76,30,'JV-001-U-XL','2022-01-31 23:14:44','2022-01-31 23:14:44'),(77,30,'JV-001-U-L','2022-01-31 23:14:44','2022-01-31 23:14:44'),(78,30,'JV-001-U-M','2022-01-31 23:14:45','2022-01-31 23:14:45'),(79,30,'JV-001-U-S','2022-01-31 23:14:45','2022-01-31 23:14:45'),(80,30,'JV-001-U-XS','2022-01-31 23:14:46','2022-01-31 23:14:46'),(81,30,'HSV-002-U-XL','2022-01-31 23:14:46','2022-01-31 23:14:46'),(82,30,'HSV-002-U-L','2022-01-31 23:14:47','2022-01-31 23:14:47'),(83,30,'HSV-002-U-M','2022-01-31 23:14:47','2022-01-31 23:14:47'),(84,30,'HSV-002-U-S','2022-01-31 23:14:48','2022-01-31 23:14:48'),(85,30,'HSV-002-U-XS','2022-01-31 23:14:48','2022-01-31 23:14:48'),(86,30,'SHR-001-F-XL','2022-01-31 23:14:49','2022-01-31 23:14:49'),(87,30,'SHR-001-F-L','2022-01-31 23:14:49','2022-01-31 23:14:49'),(88,30,'SHR-001-F-M','2022-01-31 23:14:50','2022-01-31 23:14:50'),(89,30,'SHR-001-F-S','2022-01-31 23:14:50','2022-01-31 23:14:50'),(90,30,'SHR-001-F-XS','2022-01-31 23:14:51','2022-01-31 23:14:51'),(91,30,'SC-001-F-XL','2022-01-31 23:14:51','2022-01-31 23:14:51'),(92,30,'SC-001-F-L','2022-01-31 23:14:52','2022-01-31 23:14:52'),(93,30,'SC-001-F-M','2022-01-31 23:14:53','2022-01-31 23:14:53'),(94,30,'SC-001-F-S','2022-01-31 23:14:53','2022-01-31 23:14:53'),(95,30,'SC-001-F-XS','2022-01-31 23:14:54','2022-01-31 23:14:54'),(96,30,'DN-001-F-XL','2022-01-31 23:14:54','2022-01-31 23:14:54'),(97,30,'DN-001-F-L','2022-01-31 23:14:55','2022-01-31 23:14:55'),(98,30,'DN-001-F-M','2022-01-31 23:14:56','2022-01-31 23:14:56'),(99,30,'DN-001-F-S','2022-01-31 23:14:56','2022-01-31 23:14:56'),(100,30,'DN-001-F-XS','2022-01-31 23:14:57','2022-01-31 23:14:57');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Uniqlo x Yoasobi T-Shirt UT Original Japan (Male)',349000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(2,'Omen Valorant Premium Hoodie Controller Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(3,'Dry Stretch Easy Shorts (Male)',199000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(4,'Pink Baby Kurokodairu Shirt (Female)',199000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(5,'Killjoy Valorant Premium Hoodie Sentinel Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(6,'Stretch Slim Fit Shorts (Male)',199000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(7,'Uniqlo x Yoasobi T-Shirt UT Original Japan (Male)',349000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(8,'Jett Valorant Premium Hoodie Duelist Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(9,'Linen Cotton Shorts (Female)',249000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(10,'Yellow Baby Kurokodairu Shirt (Female)',199000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(11,'Sova Valorant Premium Hoodie Initiator Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(12,'Gray Smart Shorts (Female)',249000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(13,'Uniqlo x Yoasobi T-Shirt UT Original Japan (Male)',349000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(14,'Yoru Valorant Premium Hoodie Duelist Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(15,'Cotton Relaco Shorts (Female)',249000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(16,'Jett Valorant Premium T-Shirt (Unisex)',199000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(17,'Sage Valorant Premium Hoodie Sentinel Series (Unisex)',219000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(18,'High Rise Denim Shorts (Female)',399000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(19,'Smooth Cotton French Sleeve T-Shrit (Female)',149000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.'),(20,'Dry Neck Short Sleeve T-Shirt (Female)',99000,'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, tempora aut velit quisquam dolorem odit porro recusandae illum et libero animi quam inventore perspiciatis ea sit alias repellendus ratione voluptatem.');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_code`
--

DROP TABLE IF EXISTS `product_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_code` (
  `code` varchar(20) NOT NULL,
  `product_id` int NOT NULL,
  `purchased` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`code`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_code_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_code`
--

LOCK TABLES `product_code` WRITE;
/*!40000 ALTER TABLE `product_code` DISABLE KEYS */;
INSERT INTO `product_code` VALUES ('BK-001-F-L',4,0),('BK-001-F-M',4,0),('BK-001-F-S',4,0),('BK-001-F-XL',4,0),('BK-001-F-XS',4,0),('BK-002-F-L',10,0),('BK-002-F-M',10,0),('BK-002-F-S',10,0),('BK-002-F-XL',10,0),('BK-002-F-XS',10,0),('DN-001-F-L',20,0),('DN-001-F-M',20,0),('DN-001-F-S',20,0),('DN-001-F-XL',20,0),('DN-001-F-XS',20,0),('HJV-001-U-L',8,0),('HJV-001-U-M',8,0),('HJV-001-U-S',8,0),('HJV-001-U-XL',8,0),('HJV-001-U-XS',8,0),('HKV-001-U-L',5,0),('HKV-001-U-M',5,0),('HKV-001-U-S',5,0),('HKV-001-U-XL',5,0),('HKV-001-U-XS',5,0),('HOV-001-U-L',2,0),('HOV-001-U-M',2,0),('HOV-001-U-S',2,0),('HOV-001-U-XL',2,0),('HOV-001-U-XS',2,0),('HSV-001-U-L',11,0),('HSV-001-U-M',11,0),('HSV-001-U-S',11,0),('HSV-001-U-XL',11,0),('HSV-001-U-XS',11,0),('HSV-002-U-L',17,0),('HSV-002-U-M',17,0),('HSV-002-U-S',17,0),('HSV-002-U-XL',17,0),('HSV-002-U-XS',17,0),('HYV-001-U-L',14,0),('HYV-001-U-M',14,0),('HYV-001-U-S',14,0),('HYV-001-U-XL',14,0),('HYV-001-U-XS',14,0),('JV-001-U-L',16,0),('JV-001-U-M',16,0),('JV-001-U-S',16,0),('JV-001-U-XL',16,0),('JV-001-U-XS',16,0),('SC-001-F-L',19,0),('SC-001-F-M',19,0),('SC-001-F-S',19,0),('SC-001-F-XL',19,0),('SC-001-F-XS',19,0),('SCR-001-F-L',15,0),('SCR-001-F-M',15,0),('SCR-001-F-S',15,0),('SCR-001-F-XL',15,0),('SCR-001-F-XS',15,0),('SDS-001-M-L',3,0),('SDS-001-M-M',3,0),('SDS-001-M-S',3,0),('SDS-001-M-XL',3,0),('SDS-001-M-XS',3,0),('SGS-001-F-L',12,0),('SGS-001-F-M',12,0),('SGS-001-F-S',12,0),('SGS-001-F-XL',12,0),('SGS-001-F-XS',12,0),('SHR-001-F-L',18,0),('SHR-001-F-M',18,0),('SHR-001-F-S',18,0),('SHR-001-F-XL',18,0),('SHR-001-F-XS',18,0),('SLC-001-F-L',9,0),('SLC-001-F-M',9,0),('SLC-001-F-S',9,0),('SLC-001-F-XL',9,0),('SLC-001-F-XS',9,0),('SSS-001-M-L',6,0),('SSS-001-M-M',6,0),('SSS-001-M-S',6,0),('SSS-001-M-XL',6,0),('SSS-001-M-XS',6,0),('UY-001-M-L',1,0),('UY-001-M-M',1,0),('UY-001-M-S',1,0),('UY-001-M-XL',1,0),('UY-001-M-XS',1,0),('UY-002-M-L',7,0),('UY-002-M-M',7,0),('UY-002-M-S',7,0),('UY-002-M-XL',7,0),('UY-002-M-XS',7,0),('UY-003-M-L',13,0),('UY-003-M-M',13,0),('UY-003-M-S',13,0),('UY-003-M-XL',13,0),('UY-003-M-XS',13,0);
/*!40000 ALTER TABLE `product_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tag`
--

DROP TABLE IF EXISTS `product_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tag` (
  `product_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `product_tag_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tag`
--

LOCK TABLES `product_tag` WRITE;
/*!40000 ALTER TABLE `product_tag` DISABLE KEYS */;
INSERT INTO `product_tag` VALUES (1,1),(4,1),(7,1),(10,1),(13,1),(16,1),(19,1),(20,1),(1,2),(4,2),(7,2),(10,2),(13,2),(16,2),(19,2),(20,2),(1,3),(4,3),(7,3),(10,3),(13,3),(16,3),(19,3),(20,3),(1,4),(4,4),(7,4),(10,4),(13,4),(16,4),(19,4),(20,4),(2,5),(5,5),(8,5),(11,5),(14,5),(17,5),(3,6),(6,6),(9,6),(12,6),(15,6),(18,6),(3,7),(6,7),(9,7),(12,7),(15,7),(18,7),(20,7),(1,8),(3,8),(6,8),(7,8),(13,8),(4,9),(9,9),(10,9),(12,9),(15,9),(18,9),(19,9),(20,9),(2,10),(5,10),(8,10),(11,10),(14,10),(16,10),(17,10),(1,11),(2,11),(3,11),(5,11),(6,11),(7,11),(8,11),(11,11),(14,11),(16,11),(17,11),(13,12),(4,13),(19,13),(9,14),(10,15),(12,16),(15,17),(20,17),(18,18),(1,19),(7,19),(13,19),(1,20),(7,20),(13,20),(1,21),(7,21),(13,21),(1,22),(7,22),(13,22),(1,23),(7,23),(13,23),(1,24),(7,24),(13,24),(2,25),(5,25),(8,25),(11,25),(14,25),(16,25),(17,25),(2,26),(2,27),(5,27),(8,27),(11,27),(14,27),(16,27),(17,27),(2,28),(2,29),(5,29),(8,29),(11,29),(14,29),(17,29),(3,30),(6,30),(3,31),(3,32),(20,32),(4,33),(10,33),(4,34),(10,34),(5,35),(5,36),(17,36),(6,37),(6,38),(8,39),(16,39),(8,40),(14,40),(9,41),(9,42),(15,42),(19,42),(11,43),(11,44),(12,45),(14,46),(15,47),(17,48),(18,49),(18,50),(18,51),(19,52),(19,53),(19,54),(20,54),(20,55);
/*!40000 ALTER TABLE `product_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'t-shirts'),(2,'t-shirt'),(3,'shirts'),(4,'shirt'),(5,'hoodie'),(6,'shorts'),(7,'short'),(8,'male'),(9,'female'),(10,'unisex'),(11,'black'),(12,'white'),(13,'pink'),(14,'brown'),(15,'yellow'),(16,'gray'),(17,'navy'),(18,'blue'),(19,'uniqlo'),(20,'x'),(21,'yoasobi'),(22,'ut'),(23,'original'),(24,'japan'),(25,'valorant'),(26,'omen'),(27,'premium'),(28,'controler'),(29,'series'),(30,'stretch'),(31,'easy'),(32,'dry'),(33,'baby'),(34,'kurokodairu'),(35,'killjoy'),(36,'sentinel'),(37,'slim'),(38,'fit'),(39,'jett'),(40,'duelist'),(41,'linen'),(42,'cotton'),(43,'sova'),(44,'initiator'),(45,'smart'),(46,'yoru'),(47,'relaco'),(48,'sage'),(49,'high'),(50,'rise'),(51,'denim'),(52,'smooth'),(53,'french'),(54,'sleeve'),(55,'neck');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `user_id` int NOT NULL,
  `product_code_code` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`product_code_code`),
  KEY `product_code_code` (`product_code_code`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_code_code`) REFERENCES `product_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-02 14:00:04
