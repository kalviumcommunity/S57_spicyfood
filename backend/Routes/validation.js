const Joi = require('joi');

const foodValidationSchema = Joi.object({
    Dish_Name: Joi.string().required(),
    type: Joi.string().required(),
    Ingridents: Joi.string().required(),
    Origin: Joi.string().required(),
    Image: Joi.string().uri().required(),
});

module.exports = foodValidationSchema;
