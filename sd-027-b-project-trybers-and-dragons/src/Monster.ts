// Importando a interface SimpleFighter do módulo './Fighter'
import { SimpleFighter } from './Fighter';

// Criando uma classe Monster que implementa a interface SimpleFighter
export default class Monster implements SimpleFighter {
  // Propriedades da classe Monster
  protected _lifePoints: number; // vida do monstro
  private _strength: number; // força do monstro

  // Construtor que é chamado ao criar um novo monstro
  constructor() {
    this._lifePoints = 85; // Atribui 85 pontos de vida para o monstro
    this._strength = 63; // Atribui 63 pontos de força para o monstro
  }

  // Método getter para obter os pontos de vida do monstro
  get lifePoints(): number {
    return this._lifePoints;
  }

  // Método getter para obter a força do monstro
  get strength(): number {
    return this._strength;
  }

  // Método que recebe a quantidade de dano que o monstro deve receber
  public receiveDamage(attackPoints: number): number {
    // Reduz os pontos de vida do monstro pelos pontos de ataque recebidos
    // Se os pontos de vida do monstro caírem abaixo de 0, define como -1
    this._lifePoints = this._lifePoints - attackPoints > 0
      ? this._lifePoints - attackPoints
      : -1;
    // Retorna os pontos de vida restantes do monstro
    return this._lifePoints;
  }

  // Método que permite ao monstro atacar um inimigo
  attack(enemy: SimpleFighter): void {
    // O monstro ataca o inimigo com sua força
    enemy.receiveDamage(this._strength);
  }
}
