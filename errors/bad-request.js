const CustomAPIError = require("./custom-error");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
      this.status = 400;
  }
}
