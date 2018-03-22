DROP DATABASE IF EXISTS quiz_db;
CREATE DATABASE quiz_db;
USE quiz_db;

CREATE TABLE scores
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    score int(3) NOT NULL,
    PRIMARY KEY (id)
);