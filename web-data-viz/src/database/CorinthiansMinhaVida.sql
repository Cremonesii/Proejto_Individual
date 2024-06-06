create database corinthiansMinhaVida;

use corinthiansMinhaVida;

create table cadastro (
idCadastro int primary key auto_increment,
usuario varchar(45),
nome varchar(45),
dtNasc date,
email varchar(75),
senha varchar(45)
);

create table score (
idScore int primary key auto_increment,
acerto int,
erro int,
fkUsuario int,
 FOREIGN KEY (fkUsuario) REFERENCES cadastro(idCadastro)
);

select * from score;

select acerto, erro from score where idScore = (select max(idScore) from score where fkUsuario = idCadastro);

create table cadastroScore(
idCadastroScore int,
fkCadastro int,
fkScore int,
primary key (fkCadastro, fkScore, idCadastroScore)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES cadastro(idCadastro)
);


select * from cadastro;

SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            c.idCadastro AS id,
            c.usuario,
            c.nome,
            c.email,
            c.senha
        FROM aviso a
            INNER JOIN cadastro c
                ON a.fk_usuario = c.idCadastro;