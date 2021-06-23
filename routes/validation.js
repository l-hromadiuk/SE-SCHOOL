const Joi = require('@hapi/joi');
const validated =data=>{
    const valid={
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()

};
return Joi.validate(data,valid);}

const loginValidated =data=>{
  const valid={
email: Joi.string().min(6).required().email(),
password: Joi.string().min(6).required()

};
return Joi.validate(data,valid);}
module.exports.validated = validated;
module.exports.loginValidated = loginValidated;