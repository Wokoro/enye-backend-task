/**
 * @author Wokoro Douye Samuel
 */

import { validationResult } from 'express-validator';
import middlewares from '../middlewares';
import errorHandlerMiddlewares from '../middlewares/errors.handlers';
import { Http406Error } from '../errors/client.error.spec';

/**
 * @description - A function to load all high level middlewares
 *
 * @param {object} names - Array of middlewares names to include to be added to the route.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const middlewareLoader = (names, router) => {
  for (const name of names) {
    middlewares[name](router);
  }
};

/**
 * @description - A function to load all error handling middlewares
 *
 * @param {object} names - Array of middlewares names to include.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const errorMiddlewareLoader = (names, router) => {
  for (const name of names) {
    errorHandlerMiddlewares[name](router);
  }
};

/**
 * @description - A function to load all routes
 *
 * @param {object} routes - Array of routes to be included.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const routesLoader = (routes, router) => {
  for (const route of routes) {
    const { path, handlers, method } = route;
    (router)[method](path, handlers);
  }
};

/**
 * @description - A function to send client success message
 *
 * @param {obejct} res - HTTP response object
 *
 * @param {integer} code - HTTP status code to send
 *
 * @param {string} results - Data to send to the client
 *
 * @returns {object} Returns status code and data to client
 */
export const sendSuccessMessage = (res, code, results) => res.status(code).send({
  status: code,
  message: 'success',
  results
});

/**
 * @description - A function to send client error message.
 *
 * @param {object} res - HTTP response object
 *
 * @param {integer} code - HTTP status code to send
 *
 * @param {string} error - Data to send to the client
 *
 * @returns {object} Returns status code and data to client
 */
export const sendErrorMessage = (res, code, error) => res.status(code).send({
  status: code,
  message: 'error',
  error
});

/**
 * @description - Function to return all validation errors
 *
 * @param {object} req - HTTP request object
 *
 * @param {object} res - HTTP response object
 *
 * @param {function} next - Function to trigger next function exec.
 *
 * @returns {object} - Returns constructed error message
 */
export const generateErrorReport = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const validationError = result.array().map(e => e.msg);
    throw new Http406Error(validationError);
  }
  return next();
};
