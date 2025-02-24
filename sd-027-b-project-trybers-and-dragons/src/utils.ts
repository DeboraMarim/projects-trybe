function getRandomInt(min: number, max: number) {
  // Math.ceil(min) arredonda o valor mínimo para o próximo número inteiro mais próximo, se não for um número inteiro
  const newMin = Math.ceil(min);

  // Math.floor(max) arredonda o valor máximo para o próximo número inteiro menor, se não for um número inteiro
  const newMax = Math.floor(max);

  // Math.random() gera um número aleatório entre 0 (inclusivo) e 1 (exclusivo)
  // Este valor é multiplicado pela diferença entre o máximo e o mínimo, para obter um valor naquele intervalo
  // O resultado é então arredondado para baixo para o próximo número inteiro menor
  // E finalmente adicionamos o valor mínimo, para garantir que o número gerado esteja no intervalo especificado
  return Math.floor(Math.random() * (newMax - newMin)) + newMin;
}

export default getRandomInt;
