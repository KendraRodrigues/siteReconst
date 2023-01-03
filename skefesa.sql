CREATE TABLE skefesa;
 -- TABELAS --
CREATE TABLE administrador 
(
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (255) NOT NULL,
login VARCHAR (255) NOT NULL,
senha VARCHAR (255) NOT NULL,
PRIMARY KEY (id) 
);

CREATE TABLE modalidades
-- superior, técnico, pós-graduação --
(
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (255) NOT NULL,
PRIMARY KEY (id) 
);

CREATE TABLE turnos
(
-- manhã, tarde e noite--
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (255) NOT NULL,
PRIMARY KEY (id) 
);

CREATE TABLE cursos
(
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (255) NOT NULL, 
quantidade_periodo INT NOT NULL,
tipo_periodo VARCHAR (255) NOT NULL, -- semestre, trimestre, ano, --
modalidade_id INT NOT NULL,
turno_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (turno_id) REFERENCES turnos(id),
FOREIGN KEY (modalidade_id) REFERENCES modalidades(id)
);
CREATE TABLE professores
(
id INT NOT NULL AUTO_INCREMENT,
matrícula INT NOT NULL,
senha VARCHAR (255) NOT NULL,
nome VARCHAR (255) NOT NULL,
telefone VARCHAR (12), 
e_mail VARCHAR (255) NOT NULL,
titulações VARCHAR (255) NOT NULL,
PRIMARY KEY (id) 
);

CREATE TABLE alunos
(
id INT NOT NULL AUTO_INCREMENT,
matrícula INT NOT NULL,
senha VARCHAR (255) NOT NULL,
nome VARCHAR (255) NOT NULL,
ano_ingresso VARCHAR (4) NOT NULL,
telefone VARCHAR (12), 
email VARCHAR (255) NOT NULL,
curso_id INT NOT NULL,
professor_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (curso_id) REFERENCES cursos(id),
FOREIGN KEY (professor_id) REFERENCES professores(id)
);
CREATE TABLE trabalhos
(
id INT NOT NULL AUTO_INCREMENT,
título VARCHAR (255) NOT NULL, 
resumo VARCHAR (255) NOT NULL, 
palavras_chave VARCHAR (255) NOT NULL,
link VARCHAR (255) NOT NULL,
autor_id INT NOT NULL,
orientador_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (autor_id) REFERENCES alunos(id),
FOREIGN KEY (orientador_id) REFERENCES professores(id)
);

-- INSERTS -- 

-- PRIVILEGIOS --
