const { CarService } = require('../car.service');

const repositoryMock = {
  getAll: jest.fn().mockReturnValue(['car1', 'car2', 'car3']),
  getOne: jest.fn().mockReturnValue('one car retrieved'),
  create: jest.fn().mockReturnValue('id car created'),
  edit: jest.fn(),
  delete: jest.fn(),
  deleteCarImage: jest.fn(),
  fileSave: jest.fn(),
};

const service = new CarService(repositoryMock);

describe('Car Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('getAll method', () => {
    test('should call getAll repository', () => {
      service.getAll();
      expect(service.CarRepository.getAll).toBeCalledTimes(1);
    });
    test('should return elements retrieved', async () => {
      const response = await service.getAll();
      expect(response).toEqual(['car1', 'car2', 'car3']);
    });
  });
  describe('getOne method', () => {
    test('should call GetOne repository with same id', () => {
      const id = 3;
      service.getOne(id);
      expect(service.CarRepository.getOne).toBeCalledTimes(1);
      expect(service.CarRepository.getOne).toBeCalledWith(id);
    });
    test('should return element retrieved', async () => {
      const response = await service.getOne();
      expect(response).toEqual('one car retrieved');
    });
  });
  describe('create method', () => {
    test('should call create repository with same data', () => {
      service.create('car data');
      expect(service.CarRepository.create).toBeCalledTimes(1);
      expect(service.CarRepository.create).toBeCalledWith('car data');
    });
    test('should call getOne repository with id from car created', async () => {
      await service.create('car data');
      expect(service.CarRepository.getOne).toBeCalledTimes(1);
      expect(service.CarRepository.getOne).toBeCalledWith('id car created');
    });
    test('should return element retrieved', async () => {
      const response = await service.create('car data');
      expect(response).toEqual('one car retrieved');
    });
  });
  describe('edit method', () => {
    test('should delete previous image', async () => {
      const carData = 'new data';
      const id = 3;
      await service.edit(carData, id);
      expect(service.CarRepository.deleteCarImage).toBeCalledTimes(1);
      expect(service.CarRepository.deleteCarImage).toBeCalledWith(id);
    });
    test('should call edit repository with car data', async () => {
      const carData = 'new data';
      const id = 3;
      await service.edit(carData, id);
      expect(service.CarRepository.edit).toBeCalledTimes(1);
      expect(service.CarRepository.edit).toBeCalledWith(carData, id);
    });
    test('should return car edited', async () => {
      const carData = 'new data';
      const id = 3;
      const response = await service.edit(carData, id);
      expect(service.CarRepository.getOne).toBeCalledTimes(1);
      expect(service.CarRepository.getOne).toBeCalledWith(id);
      expect(response).toEqual('one car retrieved');
    });
  });
  describe('delete method', () => {
    test('should delete car image', async () => {
      const id = 3;
      await service.delete(id);
      expect(service.CarRepository.deleteCarImage).toBeCalledTimes(1);
      expect(service.CarRepository.deleteCarImage).toBeCalledWith(id);
    });
    test('should call delete repository with same id', async () => {
      const id = 3;
      await service.delete(id);
      expect(service.CarRepository.delete).toBeCalledTimes(1);
      expect(service.CarRepository.delete).toBeCalledWith(id);
    });
  });
});

