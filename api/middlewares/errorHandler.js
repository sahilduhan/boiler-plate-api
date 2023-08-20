const { VALIDATION_ERROR, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../constants");


const errorHandler = (err, req, res, next) => {
    // console.log(err.stack);
    const statusCode = err.statusCode || 500;

    switch(statusCode){
    case VALIDATION_ERROR:
        res.status(400).json({
            success: false,
            message :"Validation error"
        })
        break;
    case UNAUTHORIZED:
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
        break;

    case FORBIDDEN:
        res.status(403).json({
            success: false,
            message: "Forbidden"
        })
        break;

    case NOT_FOUND:
        res.status(404).json({
            success: false,
            message: "Not Found"
        })
        break;
    case INTERNAL_SERVER_ERROR:
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        break; 

    }
}

module.exports = errorHandler;