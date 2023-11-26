import * as Joi from 'joi'

export const createVoter = Joi.object({
    voter_name: Joi.string().required().max(30),
    voter_address: Joi.string().required().max(255),
    voter_gender: Joi.string().required().min(1),
    voter: Joi.string().required().max(255),
    votepaslon: Joi.string().required().max(255),
})

export const updateVote = Joi.object({
    voter_name: Joi.string().max(30),
    voter_address: Joi.string().required().max(255),
    voter_gender: Joi.string().min(1),
    voter: Joi.string().required().max(255),
    votepaslon: Joi.string().required().max(255),
})
