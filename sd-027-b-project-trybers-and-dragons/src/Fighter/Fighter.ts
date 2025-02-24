// Importando o tipo Energy.
import Energy from '../Energy';
// Importando a interface SimpleFighter.
import SimpleFighter from './SimpleFighter';

// Definindo uma interface Fighter que estende a interface SimpleFighter.
export default interface Fighter extends SimpleFighter {
  // Definindo uma propriedade lifePoints do tipo number.
  lifePoints: number;
  // Definindo uma propriedade defense do tipo number.
  defense: number;
  // Definindo uma propriedade opcional energy do tipo Energy.
  energy?: Energy;
  
  // Definindo um método especial opcional que recebe um Fighter e não retorna nada.
  special?(enemy: Fighter): void,
  // Definindo um método levelUp que não recebe argumentos e não retorna nada.
  levelUp(): void,
}
