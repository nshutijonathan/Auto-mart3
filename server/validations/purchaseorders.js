import validator from 'validator';
// All orders validations class definitions;
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

  // validating patching price
  static patchprice(req, res) {
    if (!(validator.isNumeric(req.body.amount))) {
      throw Error('Invalid amount syntax');
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
