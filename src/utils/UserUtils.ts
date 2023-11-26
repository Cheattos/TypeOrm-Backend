import * as Joi from 'joi'

export const createRegister = Joi.object({
    user_fullname: Joi.string().required().min(1).max(30),
    user_email: Joi.string().required().min(1),
    user_password: Joi.string().required().min(1).max(255),
    user_role: Joi.string().required().min(1).max(255),
})

export const createLogin = Joi.object({
    user_email: Joi.string().required().min(1).max(255),
    user_password: Joi.string().required().min(1).max(255),
})
