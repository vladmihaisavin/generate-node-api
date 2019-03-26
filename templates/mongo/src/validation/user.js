import Joi from 'joi';

export default {
  store: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  update: {
    body: {
      name: Joi.string().required().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required()
    }
  }
};
