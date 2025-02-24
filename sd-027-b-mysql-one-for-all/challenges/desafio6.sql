SELECT 
  MIN(p.valor_plano) AS faturamento_minimo,
  MAX(p.valor_plano) AS faturamento_maximo,
  ROUND(AVG(p.valor_plano),2) AS faturamento_medio,
  SUM(p.valor_plano) AS faturamento_total 
FROM 
  tb_Pessoa_Usuárias AS u
  JOIN tb_Plano AS p ON u.plano_id = p.plano_id;
