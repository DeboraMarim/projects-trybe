 SELECT
  u.nome_pessoa_usuaria AS pessoa_usuaria,
  IF(MAX(YEAR(h.data_reproducao)) > 2020, 'Ativa', 'Inativa') AS status_pessoa_usuaria
FROM tb_Pessoa_Usuárias AS u
    INNER JOIN tb_Historico_Reproducoes AS h ON h.pessoa_usuaria_id = u.pessoa_usuaria_id
GROUP BY pessoa_usuaria
ORDER BY pessoa_usuaria ASC