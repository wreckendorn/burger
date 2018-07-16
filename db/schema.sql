CREATE DATABASE burgers_db;
USE burgers_db;
CREATE TABLE burgers (
    id INTEGER(10) AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    eaten BOOLEAN DEFAULT false,
    primary key(id)
);
