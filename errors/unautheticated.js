const CustomAPIError = require("./custom-error");

class UntheticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode= 401
    }
}