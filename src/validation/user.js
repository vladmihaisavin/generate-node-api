
import Joi from 'joi';

export default {
    store: {
        body: {
            name: Joi.string().required(),
            email: Joi.string().email({minDomainAtoms: 2}),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }
    },
    update: {
        body: {
            name: Joi.string().required(),
            email: Joi.string().email({minDomainAtoms: 2})
        }
    }
}
