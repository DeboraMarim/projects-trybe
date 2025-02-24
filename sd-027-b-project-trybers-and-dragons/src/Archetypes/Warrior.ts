// Importando o tipo EnergyType do módulo Energy.
import { EnergyType } from '../Energy';
// Importando a classe abstrata Archetype.
import Archetype from './Archetype';

// Definindo uma classe Warrior que estende a classe abstrata Archetype.
export default class Warrior extends Archetype {
  // Declaração de um campo privado e somente leitura para armazenar o tipo de energia.
  private readonly _energy: EnergyType;
  // Declaração de um campo estático para contar a quantidade de instâncias da classe Warrior.
  private static _Count = 0;
  
  // Construtor da classe Warrior.
  constructor(name: string) {
    super(name); // Chama o construtor da classe base (Archetype) passando o nome.
    Warrior._Count += 1; // Incrementa o contador de instâncias de Warrior.
    this._energy = 'stamina'; // Define o tipo de energia como 'stamina'.
  }

  // Getter para o campo _energy.
  get energyType(): EnergyType {
    return this._energy;
  }

  // Método estático que sobrescreve o método da classe base.
  // Retorna a quantidade de instâncias da classe Warrior criadas.
  static override createdArchetypeInstances(): number {
    return this._Count;
  }
}
