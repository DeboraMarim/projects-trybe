// Importando o tipo EnergyType do módulo Energy.
import { EnergyType } from '../Energy';
// Importando a classe abstrata Archetype.
import Archetype from './Archetype';

// Definindo uma classe Necromancer que estende a classe abstrata Archetype.
export default class Necromancer extends Archetype {
  // Declaração de um campo privado para armazenar o tipo de energia.
  private _energy: EnergyType; 
  // Declaração de um campo estático para contar a quantidade de instâncias da classe Necromancer.
  private static _Count = 0;
  
  // Construtor da classe Necromancer.
  constructor(name: string) {
    super(name); // Chama o construtor da classe base (Archetype) passando o nome.
    Necromancer._Count += 1; // Incrementa o contador de instâncias de Necromancer.
    this._energy = 'mana'; // Define o tipo de energia como 'mana'.
  }

  // Getter para o campo _energy.
  get energyType(): EnergyType {
    return this._energy;
  }

  // Método estático que retorna a quantidade de instâncias da classe Necromancer criadas.
  static createdArchetypeInstances(): number {
    return this._Count;
  }
}
