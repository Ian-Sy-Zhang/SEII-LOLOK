DROP TABLE IF EXISTS `vip_card_type`;

CREATE TABLE `vip_card_type`
(
    `id`              int(11)      NOT NULL AUTO_INCREMENT,
    `price`           double       NOT NULL,
    `description`     varchar(255) NOT NULL,
    `state`           tinyint(4) DEFAULT NULL,
    `discount_rate`   float      DEFAULT NULL,
    `target_amount`   float      DEFAULT NULL,
    `discount_amount` float      DEFAULT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `vip_card`;

CREATE TABLE `vip_card`
(
    `id`        int(11)   NOT NULL AUTO_INCREMENT,
    `type_id`   int(11)            DEFAULT NULL,
    `user_id`   int(11)            DEFAULT NULL,
    `balance`   float              DEFAULT NULL,
    `join_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `vip_card_user_id_uindex` (`user_id`)
);
