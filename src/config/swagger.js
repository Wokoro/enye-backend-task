/**
 * @author - Wokoro Douye Samuel
 */

const { DOCS_ROOT_REF = './src' } = process.env;
// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Transact API',
    version: '1.0.0',
    description: 'API Documentation for Transact',
  }
};

// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [`${DOCS_ROOT_REF}/docs/**/*.yaml`]
};

export default options;
