// Importando o tipo EnergyType do módulo Energy.
import { EnergyType } from '../Energy';

// Definindo uma classe abstrata chamada Archetype.
export default abstract class Archetype {
  // Declaração de campos privados.
  private _name: string;
  private _special: number;
  private _cost: number;

  // O construtor da classe, que inicializa _name com o valor passado, e _special e _cost com 0.
  constructor(name: string) {
    this._name = name;
    this._special = 0;
    this._cost = 0;
  }

  // Getter para o campo _name.
  get name(): string {
    return this._name;
  }

  // Getter para o campo _special.
  get special(): number {
    return this._special;
  }

  // Getter para o campo _cost.
  get cost(): number {
    return this._cost;
  }

  // Método estático que lança um erro. Espera-se que seja substituído em classes derivadas.
  static createdArchetypeInstances() {
    throw new Error('Not implemented');
  }

  // Método abstrato que precisa ser implementado nas classes que estendem Archetype.
  // Ele deve retornar um valor do tipo EnergyType.
  abstract get energyType(): EnergyType;
}
