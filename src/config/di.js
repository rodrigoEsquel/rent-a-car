const { default: DIContainer, object, use, factory, func, IDIContainer } = require("rsdi");
const { Car, CarRepository, CarService, CarController } = require("../module/car/car.module.js");

function configureDI() {
  const container = new DIContainer();
  container.add({
    car: object(Car),
    carRepository: object(CarRepository).construct(use('car')),
    carService: object(CarService).construct(use('carRepository'),use('car')),
    carController: object(CarController).construct(use('carService'),use('fileSaver')),
  });
  return container;
}

function configureCarRouter(
  app,
  diContainer
) {
  const carController = diContainer.get('carController');
  app
    .route("/cars")
    .get(carController.get)
    .post(carController.create);
}

module.exports = {
  configureCarRouter,
  configureDI
}