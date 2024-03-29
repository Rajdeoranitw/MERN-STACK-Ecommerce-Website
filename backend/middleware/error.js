const ErrorHander = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHander(message, 400);
    }

    // wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `json web token is invalid, Try again`;
        err = new ErrorHander(message, 400);
    }

    // JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = `json web token is expired, Try again`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,

    })

}