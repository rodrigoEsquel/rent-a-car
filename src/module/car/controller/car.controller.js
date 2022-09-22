class CarController {
  constructor(CarEntity, CarService, fileSaver) {
    this.CarEntity = CarEntity;
    this.CarService = CarService;
    this.fileSave = fileSaver;
  }

  async getAll(req, res) {
    try {
      const cars = await this.CarService.getAll();
      return res.send({ message: cars });
    } catch (error) {
      return res.send({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const car = await this.CarService.getOne(req.param.id);
      return res.send({ message: car });
    } catch (error) {
      return res.send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newCar = new this.CarEntity(req.body);
      const carCreated = await this.CarService.create(newCar);
      return res.send({ message: carCreated });
    } catch (error) {
      return res.send({ message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const car = new this.CarEntity(req.body);
      const carId = req.param.id;
      const carEdited = await this.CarService.edit(car, carId);
      return res.send({ message: carEdited });
    } catch (error) {
      return res.send({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const carId = req.param.id;
      const carDeleted = await this.CarService.delete(carId);
      return res.send({ message: carDeleted });
    } catch (error) {
      return res.send({ message: error.message });
    }
  }
}

module.exports = { CarController };

