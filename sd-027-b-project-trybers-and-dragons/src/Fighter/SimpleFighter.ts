// Definindo uma interface SimpleFighter.
export default interface SimpleFighter {
  // Definindo uma propriedade lifePoints do tipo number.
  lifePoints: number;
  // Definindo uma propriedade strength do tipo number.
  strength: number;
  
  // Definindo um método attack que recebe um SimpleFighter e não retorna nada.
  attack(enemy: SimpleFighter): void;
  // Definindo um método receiveDamage que recebe um número (attackPoints) e não retorna nada.
  receiveDamage(attackPoints: number): void;
}
