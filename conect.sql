USE skefesa;

CREATE USER 'grupo'@'localhost' IDENTIFIED BY '12345678';

GRANT ALL PRIVILEGES ON *.* TO
'grupo'@'localhost';

FLUSH PRIVILEGES;