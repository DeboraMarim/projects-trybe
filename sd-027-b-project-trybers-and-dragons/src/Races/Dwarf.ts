// Importando a classe Race.
import Race from './Race';

// Definindo uma classe Dwarf que estende a classe Race.
export default class Dwarf extends Race {
  // Definindo um campo privado para armazenar os pontos de vida máximos.
  private _maxPoints: number;
  // Definindo um campo estático para armazenar a quantidade de instâncias da classe Dwarf.
  private static _amount = 0;

  // O construtor da classe aceita um nome e uma destreza.
  constructor(name: string, dexterity: number) {
    super(name, dexterity); // Chama o construtor da classe base (Race) passando o nome e a destreza.
    this._maxPoints = 80; // Define os pontos de vida máximos como 80.
    Dwarf._amount += 1; // Incrementa o contador de instâncias da classe Dwarf.
  }

  // Getter para os pontos de vida máximos.
  get maxLifePoints(): number {
    return this._maxPoints;
  }

  // Método estático que sobrescreve o método createdRacesInstances da classe base (Race).
  // Retorna a quantidade de instâncias da classe Dwarf.
  static override createdRacesInstances(): number {
    return Dwarf._amount;
  }
}
