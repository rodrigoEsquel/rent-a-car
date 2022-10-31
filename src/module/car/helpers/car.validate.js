function validateCar(reqBody) {
  if (!reqBody?.img) throw Error('No valid img in request');
  if (!reqBody?.brand) throw Error('No valid brand in request');
  if (!reqBody?.model) throw Error('No valid model in request');
  if (!reqBody?.year) throw Error('No valid year in request');
  if (!reqBody?.kms) throw Error('No valid kms in request');
  if (!reqBody?.color) throw Error('No valid color in request');
  if (!reqBody?.ac) throw Error('No valid ac in request');
  if (!reqBody?.passengers) throw Error('No valid passengers in request');
  if (!reqBody?.automatic) throw Error('No valid automatic in request');
  return true;
}

module.exports = { validateCar };

