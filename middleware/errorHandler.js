function errorHandler (err, req, res, next) {
    // console.log(err);
    if (err.name === "Email or Password required") {
      res.status(400).json({
        message: "Email or Password required",
      });
    } else if (err.name === "SequelizeValidationError" ||err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: err.errors[0].message,
      });
    } else if (err.name === "Invalid Credential") {
      res.status(401).json({
        message: "Wrong Email or Password",
      });
    } else if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "Invalid Token",
      });
    } else if (err.name === "forbidden") {
      res.status(403).json({
        message: "Not Allowed",
      });
    } else if (err.name === "NotFound") {
      res.status(404).json({
        message: "Resource Not Found",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  module.exports = errorHandler