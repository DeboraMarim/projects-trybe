// Definindo um tipo chamado EnergyType que pode ser 'mana' ou 'stamina'.
export type EnergyType = 'mana' | 'stamina';

// Definindo uma interface chamada Energy
export default interface Energy {
  type_: EnergyType; // Um campo 'type_' que deve ser do tipo EnergyType, ou seja, 'mana' ou 'stamina'
  amount: number; // Um campo 'amount' que representa a quantidade atual de energia, que deve ser um número
}
