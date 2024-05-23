create database corinthiansMinhaVida;

use corinthiansMinhaVida;

create table cadastro (
idCadastro int primary key auto_increment,
usuario varchar(45),
nome varchar(75),
email varchar(75),
senha varchar(45)
);

create table score (
idScore int primary key auto_increment,
saldo varchar(45),
dtScore datetime
);

create table cadastroScore(
idCadastroScore int,
fkCadastro int,
fkScore int,
primary key (fkCadastro, fkScore, idCadastroScore)
);

select * from cadastro;
