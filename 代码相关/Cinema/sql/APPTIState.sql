DROP TABLE IF EXISTS `Expenses`;

CREATE TABLE `Expenses`
(
    `expensesId`       int(11) NOT NULL AUTO_INCREMENT,
    `userId`           int(11)  NOT NULL,
    `Amount`           double  DEFAULT NULL,
    `Description`     varchar(255) DEFAULT NULL,
    `time`            timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`expensesId`)
);


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role`     varchar(45),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_uindex` (`id`),
  UNIQUE KEY `user_username_uindex` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`(id, username, password) VALUES (1,'testname','123456'),(3,'test','123456'),(5,'test1','123456'),(7,'test121','123456'),(8,'root','123456'),(10,'roottt','123123'),(12,'zhourui','123456'),(13,'abc123','abc123'),(15,'dd','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


-- Table structure for table `hall`
--

DROP TABLE IF EXISTS `hall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hall` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `column` int(11) DEFAULT NULL,
  `row` int(11) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hall`
--

LOCK TABLES `hall` WRITE;
/*!40000 ALTER TABLE `hall` DISABLE KEYS */;
INSERT INTO hall (id, name, `column`, `row`) VALUES (1, "1号厅",12,10),(2,"2号厅",30,40);

/*!40000 ALTER TABLE `hall` ENABLE KEYS */;
UNLOCK TABLES;