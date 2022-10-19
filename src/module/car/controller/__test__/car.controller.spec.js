const { CarController } = require('../car.controller');

const resMock = {
  send: jest.fn(),
  render: jest.fn(),
  redirect: jest.fn(),
};

const serviceMock = {
  getAll: jest.fn(),
  getOne: jest.fn(),
  create: jest.fn(),
  edit: jest.fn(),
  delete: jest.fn(),
};

const controller = new CarController(serviceMock);

describe('Car Controller', () => {
  let req;
  beforeEach(() => {
    req = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll method', () => {
    beforeEach(() => {
      controller.getAll(req, resMock);
    });
    test('should call getAll service', () => {
      expect(serviceMock.getAll).toBeCalledTimes(1);
    });
    test('should render the view', () => {
      expect(resMock.render).toBeCalledTimes(1);
      expect(resMock.render).toBeCalledWith('layout/carList.njk', {
        data: undefined,
        message: 'Successfully retieved cars',
      });
    });
  });
  describe('newCarForm method', () => {
    test('should render the view', () => {
      controller.newCarForm(req, resMock);
      expect(resMock.render).toBeCalledTimes(1);
      expect(resMock.render).toBeCalledWith('layout/form.njk', {
        message: 'Successfully retrieved form',
        path: '../',
        car: {
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
        },
      });
    });
  });
  describe('editCar method', () => {
    const idNumber = 3;
    beforeEach(() => {
      req = { params: { id: idNumber } };
      controller.editCarForm(req, resMock);
    });
    test('should call getOne service with id number', () => {
      expect(controller.CarService.getOne).toBeCalledTimes(1);
      expect(controller.CarService.getOne).toBeCalledWith(idNumber);
    });
    test('should render the view', () => {
      expect(resMock.render).toBeCalledTimes(1);
    });
  });
  describe('create method', () => {
    beforeEach(() => {
      req = {
        body: { inputs: 'values' },
        file: { path: 'file' },
      };
      controller.create(req, resMock);
    });
    test('should call create service with input values', () => {
      expect(controller.CarService.create).toBeCalledTimes(1);
      expect(controller.CarService.create).toBeCalledWith({
        inputs: 'values',
        img: 'file',
      });
    });
    test('should redirect to /cars/', () => {
      expect(resMock.redirect).toBeCalledTimes(1);
      expect(resMock.redirect).toBeCalledWith(301, '/cars/');
    });
  });
  describe('edit method', () => {
    const idNumber = 3;
    beforeEach(() => {
      req = {
        body: { inputs: 'values' },
        file: { path: 'file' },
        params: { id: idNumber },
      };
      controller.edit(req, resMock);
    });
    test('should call edit service with input values and idNumber', () => {
      expect(controller.CarService.edit).toBeCalledTimes(1);
      expect(controller.CarService.edit).toBeCalledWith(
        {
          inputs: 'values',
          img: 'file',
        },
        idNumber,
      );
    });
    test('should redirect to /cars/', () => {
      expect(resMock.redirect).toBeCalledTimes(1);
      expect(resMock.redirect).toBeCalledWith(301, '/cars/');
    });
  });

  describe('delete method', () => {
    const idNumber = 3;
    beforeEach(() => {
      req = { params: { id: idNumber } };
      controller.delete(req, resMock);
    });
    test('should call delete service with idNumber', () => {
      expect(controller.CarService.delete).toBeCalledTimes(1);
      expect(controller.CarService.delete).toBeCalledWith(idNumber);
    });
    test('should redirect to /cars/', () => {
      expect(resMock.redirect).toBeCalledTimes(1);
      expect(resMock.redirect).toBeCalledWith(301, '/cars/');
    });
  });
});

