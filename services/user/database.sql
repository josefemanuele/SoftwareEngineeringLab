CREATE DATABASE IF NOT EXISTS prenotalo;
USE prenotalo;

CREATE TABLE `users` (
  `id`        INT          NOT NULL AUTO_INCREMENT,
  `username`  VARCHAR(16)  NOT NULL,
  `password`  CHAR(64)     NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE (`username`)
);
