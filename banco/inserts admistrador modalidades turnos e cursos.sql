-- PREENCHIMENTO DE TABELAS administrador modalidades turnos e cursos
use skefesa;

INSERT INTO administrador (nome, login, senha) VALUES ('adm', 'adm1016', '123654');
Select * from administrador; 

INSERT INTO modalidades (nome) VALUES ('Superior'), ('Técnico'), ('Pós-Graduação');
SELECT * from modalidades;

INSERT INTO turnos (nome) VALUES ('Manhã'), ('Tarde'), ('Noite');
SELECT * from turnos;

INSERT INTO cursos (nome, quantidade_periodo, tipo_periodo, modalidade_id, turno_id)
VALUES ('Licenciatura em Letras Português e Espanhol', '8', 'Semestres', '1', '3'), 
		('Tecnologia em Análise e Desenvolvimento de Sistemas', '6', 'Semestres', '1', '1'), 
        ('Tecnologia em Eletrônica Industrial', '7', 'Semestres', '1', '3'),
       ('Tecnologia em Gestão Desportiva e de Lazer', '6', 'Semestres', '1', '2'),
        ('Tecnologia em Processos Gerenciais', '6', 'Semestres', '1', '3');
 SELECT * from cursos;





