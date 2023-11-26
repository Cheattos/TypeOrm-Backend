import * as Joi from 'joi'

export const createUser = Joi.object({
    paslon_name: Joi.string().required().max(30),
    paslon_number: Joi.string().required().min(1),
    paslon_vision_mision: Joi.string().required().max(255),
    paslon_photo: Joi.string(),
    partai: Joi.string().required(),
})

export const updateUser = Joi.object({
    paslon_name: Joi.string().max(30),
    paslon_number: Joi.string().min(1),
    paslon_vision_mision: Joi.string().max(255),
    paslon_photo: Joi.string(),
    partai: Joi.string(),
})
