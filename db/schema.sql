DROP DATABASE IF EXISTS NFL_DB;
CREATE DATABASE NFL_DB;

USE NFL_DB;

CREATE TABLE teams (
  team_name VARCHAR(50) NOT NULL UNIQUE,
  O_rush_YPA DECIMAL(10,1) NULL,
  O_pass_YPA DECIMAL(10,1) NULL,
  D_rush_YPA DECIMAL(10,1) NULL,
  D_pass_YPR DECIMAL(10,1) NULL,
  primary key(team_name)
);

CREATE TABLE users (

  username VARCHAR(50) NOT NULL UNIQUE,
  points INT (10) NOT NUll,
  primary key(username)
);