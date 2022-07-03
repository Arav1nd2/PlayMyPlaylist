class HTTPException extends Error {
  constructor(statusCode, message) {
    super(message || this.getDefaultMessage(statusCode));
    this.name = "HTTPException";
    this.statusCode = statusCode;
  }

  getDefaultMessage(statusCode) {
    switch (statusCode) {
      case 400:
        return "Bad request. The request could not be understood by the server due to malformed syntax.";
      case 403:
        return "Unauthorized request. You are not authorized to perform actions on this resource.";
      case 404:
        return "Not Found. The resource you are looking for is not found.";
      default:
        return "Something went wrong.";
    }
  }
}

module.exports = HTTPException;
