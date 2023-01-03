-- INSERT ALUNOS
USE skefesa;

INSERT INTO alunos (matrícula, senha, nome, ano_ingresso, telefone, email, curso_id, professor_id)
VALUES 
('1016100', '123456', 'Kendra Rodrigues', '2022', '517896586', '10160100@restinga.ifrs.edu.br', '2', '1'),
('1016112', '456789', 'Steicy Schirmann', '2021', '512657489', '10160112@restinga.ifrs.edu.br', '3', '2'),
('1016111', '789123', 'Fernanda Pinheiro', '2022', '51487963', '10160111@restinga.ifrs.edu.br', '5', '3'),
('1016110', '147258', 'Sabrina Pacini', '2023', '512456856', '10160110@restinga.ifrs.edu.br', '1', '1');

SELECT * FROM alunos;