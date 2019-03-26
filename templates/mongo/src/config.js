const swaggerDefinition = {
  info: {
    title: 'Generate Node API',
    version: '1.0.0',
    description: 'Basic endpoints for Auth & CRUD',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

module.exports = {
  bodyLimit: '100kb',
  corsHeaders: ['Link'],
  swaggerDefinition
};
