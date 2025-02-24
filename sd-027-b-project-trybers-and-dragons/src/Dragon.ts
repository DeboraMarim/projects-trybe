import Monster from './Monster';

// Dragon class which extends the Monster class
export default class Dragon extends Monster {
  // Constructor for Dragon class
  constructor() {
    super(); // Calls the constructor of the parent class
    this._lifePoints = 999; // Sets life points for Dragon to 999
  }
}
