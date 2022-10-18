class CarController {
  constructor(CarService) {
    this.CarService = CarService;
    this.fileSave = this.CarService.fileSave;
  }

  async getAll(req, res) {
    try {
      const cars = await this.CarService.getAll();
      return res.render('layout/carList.njk', {
        message: 'Successfully retieved cars',
        data: cars,
      });
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }

  async newCarForm(req, res) {
    try {
      const car = {
        id: '',
        img: '',
        brand: '',
        model: '',
        year: '',
        kms: '',
        color: '',
        ac: '',
        passengers: '',
        automatic: '',
      };
      return res.render('layout/form.njk', {
        message: 'Successfully retieved cars',
        path: '../',
        car,
      });
    } catch (error) {
      return res.send({ message: error.message, data: error.stack });
    }
  }

  async editCarForm(req, res) {
    try {
      const carId = req.params.id;
      const car = await this.CarService.getOne(carId);
      return res.render('layout/form.njk', {
        message: 'Successfully retieved car',
        path: `./${carId}`,
        car,
      });
    } catch (error) {
      return res.send({ message: error.message, data: error.stack });
    }
  }

  async create(req, res) {
    try {
      const newCar = req.file
        ? { ...req.body, img: `${req.file.path.replace(/\\/g, '/')}` }
        : req.body;
      await this.CarService.create(newCar);
      console.log('Car sucessfully created');
      return res.redirect(301, '/cars/');
    } catch (error) {
      return res.send({ message: error.message, data: error.stack });
    }
  }

  async edit(req, res) {
    try {
      const car = req.file
        ? { ...req.body, img: `${req.file.path.replace(/\\/g, '/')}` }
        : req.body;
      const carId = req.params.id;
      await this.CarService.edit(car, carId);
      return res.redirect(301, '/cars/');
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }

  async delete(req, res) {
    try {
      const carId = req.params.id;
      await this.CarService.delete(carId);
      console.log('Car sucessfully deleted');
      return res.redirect(301, '/cars/');
    } catch (error) {
      return res.send({ message: error.message, stack: error.stack });
    }
  }
}

module.exports = { CarController };

