class CarService {
  constructor(CarRepository, carValidator) {
    this.CarRepository = CarRepository;
    this.fileSave = this.CarRepository.fileSave;
    this.carValidator = carValidator;
  }

  async getAll() {
    const cars = await this.CarRepository.getAll();
    return cars;
  }

  async getOne(id) {
    const car = await this.CarRepository.getOne(id);
    this.carValidator(car);
    return car;
  }

  async create(newCar) {
    this.carValidator(newCar);
    const carCreatedId = await this.CarRepository.create(newCar);
    const carCreated = await this.CarRepository.getOne(carCreatedId);
    this.carValidator(carCreated);
    return carCreated;
  }

  async edit(editCar, id) {
    this.carValidator(editCar);
    await this.CarRepository.deleteCarImage(id);
    await this.CarRepository.edit(editCar, id);
    const carEdited = await this.CarRepository.getOne(id);
    this.carValidator(carEdited);
    return carEdited;
  }

  async delete(id) {
    await this.CarRepository.deleteCarImage(id);
    await this.CarRepository.delete(id);
  }
}

module.exports = { CarService };

