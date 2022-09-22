class Car {
  constructor({
    id,
    img,
    brand,
    model,
    year,
    kms,
    color,
    ac,
    passengers,
    automatic,
  }) {
    this.id = id;
    this.img = img;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac;
    this.passengers = passengers;
    this.automatic = automatic;
  }
}

module.exports = { Car };

