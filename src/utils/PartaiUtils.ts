import * as Joi from 'joi'

export const createPartai = Joi.object({
    partai_name: Joi.string().required().max(30),
    partai_leader: Joi.string().required().min(1),
    partai_vision_mision: Joi.string().required().max(255),
    partai_logos: Joi.string(),
    partai_address: Joi.string().min(1)
})

export const updatePartai = Joi.object({
    partai_name: Joi.string().max(30).min(1),
    partai_leader: Joi.string().min(1),
    partai_vision_mision: Joi.string().min(1).max(255),
    partai_logos: Joi.string(),
    partai_address: Joi.string().min(1)
})
