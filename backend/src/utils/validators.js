const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().allow('').max(50),
  lastName: Joi.string().allow('').max(50),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.validateRegister = (data) => registerSchema.validate(data);
exports.validateLogin = (data) => loginSchema.validate(data);
