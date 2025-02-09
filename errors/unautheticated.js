const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-error");

class UntheticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode= StatusCodes.UNAUTHORIZED
    }
}

module.exports = UntheticatedError