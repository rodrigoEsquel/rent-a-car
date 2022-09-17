class Car {

  constructor({ id, brand, model, year, kms, color, ac, passengers, automatic }) {
    
    if (!brand || !model || !year || !kms || !color || !ac || !passengers || !automatic) {
      throw new Error('Missing parameters in Car entity')
    }
    
    this.id = id;
    this.brand = brand;
    this.model= model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac;
    this.passengers = passengers;
    this.automatic = automatic;
  }
}

module.exports = { Car }