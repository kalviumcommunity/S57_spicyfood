const Joi = require('joi');


const foodValidationSchema = Joi.object({
    Dish_Name: Joi.string().required(),
    type: Joi.string().required(),
    Ingridents: Joi.string().required(),
    Origin: Joi.string().required(),
    Image: Joi.string().uri().required(),
});

const usersValidationSchema = Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().required(),
})


module.exports = {foodValidationSchema,usersValidationSchema};


