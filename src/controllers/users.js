import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/user';
import validate from 'express-validation';
import validationRules from '../validation/user';

export default (db) => {

    const api = new Router();

    /**
     * List all resources
     */
    api.get('/', async (req, res) => {
        try {
            const users = await repository(db).index();
            return response(res).collection(users);
        } catch (err) {
            return response(res).error(err);
        }
    });

    /**
     * Create a new resource
     */
    api.post('/', validate(validationRules.store), async (req, res) => {
        try {
            const user = (await repository(db).store(req.body)).ops;
            return response(res).item(user);
        } catch (err) {
            return response(res).error(err);
        }
    });

    /**
     * Show an existing resource
     */
    api.get('/:id', async (req, res) => {
        try {
            const user = await repository(db).show(req.params.id);
            return response(res).item(user);
        } catch (err) {
            return response(res).error(err);
        }

    });

    /**
     * Update an existing resource
     */
    api.put('/:id', validate(validationRules.update), async (req,res) => {
        try {
            const user = await repository(db).update(req.params.id, req.body);
            return response(res).item(user);
        } catch (err) {
            return response(res).error(err);
        }
    });

    /**
     * Destroy an existing resource
     */
    api.delete('/:id', async (req,res) => {
        try {
            const user = await repository(db).destroy(req.params.id);
            return response(res).item(user);
        } catch (err) {
            return response(res).error(err);
        }
    });

    return api;
}
