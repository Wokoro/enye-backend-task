/**
 * @author - Wokoro Douye Samuel
 */

/**
 * @class
 *
 * @description - An abstract class for server side errors.
 */
export class HttpServerError extends Error {
  /**
   * @constructor
   *
   * @param {string} message - Error message to return.
   *
   * @param {number} status - HTTP status code to return.
   */
  constructor(message = 'HTTPServerError occured!') {
    super(message);

    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @description - A setter function to set message property
   *
   * @param {string | object} str - Error message either and object or a string
   */
  set message(str) {
    if (str instanceof Object) {
      this.message = JSON.stringify(str);
    } else {
      this.message = str;
    }
  }
}

/**
 * @class
 *
 * @description - Class for HTTP503 error
 */
export class Http503Error extends HttpServerError {
  /**
   * @description - Constructor function for HTTP400 error
   *
   * @param {String} message
   *
   * @param {Number} status
   */
  constructor(message = 'Server busy', status = 503) {
    super(message);
    this.status = status;
  }
}
