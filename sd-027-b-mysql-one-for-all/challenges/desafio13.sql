
SELECT 
  CASE 
    WHEN pu.idade <= 30 THEN 'Até 30 anos'
    WHEN pu.idade > 30 AND pu.idade <= 60 THEN 'Entre 31 e 60 anos'
    ELSE 'Maior de 60 anos'
  END AS faixa_etaria,
  COUNT(DISTINCT pu.pessoa_usuaria_id) AS total_pessoas_usuarias,
  COUNT(f.pessoa_usuaria_id) AS total_favoritadas
FROM 
  tb_Pessoa_Usuárias AS pu
LEFT JOIN favoritas AS f ON pu.pessoa_usuaria_id = f.pessoa_usuaria_id
GROUP BY faixa_etaria
ORDER BY faixa_etaria
