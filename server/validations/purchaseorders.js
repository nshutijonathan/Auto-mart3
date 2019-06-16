import validator from 'validator';

class Ordersvalidations {
  static create(req, res) {
    if (validator.isEmpty(req.body.car_id)) {
      throw Error('this field car_id is required');
    }
    if (!(validator.isNumeric(req.body.car_id))) {
      throw Error('Invalid car id syntax');
    }
    if (req.body.car_id < 1) {
      throw Error('Invalid car id syntax');
    }
    if (validator.isEmpty(req.body.amount)) {
      throw Error('this field amount is required');
    }
    if (req.body.amount < 1) {
      throw Error('Invalid amount');
    } else {

    }
    return true;
  }
}
export default Ordersvalidations;
