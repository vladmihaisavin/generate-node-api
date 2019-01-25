
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import config from './config';
import response from './concerns/response';
import routes from './routes';
import validate from 'express-validation';
import { formatValidationErrors } from './concerns/errors';
import passport from 'passport';
import passportConfig from './passport';

require('dotenv').config();
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

const dbClient = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true});

dbClient.connect(async (err) => {

    const db = dbClient.db(process.env.MONGO_DB);

    if (err) {
        console.error(err);
        process.exit(0);
    }

    passportConfig(db, passport);

    app.use('/api', routes(config, db));

    app.use((req, res, next) => {
        response(res).notFound('Not found');
    });

    app.use(function (err, req, res, next) {
        if (err instanceof validate.ValidationError) {
            return response(res).error(formatValidationErrors(err.errors));
        }
        response(res).internalError('Internal server error');
    });

    app.listen(process.env.PORT, () => {
        console.log(`Started on port ${ process.env.PORT }`);
    });
});
