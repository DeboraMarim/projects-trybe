// Importa as classes e interfaces necessárias
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

// Classe Character que implementa a interface Fighter.
export default class Character implements Fighter {
  // Define as propriedades privadas da classe
  private _race: Race;
  private _archeType: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  // Construtor da classe
  constructor(private name: string) {
    this._dexterity = getRandomInt(1, 10); // Define a dexteridade de forma aleatória
    this._race = new Elf(name, this._dexterity); // Define a raça do personagem
    this._archeType = new Mage(name); // Define o arquétipo do personagem
    this._maxLifePoints = this._race.maxLifePoints / 2; // Define os pontos de vida máximos
    this._lifePoints = this._maxLifePoints; // Inicia os pontos de vida com o máximo
    this._defense = getRandomInt(1, 10); // Define a defesa de forma aleatória
    this._strength = getRandomInt(1, 10); // Define a força de forma aleatória
    // Define o tipo e quantidade de energia
    this._energy = {
      type_: this._archeType.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  // Métodos getter para acessar as propriedades do personagem

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archeType;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  // Método para receber dano do inimigo
  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense; // Calcula o dano
    const totalDamage = damage > 0 ? damage : 1; // Garante que o dano mínimo é 1
    const totalLife = this._lifePoints - totalDamage; // Subtrai o dano dos pontos de vida
    // Garante que a vida não fique negativa
    this._lifePoints = totalLife > 0 ? totalLife : -1;
    return this._lifePoints;
  }

  // Método para atacar o inimigo
  attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  // Método para subir de nível
  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10); // Aumenta os pontos de vida máximos
    this._strength += getRandomInt(1, 10); // Aumenta a força
    this._dexterity += getRandomInt(1, 10); // Aumenta a dexteridade
    this._defense += getRandomInt(1, 10); // Aumenta a defesa
    this._energy.amount = 10; // Recarrega a energia

    // Garante que os pontos de vida não ultrapassem o máximo permitido pela raça
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints; // Recupera todos os pontos de vida
  }
}
