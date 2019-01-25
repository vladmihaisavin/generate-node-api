
import { Router } from "express";
import repository from "../repositories/user";
import response from "../concerns/response";
import validationRules from "../validation/authentication";
import validate from "express-validation";

export default (db) => {

    const api = new Router();

    /**
     * Registers a user
     */
    api.post('/register', validate(validationRules.register), async (req, res) => {
        try {
            const user = (await repository(db).store(req.body)).ops;
            return response(res).item(user);
        } catch(err) {
            return response(res).error(err);
        }
    });

    /**
     * Logs in a user
     */
    api.post('/login', validate(validationRules.login), async (req, res) => {
        let user;
        try {
            user = await repository(db).getByEmail(req.body.email);
        } catch (e) {
            return response(res).internalError("Could not get user");
        }
        if (!user) {
            return response(res).forbidden("Invalid email or password");

        }
        try {
            const passwordMatch = await repository(db).comparePassword(req.body.password, user.password);
            if (!passwordMatch) {
                return response(res).forbidden("Invalid email or password");
            }
        } catch(err) {
            return response(res).error(err);
        }

        try {
            const token = await jwt.sign(user, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN
            });
            return response(res).item({ user, token });
        } catch(err) {
            return response(res).error(err);
        }
    });

    return api;
}
