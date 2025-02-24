// construido durante a mentoria com a ajuda do SUMMER !!
const createMenu = (objeto) => ({
  fetchMenu: () => objeto,
  consumption: [],
  order(itens) {
    this.consumption.push(itens);
}, 
pay() {
  let conta = 0; 
  const food = Object.entries(this.fetchMenu().food);
  const drink = Object.entries(this.fetchMenu().drink);
  const comanda = food.concat(drink);
  this.consumption.forEach((element) => {
    for (let indexB = 0; indexB < comanda.length; indexB += 1) {
      if (element === comanda[indexB][0]) conta += comanda[indexB][1];
    }
  });
  return (conta + (conta * 0.10));
      },
  });
module.exports = createMenu;
