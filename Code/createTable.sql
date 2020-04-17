
CREATE TABLE if not exists movies (
  id varchar(10) NOT NULL,
  title varchar(100) not null,
  year int not null,
  director varchar(100) not null,
  PRIMARY KEY (id)
);


create table if not exists `moviedb`.`stars` (
	id varchar(10) not null,
    name varchar (100) not null,
    birthYear int,
    primary key(id)
);


create table if not exists `moviedb`.`stars_in_movies` (
	starId varchar(10) not null,
    movieId varchar (10) not null,
    FOREIGN KEY (starId) REFERENCES stars(id),
    foreign key (movieId) references movies(id)
);


create table if not exists `moviedb`.`genres` (
	id int not null auto_increment,
    name varchar (32) not null,
    primary key(id)
);


create table if not exists `moviedb`.`genres_in_movies` (
	genreId int not null,
    movieId varchar (10) not null,
    foreign key (genreId) references genres(id),
    foreign key (movieId) references movies(id)
);


create table if not exists `moviedb`.`creditcards` (
	id varchar(20) not null,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    expiration Date not null,
    primary key (id)
);


create table if not exists `moviedb`.`customers` (
	id int not null auto_increment,
    firstName varchar (50) not null,
    lastName varchar (50) not null,
    ccId varchar (20) not null,
    address varchar (200) not null,
    email varchar (50) not null,
    password varchar (20) not null,
    primary key(id),
    foreign key (ccId) references creditcards(id)
);


create table if not exists `moviedb`.`sales` (
	id int not null auto_increment,
    customerId int not null,
    movieId varchar(10) not null,
    saleDate Date not null,
    primary key (id),
    foreign key (customerId) references customers(id),
    foreign key (movieId) references movies(id)
);


create table if not exists `moviedb`.`ratings` (
	movieId varchar(10) not null,
    rating float not null,
    numVotes int not null,
    foreign key(movieId) references movies(id)
);







