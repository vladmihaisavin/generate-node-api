const swaggerDefinition = {
  info: {
    title: 'Generate Node API',
    version: '1.0.3',
    description: 'Basic endpoints for Auth & CRUD',
  },
  host: process.env.API_URL,
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
