
SELECT
  tb_cancao.nome_cancao AS cancao,
  COUNT(tb_Historico_Reproducoes.cancao_id) AS reproducoes
FROM
  tb_cancao
  INNER JOIN tb_Historico_Reproducoes ON tb_cancao.cancao_id = tb_Historico_Reproducoes.cancao_id
GROUP BY
  cancao
ORDER BY
  reproducoes DESC, cancao ASC
LIMIT 2;
