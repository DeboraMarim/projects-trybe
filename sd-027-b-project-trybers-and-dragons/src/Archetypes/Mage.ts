// Importando o tipo EnergyType do módulo Energy.
import { EnergyType } from '../Energy';
// Importando a classe abstrata Archetype do módulo correspondente.
import Archetype from './Archetype';

// Definindo uma classe Mage que estende a classe abstrata Archetype.
export default class Mage extends Archetype {
  // Declaração de um campo privado para armazenar o tipo de energia.
  private readonly _energy: EnergyType;
  // Declaração de um campo estático para contar a quantidade de instâncias da classe Mage.
  private static _Count = 0;
  
  // Construtor da classe Mage.
  constructor(name: string) {
    super(name); // Chama o construtor da classe base (Archetype) passando o nome.
    Mage._Count += 1; // Incrementa o contador de instâncias de Mage.
    this._energy = 'mana'; // Define o tipo de energia como 'mana'.
  }

  // Getter para o campo _energy.
  get energyType(): EnergyType {
    return this._energy;
  }

  // Método estático que sobrescreve o método da classe base.
  // Retorna a quantidade de instâncias da classe Mage criadas.
  static override createdArchetypeInstances(): number {
    return this._Count;
  }
}
