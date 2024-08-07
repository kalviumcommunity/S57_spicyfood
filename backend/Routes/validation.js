const Joi = require('joi');


const foodValidationSchema = Joi.object({
    Dish_Name: Joi.string().required(),
    type: Joi.string().required(),
    Ingridents: Joi.string().required(),
    Origin: Joi.string().required(),
    Image: Joi.string().uri().required(),
    created_by : Joi.string().required(),
});

const usersValidationSchema = Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    email: Joi.string().email().required(),
})


module.exports = {foodValidationSchema,usersValidationSchema};


