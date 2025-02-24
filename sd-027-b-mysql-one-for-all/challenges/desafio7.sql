SELECT
    a.nome_artista as artista,
    al.nome_album as album,
    COUNT(s.artista_id) as pessoas_seguidoras
FROM
    tb_artista a
    JOIN tb_seguindo_artista s ON s.artista_id = a.artista_id
    JOIN tb_album al ON al.artista_id = a.artista_id
GROUP BY
    a.artista_id, al.album_id
ORDER BY
    pessoas_seguidoras DESC, artista, album
