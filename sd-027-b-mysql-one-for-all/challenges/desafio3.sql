SELECT 
	tb_Pessoa_Usuárias.nome_pessoa_usuaria AS pessoa_usuaria,
    COUNT(tb_Historico_Reproducoes.cancao_id) AS musicas_ouvidas,
    ROUND(SUM(tb_cancao.duracao_segundos / 60), 2) AS total_minutos
FROM 
	tb_Pessoa_Usuárias 
	INNER JOIN tb_Historico_Reproducoes 
	ON tb_Pessoa_Usuárias.pessoa_usuaria_id = tb_Historico_Reproducoes.pessoa_usuaria_id
	INNER JOIN tb_cancao 
	ON tb_Historico_Reproducoes.cancao_id = tb_cancao.cancao_id
GROUP BY 
	tb_Pessoa_Usuárias.nome_pessoa_usuaria
ORDER BY 
	tb_Pessoa_Usuárias.nome_pessoa_usuaria ASC;