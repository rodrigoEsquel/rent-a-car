class CarController {
  constructor(CarService) {
    this.CarService = CarService;
    this.fileSave = this.CarService.fileSave;
  }

  async getAll(req, res) {
    try {
      const cars = await this.CarService.getAll();
      return res.send({
        message: 'Successfully retieved cars',
        data: cars,
      });
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }

  async getOne(req, res) {
    try {
      const car = await this.CarService.getOne(req.params.id);
      return res.send({
        message: 'Successfully retieved car',
        data: car,
      });
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }

  async create(req, res) {
    try {
      const newCar = {
        ...req.body,
        img: `${req.file.destination}${req.file.filename}`,
      };
      const carCreated = await this.CarService.create(newCar);
      return res.send({
        message: 'Successfully created car',
        data: carCreated,
      });
    } catch (error) {
      return res.send({ message: error.message, data: error.stack });
    }
  }

  async edit(req, res) {
    try {
      const car = {
        ...req.body,
        img: `${req.file.destination}${req.file.filename}`,
      };
      const carId = req.params.id;
      const carEdited = await this.CarService.edit(car, carId);
      return res.send({
        message: 'Successfully edited car',
        data: carEdited,
      });
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }

  async delete(req, res) {
    try {
      const carId = req.params.id;
      await this.CarService.delete(carId);
      return res.send({ message: 'Successfully deleted car' });
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }
}

module.exports = { CarController };

