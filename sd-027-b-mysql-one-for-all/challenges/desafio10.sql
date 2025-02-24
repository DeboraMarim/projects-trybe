
CREATE TABLE IF NOT EXISTS favoritas(
    pessoa_usuaria_id INT NOT NULL,
    cancao_id INT NOT NULL,
    PRIMARY KEY (pessoa_usuaria_id, cancao_id),
    FOREIGN KEY (pessoa_usuaria_id) REFERENCES tb_Pessoa_Usuárias(pessoa_usuaria_id),
    FOREIGN KEY (cancao_id) REFERENCES tb_cancao(cancao_id)
) engine = InnoDB;

INSERT INTO favoritas (pessoa_usuaria_id, cancao_id)
VALUES
  (1, 3),
  (1, 6),
  (1, 10),
  (2, 4),
  (3, 1),
  (3, 3),
  (4, 7),
  (4, 4),
  (5, 10),
  (5, 2),
  (8, 4),
  (9, 7),
  (10, 3);