class CarService {
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  async getAll() {
    const cars = await this.CarRepository.getAll();
    return cars;
  }

  async getOne(id) {
    const car = await this.CarRepository.getOne(id);
    return car;
  }

  async create(newCar) {
    const carCreatedId = await this.CarRepository.create(newCar);
    const carCreated = await this.CarRepository.getOne(carCreatedId);
    await this.CarRepository.renameCarImage(carCreatedId);
    return carCreated;
  }

  async edit(editCar, id) {
    await this.CarRepository.edit(editCar, id);
    await this.CarRepository.deleteCarImage(id);
    await this.CarRepository.renameCarImage(id);
    const carEdited = await this.CarRepository.getOne(id);
    return carEdited;
  }

  async delete(id) {
    await this.CarRepository.delete(id);
    await this.CarRepository.deleteCarImage(id);
  }
}

module.exports = { CarService };

