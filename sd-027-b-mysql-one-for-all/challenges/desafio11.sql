SELECT a.nome_album AS album, COUNT(f.cancao_id) AS `favoritadas`
FROM tb_album AS a
  INNER JOIN tb_cancao AS c ON a.album_id = c.album_id
  INNER JOIN favoritas AS f ON c.cancao_id = f.cancao_id
GROUP BY a.album_id
ORDER BY `favoritadas` DESC, album
LIMIT 3;
