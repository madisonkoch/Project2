DROP DATABASE IF EXISTS NFL_DB;
CREATE DATABASE NFL_DB;

USE NFL_DB;

CREATE TABLE teams (
  team_name VARCHAR(50) NOT NULL UNIQUE,
  O_rush_YPA DECIMAL(10,1) NULL,
  O_pass_YPA DECIMAL(10,1) NULL,
  D_rush_YPA DECIMAL(10,1) NULL,
  D_pass_YPR DECIMAL(10,1) NULL,
  minnesota boolean DEFAULT FALSE,
  primary key(team_name)
);

CREATE TABLE users (

  id INT (10) AUTO_INCREMENT NOT NULL, 
  username VARCHAR(50) NOT NULL UNIQUE,
  points INT (10) NOT NUll,
  yards INT (10) NOT NULL, 
  primary key(id)
);