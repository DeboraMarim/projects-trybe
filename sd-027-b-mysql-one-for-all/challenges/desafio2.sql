

SELECT 
    (SELECT COUNT(*) FROM tb_cancao) AS cancoes,
    (SELECT COUNT(*) FROM tb_artista) AS artistas,
    (SELECT COUNT(*) FROM tb_album) AS albuns;