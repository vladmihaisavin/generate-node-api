import { Router } from 'express';
import repository from '../repositories/user';
import transformer from '../transformers/user';
import response from '../concerns/response';
import validationRules from '../validation/authentication';
import validate from 'express-validation';
import jwt from 'jsonwebtoken';

export default (httpClient) => {

  const api = new Router();

  /**
   * Registers a user
   * @swagger
   * /api/auth/register:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Register
   *     summary: Register as a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object
   *       403:
   *         description: Invalid email or password
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/register', validate(validationRules.register), async (req, res) => {
    try {
      const user = await repository(httpClient).store(req.body);
      return response(res).item(user, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Logs in a user
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Log in
   *     summary: Logs in a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object with a token
   *       403:
   *         description: Invalid email or password
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/login', validate(validationRules.login), async (req, res) => {
    let user;
    try {
      user = await repository(httpClient).getByEmail(req.body.email);
    } catch (e) {
      return response(res).internalError('Could not get user');
    }
    if (!user) {
      return response(res).forbidden('Invalid email or password');
    }

    try {
      const passwordMatch = await repository(httpClient).comparePassword(req.body.password, user.password);
      if (!passwordMatch) {
        return response(res).forbidden('Invalid email or password');
      }
    } catch (err) {
      return response(res).error(err);
    }

    try {
      const token = await jwt.sign(user, process.env.AUTH_SECRET, {
        expiresIn: process.env.AUTH_EXPIRES_IN
      });
      return response(res).item(user, transformer, null, { token });
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
