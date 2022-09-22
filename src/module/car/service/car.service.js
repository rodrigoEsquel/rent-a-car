class CarService {
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }
  getAll() {
    console.log('all cars fetched');
  }

  getOne() {
    console.log('one car fetched');
  }

  create() {
    console.log('one car created');
  }

  edit() {
    console.log('one car edited');
  }

  delete() {
    console.log('one car deleted');
  }
}

module.exports = { CarService };

