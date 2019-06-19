import validator from 'validator';
// Cars advert class definition;
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

  // validate price update method
  static priceupdate(req, res) {
    if (!(req.body.price)) {
      throw Error('this price field  is required ');
    }
    if (!(req.body.price > 0)) {
      throw Error('Price must be valid');
    }
    if (!(validator.isNumeric(req.body.price))) {
      throw Error('Invalid amount syntax');
    }
    if (validator.isEmpty(req.body.price)) {
      throw Error('this field amount is required');
    }
    if (req.body.price < 1) {
      throw Error('Invalid amount');
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

  static availablerange(req, res) {
    if (!(req.query.min_price)) {
      throw Error('min_price is required');
    }
    if (!(req.query.max_price)) {
      throw Error('max_price is required');
    }
    if (!(req.query.status)) {
      throw Error('status is required');
    }
    if (req.query.status !== 'available') {
      throw Error('status must be equal to available');
    }
    if (!validator.isAlphanumeric(req.query.min_price)) {
      throw Error('min_price must not contain special characters');
    }
    if (!validator.isAlphanumeric(req.query.max_price)) {
      throw Error('max_price must not contain special characters');
    }
    if (!validator.isAlphanumeric(req.query.status)) {
      throw Error('status must not contain special characters');
    } else {

    }
    return true;
  }

  static availablenew(req, res) {
    if (!(req.query.status)) {
      throw Error('status is required');
    }
    if (req.query.status !== 'available') {
      throw Error('status must be equal to available');
    }
    if (!(req.query.state)) {
      throw Error('state is required');
    }
    if (req.query.state !== 'new') {
      throw Error('state must be equal to new');
    } else {

    }
    return true;
  }

  static availableused(req, res) {
    if (!(req.query.status)) {
      throw Error('status is required');
    }
    if (req.query.status !== 'available') {
      throw Error('status must be equal to available');
    }
    if (!(req.query.state)) {
      throw Error('state is required');
    }
    if (req.query.state !== 'used') {
      throw Error('state must be equal to used');
    } else {

    }
    return true;
  }

  static availablemanufactures(req, res) {
    if (!(req.query.status)) {
      throw Error('status is required');
    }
    if (req.query.status !== 'available') {
      throw Error('status must be equal to available');
    }
    if (!(req.query.manufacturer)) {
      throw Error('manufacturer is required');
    }
    if (!validator.isAlphanumeric(req.query.status)) {
      throw Error('status must not contain special characters');
    }
    if (!validator.isAlphanumeric(req.query.manufacturer)) {
      throw Error('manufacturer must not contain special characters');
    } else {

    }
    return true;
  }

  static availablebodytypes(req, res) {
    if (!(req.query.status)) {
      throw Error('status is required');
    }
    if (req.query.status !== 'available') {
      throw Error('status must be equal to available');
    }
    if (!(req.query.body_type)) {
      throw Error('body_type  is required');
    }
    if (!validator.isAlphanumeric(req.query.status)) {
      throw Error('status must not contain special characters');
    }
    if (!validator.isAlphanumeric(req.query.body_type)) {
      throw Error('body_type must not contain special characters');
    } else {

    }
    return true;
  }
}
export default Carsvalidations;
