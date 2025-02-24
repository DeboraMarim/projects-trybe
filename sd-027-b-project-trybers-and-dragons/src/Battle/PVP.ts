// Importando a classe Fighter.
import Fighter from '../Fighter';
// Importando a classe abstrata Battle.
import Battle from './Battle';

// Definindo uma classe PVP (Player Vs Player) que estende a classe Battle.
export default class PVP extends Battle {
  // Definindo campos privados para armazenar os dois jogadores.
  constructor(private _player1: Fighter, private _player2: Fighter) {
    super(_player1); // Chama o construtor da classe base (Battle) passando o primeiro jogador.
  }

  // Definindo o método fight, que permite aos dois jogadores se atacarem mutuamente.
  // Continua até que um dos jogadores tenha pontos de vida igual a -1.
  // Finalmente, chama o método fight da classe base (Battle) e retorna seu resultado.
  fight(): number {
    while (this._player1.lifePoints !== -1 && this._player2.lifePoints !== -1) {
      this._player1.attack(this._player2);
      this._player2.attack(this._player1);
    }
    return super.fight();
  }
}
