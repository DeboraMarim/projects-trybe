DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE IF NOT EXISTS tb_Plano (
  plano_id INT NOT NULL AUTO_INCREMENT,
  nome_plano VARCHAR(50) NOT NULL,
  tipo_plano VARCHAR(50) NOT NULL,
  valor_plano DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (plano_id)
) engine = InnoDB;


CREATE TABLE IF NOT EXISTS tb_Pessoa_Usuárias (
  pessoa_usuaria_id INT NOT NULL AUTO_INCREMENT,
  nome_pessoa_usuaria VARCHAR(50) NOT NULL,
  idade INT NOT NULL,
  plano_id INT NOT NULL,
  data_assinatura DATE NOT NULL,
  valor_plano DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (pessoa_usuaria_id),
  FOREIGN KEY (plano_id) REFERENCES tb_Plano(plano_id)
) engine = InnoDB;



CREATE TABLE IF NOT EXISTS tb_artista (
  artista_id INT NOT NULL AUTO_INCREMENT,
  nome_artista VARCHAR(50) NOT NULL,
  PRIMARY KEY (artista_id)
) engine = InnoDB;


CREATE TABLE IF NOT EXISTS tb_album (
  album_id INT NOT NULL AUTO_INCREMENT,
  nome_album VARCHAR(50) NOT NULL,
  artista_id INT NOT NULL,
  ano_lancado INT(4) NOT NULL,
  PRIMARY KEY (album_id),
  FOREIGN KEY (artista_id) REFERENCES tb_artista(artista_id)
) engine = InnoDB;


CREATE TABLE IF NOT EXISTS tb_cancao (
  cancao_id INT NOT NULL AUTO_INCREMENT,
  nome_cancao VARCHAR(50) NOT NULL,
  duracao_segundos INT NOT NULL,
  album_id INT NOT NULL,
  PRIMARY KEY (cancao_id),
  FOREIGN KEY (album_id) REFERENCES tb_album(album_id)
) engine = InnoDB;

CREATE TABLE IF NOT EXISTS tb_Historico_Reproducoes (
  reproducao_id INT NOT NULL AUTO_INCREMENT,
  pessoa_usuaria_id INT NOT NULL,
  cancao_id INT NOT NULL,
  data_reproducao DATETIME NOT NULL,
  PRIMARY KEY (reproducao_id),
  UNIQUE KEY (pessoa_usuaria_id, cancao_id, data_reproducao),
  FOREIGN KEY (pessoa_usuaria_id) REFERENCES tb_Pessoa_Usuárias(pessoa_usuaria_id),
  FOREIGN KEY (cancao_id) REFERENCES tb_cancao(cancao_id)
) engine = InnoDB;


CREATE TABLE IF NOT EXISTS tb_seguindo_artista (
  pessoa_usuaria_id INT NOT NULL,
  artista_id INT NOT NULL,
  PRIMARY KEY (pessoa_usuaria_id, artista_id),
  FOREIGN KEY (pessoa_usuaria_id) REFERENCES tb_Pessoa_Usuárias(pessoa_usuaria_id),
  FOREIGN KEY (artista_id) REFERENCES tb_artista(artista_id)
) engine = InnoDB;

INSERT INTO tb_artista (nome_artista) VALUES
('Beyoncé'),
('Queen'),
('Elis Regina'),
('Baco Exu do Blues'),
('Blind Guardian'),
('Nina Simone');

INSERT INTO tb_album (nome_album, artista_id, ano_lancado)
VALUES
  ('Renaissance', 1, 2022),
  ('Jazz', 2, 1978),
  ('Hot Space',2 , 1982),
  ('Falso Brilhante',3 ,1998),
  ('Vento de Maio',3, 2001 ),
  ('QVVJFA?', 4, 2003), 
  ('Somewhere Far Beyond', 5, 2007),
  ('I Put A Spell On You', 6, 2012);

INSERT INTO tb_cancao (nome_cancao, duracao_segundos, album_id)
VALUES
  ('BREAK MY SOUL', 279, 1),
  ('VIRGO\'S GROOVE', 369, 1),
  ('ALIEN SUPERSTAR', 116, 1),
  ('Don\'t Stop Me Now', 203, 2),
  ('Under Pressure', 152, 3),
  ('Como Nossos Pais', 105, 4),
  ('O Medo de Amar é o Medo de Ser Livre', 207, 5),
  ('Samba em Paris', 267, 6),
  ('The Bard\'s Song', 244, 7),
  ('Feeling Good', 100, 8);

INSERT INTO tb_Plano (nome_plano, tipo_plano, valor_plano)
VALUES 
  ('gratuito', 'Grátis', 0),
  ('familiar', 'Família', 7.99),
  ('universitário', 'Universitário', 5.99),
  ('pessoal', 'Individual', 6.99);
  
INSERT INTO tb_Pessoa_Usuárias (nome_pessoa_usuaria, idade, plano_id, data_assinatura, valor_plano) 
VALUES ('Barbara Liskov', 82, 1, '2019-10-20', 7.99),
       ('Robert Cecil Martin', 58, 1, '2017-01-06', 7.99),
       ('Ada Lovelace', 37, 2, '2017-12-30', 5.99),
       ('Martin Fowler', 46, 2,'2017-01-17', 5.99),
       ('Sandi Metz', 58, 2, '2018-04-29', 5.99),
       ('Paulo Freire', 19, 3, '2018-02-14', 6.99),
       ('Bell Hooks', 26, 3, '2018-01-05', 6.99),
       ('Christopher Alexander', 85, 4, '2019-06-05', 6.99),
       ('Judith Butler', 45, 4, '2020-05-13', 6.99),
       ('Jorge Amado', 58, 4, '2017-02-17', 6.99);
	
INSERT INTO tb_seguindo_artista (pessoa_usuaria_id, artista_id)
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 3),
  (3, 2),
  (4, 4),
  (5, 5),
  (5, 6),
  (6, 6),
  (6, 1),
  (7, 6),
  (9, 3),
  (10, 2);
    
INSERT INTO tb_Historico_Reproducoes (data_reproducao, cancao_id, pessoa_usuaria_id)
VALUES 
  ("2022-02-28 10:45:55", 8, 1),
  ("2020-05-02 05:30:35", 2, 1),
  ("2020-03-06 11:22:33", 10, 1),
  ("2022-08-05 08:05:17", 10, 2),
  ("2020-01-02 07:40:33", 7, 2),
  ("2020-11-13 16:55:13", 10, 3),
  ("2020-12-05 18:38:30", 2, 3),
  ("2021-08-15 17:10:10", 8, 4),
  ("2022-01-09 01:44:33", 8, 5),
  ("2020-08-06 15:23:43", 5, 5),
  ("2017-01-24 00:31:17", 7, 6),
  ("2017-10-12 12:35:20", 1, 6),
  ("2011-12-15 22:30:49", 4, 7),
  ("2012-03-17 14:56:41", 4, 8),
  ("2022-02-24 21:14:22", 9, 9),
  ("2015-12-13 08:30:22", 3, 10);
