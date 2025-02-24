SELECT 
	COUNT(cancao_id) as musicas_no_historico
FROM tb_Historico_Reproducoes 
WHERE pessoa_usuaria_id = 1;
