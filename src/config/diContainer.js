const { default: DIContainer, object, use, factory } = require('rsdi');
const {
  CarRepository,
  CarService,
  CarController,
} = require('../module/car/car.module.js');
const Database = require('better-sqlite3');
const multer = require('multer');
const fs = require('fs');

function initializeFilesaver() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img');
    },
    filename: function (req, file, cb) {
      cb(null, 'temp' + file.originalname.match(/.[a-zA-Z]*$/));
    },
  });
  const upload = multer({ storage: storage });
  return upload.single('img');
}

function initializeDatabase() {
  const carDatabase = new Database('data/data.db', {
    verbose: console.log,
  });
  console.log(carDatabase);
  return carDatabase;
}

function configureDI() {
  const container = new DIContainer();
  container.add({
    fileManager: fs,
    fileSave: factory(initializeFilesaver),
    database: factory(initializeDatabase),
    carRepository: object(CarRepository).construct(
      use('database'),
      use('fileManager'),
    ),
    carService: object(CarService).construct(use('carRepository')),
    carController: object(CarController).construct(
      use('carService'),
      use('fileSave'),
    ),
  });

  return container;
}

function configureCarRouter(app, diContainer) {
  const carController = diContainer.get('carController');
  app
    .route('/cars')
    .get(carController.getAll.bind(carController))
    .post(
      carController.fileSave.bind(carController),
      carController.create.bind(carController),
    );
  app
    .route('/cars/:id')
    .get(carController.getOne.bind(carController))
    .put(
      carController.fileSave.bind(carController),
      carController.edit.bind(carController),
    )
    .delete(carController.delete.bind(carController));
}

function configureCarTable(diContainer) {
  const carRepository = diContainer.get('carRepository');
  carRepository.createTable.bind(carRepository)();
}

module.exports = {
  configureDI,
  configureCarRouter,
  configureCarTable,
};

