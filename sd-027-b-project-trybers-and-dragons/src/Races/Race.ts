// Definindo uma classe abstrata Race.
export default abstract class Race {
  // O construtor da classe aceita um nome (privado) e uma destreza (pública).
  constructor(
    private _name: string,
    public _dexterity: number,
  ) {}

  // Método abstrato que será implementado pelas subclasses. 
  // Retorna o número máximo de pontos de vida.
  abstract get maxLifePoints(): number;

  // Getter para o nome.
  get name(): string {
    return this._name;
  }

  // Getter para a destreza.
  get dexterity(): number {
    return this._dexterity; 
  }

  // Método estático que lança um erro quando chamado. 
  // As subclasses deverão implementar este método para retornar o número de instâncias criadas.
  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }
}
