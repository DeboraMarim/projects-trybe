// Importando a classe Fighter.
import Fighter from '../Fighter';

// Definindo uma classe abstrata chamada Battle.
abstract class Battle {
  // Definindo um campo protegido chamado player do tipo Fighter.
  // Este campo pode ser acessado pelas classes que herdam de Battle.
  constructor(protected player: Fighter) { }

  // Definindo um método fight que retorna um número.
  // Se os pontos de vida do player forem -1, retorna -1. Caso contrário, retorna 1.
  fight(): number {
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}

// Exportando a classe Battle.
export default Battle;
