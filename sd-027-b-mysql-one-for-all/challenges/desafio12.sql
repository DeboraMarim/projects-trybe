SELECT
  ar.nome_artista AS artista,
  CASE   
    WHEN COUNT(fs.cancao_id) IN (1,2) THEN 'C'
    WHEN COUNT(fs.cancao_id) IN (3,4) THEN 'B'
    WHEN COUNT(fs.cancao_id) >= 5 THEN 'A'
    ELSE '-'
  END AS ranking
FROM tb_artista AS ar
    JOIN tb_album AS al ON ar.artista_id = al.artista_id
    JOIN tb_cancao AS ca ON al.album_id = ca.album_id
    LEFT JOIN favoritas AS fs ON fs.cancao_id = ca.cancao_id
GROUP BY ar.nome_artista
ORDER BY
  CASE ranking
    WHEN 'C' THEN 3
    WHEN 'B' THEN 2
    WHEN 'A' THEN 1
    WHEN '-' THEN 4
  END;
SELECT ar.name AS 'artista',
    CASE
		WHEN COUNT(pessoa_usuaria_id) >= 5 THEN 'A'
        WHEN COUNT(pessoa_usuaria_id) = 3 OR COUNT(pessoa_usuaria_id) = 4 THEN 'B'
        WHEN COUNT(pessoa_usuaria_id) = 1 OR COUNT(pessoa_usuaria_id) = 2 THEN 'C'
        ELSE '-'
	END 'ranking'
FROM tb_album AS al
	INNER JOIN tb_cancao AS s
		ON al.album_id = s.album_id
	INNER JOIN favoritas AS fav
		ON fav.cancao_id = s.cancao_id
	RIGHT JOIN tb_artista AS ar
		ON ar.artista_id = al.artista_id
	GROUP BY ar.name
    ORDER BY COUNT(pessoa_usuaria_id) DESC, ar.name;
