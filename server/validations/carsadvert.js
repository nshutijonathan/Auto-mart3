import validator from 'validator';

class Carsvalidations {
  static createcarsad(req, res) {
    if (validator.isEmpty(req.body.state)) {
      throw Error('This Field state must not be empty');
    }
    if (req.body.state !== 'new' && req.body.state !== 'used') {
      throw Error('Field state must be new or used');
    }
    if (validator.isEmpty(req.body.status)) {
      throw Error('This Field status must not be empty');
    }

    if (req.body.status !== 'available') {
      throw Error('this status field must available');
    }
    if (validator.isEmpty(req.body.price)) {
      throw Error('Price field must not be empty');
    }
    if (!(req.body.price > 0)) {
      throw Error('Price must be valid');
    }

    if (validator.isEmpty(req.body.manufacturer)) {
      throw Error('This field manufacturer must not be empty');
    }
    if (validator.isNumeric(req.body.manufacturer)) {
      throw Error('This field manufacturer must be string');
    }
    if (!validator.isAlphanumeric(req.body.manufacturer)) {
      throw Error('manufacturer must not contain special characters');
    }
    if (validator.isEmpty(req.body.model)) {
      throw Error('This field model must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.model)) {
      throw Error('This field model must be string');
    }
    if (!validator.isAlphanumeric(req.body.model)) {
      throw Error('model must not contain special characters');
    }
    if (validator.isEmpty(req.body.body_type)) {
      throw Error('This field body_type is required');
    }
    if (!validator.isAlphanumeric(req.body.body_type)) {
      throw Error('body_type must not contain special characters');
    } else {

    }
    return true;
  }

  static priceupdate(req, res) {
    if (!(req.body.price)) {
      throw Error('this price field  is required ');
    }
    if (!(req.body.price > 0)) {
      throw Error('Price must be valid');
    } else {

    }
    return true;
  }

  static statusupdate(req, res) {
    if (!(req.body.status)) {
      throw Error('this status field  is required ');
    }
    if (validator.isEmpty(req.body.status)) {
      throw Error('This Field status must not be empty');
    }

    if (req.body.status !== 'available' && req.body.status !== 'sold') {
      throw Error('this status field must available or sold');
    } else {

    }
    return true;
  }
}
export default Carsvalidations;
