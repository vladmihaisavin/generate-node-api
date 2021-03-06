import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/user';
import validate from 'express-validation';
import validationRules from '../validation/user';
import transformer from '../transformers/user';

export default (httpClient) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - Users
   *     name: List users
   *     summary: Lists all the users
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of user objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const users = await repository(httpClient).index();
      return response(res).collection(users, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     name: Create user
   *     summary: Creates a new user
   *     security:
   *       - bearerAuth: []
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
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const user = await repository(httpClient).store(req.body);
      return response(res).created({ id: user.id });
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Show user
   *     summary: Shows an existing user
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A user object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const user = await repository(httpClient).show(req.params.id);
      if (user !== null) {
        return response(res).item(user, transformer);
      }
      return response(res).notFound('User not found.');
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     name: Update user
   *     summary: Updates an existing user
   *     security:
   *       - bearerAuth: []
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
   *         required:
   *           - email
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      await repository(httpClient).update(req.params.id, req.body);
      return response(res).noContent();
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Destroy an existing resource
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     name: Delete user
   *     summary: Deletes an existing user
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A user object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const user = await repository(httpClient).destroy(req.params.id);
      return response(res).item(user, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
