const { Car } = require('./entity/car.entity');
const { CarRepository } = require('./repository/car.repository');
const { CarService } = require('./service/car.service');
const { CarController } = require('./controller/car.controller');

module.exports = {
  Car,
  CarRepository,
  CarService,
  CarController,
};

