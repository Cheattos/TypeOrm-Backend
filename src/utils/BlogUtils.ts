import * as Joi from 'joi'

export const createBlog = Joi.object({
    blog_title: Joi.string().required().max(30),
    blog_description: Joi.string().required().min(1),
    blog_sender: Joi.string().required().max(255),
    blog_cover: Joi.string(),
    blogsbyuser: Joi.string()
})

export const upBlog = Joi.object({
    blog_title: Joi.string().max(30),
    blog_description: Joi.string().min(1),
    blog_sender: Joi.string().max(255),
    blog_cover: Joi.string(),
    blogsbyuser: Joi.string()
})