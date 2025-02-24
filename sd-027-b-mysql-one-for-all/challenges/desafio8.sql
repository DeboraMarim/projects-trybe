SELECT 
	ar.nome_artista as artista,
    al.nome_album as album
FROM tb_artista as ar
JOIN tb_album as al ON ar.artista_id = al.artista_id
WHERE ar.nome_artista = 'Elis Regina';

