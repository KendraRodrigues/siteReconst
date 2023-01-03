-- Inserts de professores
USE skefesa;

INSERT INTO professores (matrícula, senha, nome, telefone, e_mail) 
VALUES 
('10161', '12345678', 'Gleison Samuel do Nascimento', '51223344556', 'gleison.nascimento@restinga.ifrs.edu.br'),
('10162', '124578', 'Roben Castagna Lunardi', '5133445566', 'roben.lunardi@restinga.ifrs.edu.br'),
('10163', '7894561', 'Sandra Rovena Frigeri', '5144556677', 'sandra.frigeri@restinga.ifrs.edu.br');

SELECT * FROM professores;