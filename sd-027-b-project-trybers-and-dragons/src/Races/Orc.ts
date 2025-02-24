// Importando a classe Race.
import Race from './Race';

// Definindo uma classe Orc que estende a classe Race.
export default class Orc extends Race {
  // Definindo um campo privado para armazenar os pontos de vida máximos.
  private _maxLifePoints: number;
  // Definindo um campo estático para armazenar a quantidade de instâncias da classe Orc.
  private static _amount = 0;

  // O construtor da classe aceita um nome e uma destreza.
  constructor(name: string, dexterity: number) {
    super(name, dexterity); // Chama o construtor da classe base (Race) passando o nome e a destreza.
    this._maxLifePoints = 74; // Define os pontos de vida máximos como 74.
    Orc._amount += 1; // Incrementa o contador de instâncias da classe Orc.
  }

  // Getter para os pontos de vida máximos.
  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  // Método estático que retorna a quantidade de instâncias da classe Orc.
  static createdRacesInstances(): number {
    return Orc._amount;
  }
}
