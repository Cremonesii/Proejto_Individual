create database corinthiansMinhaVida;

use corinthiansMinhaVida;

create table cadastro (
idCadastro int primary key auto_increment,
usuario varchar(45),
nome varchar(45),
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

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES cadastro(idCadastro)
);

select * from cadastro;
select * from score;
select * from aviso;

-- SELECT PARA VER O QUIZ
select acerto, erro from score where idScore = (select max(idScore) from score where fkUsuario = idCadastro);

-- SELECT PARA VER AS MENSAGENS NO CHAT
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