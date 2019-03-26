import {version} from '../package.json';
import {Router} from 'express';

import users from './controllers/users';
import authenticate from './concerns/authenticate';
import authentication from './controllers/authentication';

export default (db) => {
  const api = new Router();

  api.use('/auth', authentication(db));
  api.use('/users', authenticate, users(db));

  api.get('/', (req, res) => {
    res.json({version});
  });

  return api;
};
