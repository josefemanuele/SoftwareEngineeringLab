CREATE DATABASE IF NOT EXISTS prenotalo_user;
USE prenotalo_user;

-- Tabelle
CREATE TABLE `users` (
  `id`        INT          NOT NULL AUTO_INCREMENT,
  `username`  VARCHAR(16)  NOT NULL,
  `password`  CHAR(64)     NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE (`username`)
);
