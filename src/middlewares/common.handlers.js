/**
 * @author - Wokoro Douye Samuel
 */

import compression from 'compression';
import cors from 'cors';
import parser from 'body-parser';
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import toobusy from 'node-toobusy';

import winston from '../config/winston';
import { Http503Error } from '../errors/server.error.spec';

/**
 * @description - Middleware to compress response to client.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const compressionHandler = (router) => {
  router.use(compression());
};

/**
 * @description - Middleware to compress response to client.
 *
 * @param {Object} router - Express router object
 *
 * @returns {Void} - No return value
 */
export const corsHandler = (router) => {
  router.use(cors({ credentials: true, origin: true }));
};

/**
 * @description - Middleware to extract parameter(s) from request object.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const bodyParserHandler = (router) => {
  router.use(parser.urlencoded({ extended: true, limit: '10kb' }));
  router.use(parser.json({
    limit: '10kb'
  }));
};


/**
 * @description - Middleware for logging HTTP data.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const morganHandler = (router) => {
  router.use(morgan('combined', { stream: winston.logger.stream }));
};

/**
 * @description - Middleware which blocks requests when server too busy.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const toobusyHandler = (router) => {
  router.use((req, res, next) => {
    try {
      if (toobusy()) throw new Http503Error();
      next();
    } catch (error) {
      next(error);
    }
  });
};


/**
 * @description - Middleware that prevents parameter pollution.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const hppHandler = (router) => {
  router.use(hpp());
};

/**
 * @description - Middleware that set security headers.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const helmetHandler = (router) => {
  router.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
  router.use(helmet.ieNoOpen());
};
