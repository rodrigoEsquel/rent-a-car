class CarRepository {
  constructor(database, fileManager) {
    this.tableName = 'cars';
    this.database = database;
    this.filePath = fileManager.filePath;
    this.fileSave = fileManager.fileSave;
    console.log('in constructor', this.fileSave);
    this.fileHandler = fileManager.fileHandler;
  }

  createTable() {
    this.database.prepare(`DROP TABLE IF EXISTS  ${this.tableName}`).run();
    this.database
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          img TEXT,
          brand TEXT,
          model TEXT,
          year INTEGER,
          kms INTEGER,
          color TEXT,
          ac TEXT,
          passengers INTEGER,
          automatic TEXT,
          createdAt INTEGER,
          editedAt INTEGER
        )`,
      )
      .run();
  }

  getAll() {
    const query = `SELECT
          id,
          img,
          brand,
          model,
          year,
          kms,
          color,
          ac,
          passengers,
          automatic 
        FROM ${this.tableName}`;
    const cars = this.database.prepare(query).expand(true).all();
    return cars.map((e) => e.cars);
  }

  getOne(id) {
    const query = `SELECT
        id,
        img,
        brand,
        model,
        year,
        kms,
        color,
        ac,
        passengers,
        automatic 
      FROM ${this.tableName} 
      WHERE id = ${id}`;
    const car = this.database.prepare(query).get();
    return car;
  }

  create(newCar) {
    const query = `INSERT INTO ${this.tableName} ( 
      img,
      brand, 
      model, 
      year, 
      kms, 
      color, 
      ac, 
      passengers, 
      automatic,
      createdAt,
      editedAt
    ) VALUES (
      '${newCar.img}',
      '${newCar.brand}',
      '${newCar.model}',
       ${newCar.year},
       ${newCar.kms},
      '${newCar.color}',
      '${newCar.ac}',
       ${newCar.passengers},
      '${newCar.automatic}',
       ${Date.now()},
       ${Date.now()}
      );`;
    const response = this.database.prepare(query).run();
    return response.lastInsertRowid;
  }

  edit(editCar, id) {
    const query = `UPDATE ${this.tableName} 
      SET
        brand = '${editCar.brand}',
        img = '${editCar.img}',
        model = '${editCar.model}',
        year = ${editCar.year},
        kms = ${editCar.kms},
        color = '${editCar.color}',
        ac = '${editCar.ac}',
        passengers = ${editCar.passengers},
        automatic = '${editCar.automatic}',
        editedAt = ${Date.now()}       
      WHERE id = ${id}`;
    this.database.prepare(query).run();
  }

  delete(id) {
    const query = `DELETE
        FROM ${this.tableName}
        WHERE id = ${id}`;
    this.database.prepare(query).run();
  }

  deleteCarImage(id) {
    const query = `SELECT img FROM ${this.tableName} WHERE id = ${id}`;
    const { img: imgPath } = this.database.prepare(query).get();
    console.log(imgPath);
    this.fileHandler.unlink(imgPath, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = { CarRepository };

