// Importando as classes Fighter e SimpleFighter.
import Fighter, { SimpleFighter } from '../Fighter';
// Importando a classe abstrata Battle.
import Battle from './Battle';

// Definindo uma classe PVE (Player Vs Environment) que estende a classe Battle.
export default class PVE extends Battle {
  // Definindo campos privados para armazenar o Fighter e uma lista de inimigos.
  constructor(
    private _fighter: Fighter,
    private enemies: Fighter[] | SimpleFighter[],
  ) {
    super(_fighter); // Chama o construtor da classe base (Battle) passando o Fighter.
  }

  // Definindo o método fight, que permite ao Fighter atacar cada inimigo.
  // Continua até que o Fighter ou o inimigo tenha pontos de vida igual a -1.
  // Finalmente, chama o método fight da classe base (Battle) e retorna seu resultado.
  fight(): number {
    this.enemies.forEach((enemy) => {
      while (this._fighter.lifePoints !== -1 && enemy.lifePoints !== -1) {
        this._fighter.attack(enemy);
        enemy.attack(this._fighter);
      }
    });
    return super.fight();
  }
}
