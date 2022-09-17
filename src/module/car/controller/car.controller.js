class CarController {

  constructor(CarEntity,CarService,fileSaver) {
    this.CarEntity = CarEntity;
    this.CarService = CarService;
    this.fileSave = fileSaver;
  }

  getAll(req, res) {
    try {
      this.CarService.getAll();
    } catch (error) {
      return(res.send({message: error.message}))
    }
  }

  getOne(req, res) {
    try {
      this.CarService.getOne(req.param.id);
    } catch (error) {
      return(res.send({message: error.message}))
    }
  }

  create(req, res) {
    try {
      const newCar = new this.CarEntity(req.body);
      this.CarService.create(newCar);
    } catch (error) {
      return(res.send({message: error.message}))
    }
  }

  edit(req, res) {
    try {
      const editedCar = new this.CarEntity(req.body);
      this.CarService.edit(editedCar,req.param.id);      
    } catch (error) {
      return(res.send({message: error.message}))
    }
  }

  delete(req, res) {
    try {
    this.CarService.delete(req.param.id);
    } catch (error) {
      return(res.send({message: error.message}))
    }
  }





}

module.exports = {CarController}