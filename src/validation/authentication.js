
import Joi from 'joi';

export default {
    register:{
        body: {
            name: Joi.string().required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }
    },
    login:{
        body: {
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }
    }
}
