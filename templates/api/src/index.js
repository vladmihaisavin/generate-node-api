require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import response from './concerns/response';
import routes from './routes';
import validate from 'express-validation';
import {formatValidationErrors} from './concerns/errors';
import passport from 'passport';
import passportConfig from './passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dataApiReachable from './dataPersistence';

const app = express();

app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());

/**
 * If the data persistence API is successfully reached,
 * the web application will continue loading
 */
dataApiReachable()
  .then((httpClient) => {
    /**
     * Configure & initialize swagger documentation
     */
    const swaggerOptions = {
      swaggerDefinition: config.swaggerDefinition,
      apis: ['./src/controllers/*.js'],
    };
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.get('/swagger.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /**
     * Configure the passport logic
     */
    passportConfig(httpClient, passport);

    /**
     * API router
     */
    app.use('/api', routes(httpClient));

    /**
     * If any request url does not start with /api, the response will be 404
     */
    app.use((req, res, next) => {
      response(res).notFound('Not found');
    });

    /**
     * All the errors will be caught here
     */
    app.use(function (err, req, res, next) {
      if (err instanceof validate.ValidationError) {
        return response(res).error(formatValidationErrors(err.errors));
      }
      response(res).internalError('Internal server error');
    });

    /**
     * Starts server on the specified port
     */
    app.listen(process.env.PORT, () => {
      console.log(`Started on port ${ process.env.PORT }`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
