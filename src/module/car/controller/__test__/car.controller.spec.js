const carController = require('../car.controller');

const mockService = {
  getAll: jest.fn(),
  getOne: jest.fn(),
  create: jest.fn(),
  edit: jest.fn(),
  delete: jest.fn(),
};

const controller = new carController(mockService);
describe('Car Controller', () => {
  describe('initialize', () => {
    test('should get all', () => {
      controller.getAll();

      expect(mockService.getAll).toBeCalledTimes(1);
    });
  });
});

