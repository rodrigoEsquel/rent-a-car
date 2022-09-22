const { default: DIContainer, object, use, factory } = require('rsdi');
const { Car, CarRepository, CarService, CarController } = require('../module/car/car.module.js');

function configureDI() {
  const container = new DIContainer();

  container.add({
    car: factory(Car),
    carRepository: object(CarRepository).construct(use('car')),
    carService: object(CarService).construct(use('carRepository'), use('car')),
    carController: object(CarController).construct(use('carService'), use('fileSaver')),
  });

  return container;
}

function configureCarRouter(app, diContainer) {
  const carController = diContainer.get('carController');
  app.route('/cars').get(carController.getAll).post(carController.create);
  app.route('/cars/:id').get(carController.getOne).put(carController.edit).delete(carController.delete);
}

module.exports = {
  configureCarRouter,
  configureDI,
};

