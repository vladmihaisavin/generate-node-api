import Joi from 'joi';

export default {
  register: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  login: {
    body: {
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }
};
