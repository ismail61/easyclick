import Joi from 'joi';

const AddProductValidation = ({
    product_name,
    category,
    brand,
    short_description,
    long_description,
    whats_in_the_box,
    package_weight,
    package_dimensions,
}) => {
    const joiSchema = Joi.object().keys({
        product_name: Joi.string().max(255).required()
            .messages({
                "string.base": `Product Name should be a type of String`,
                "string.max": `Product Name should have a maximum length of 255`,
                "string.empty": `Product Name is Required`,
                "any.required": `Product Name is Required.`
            }),
        category: Joi.array().min(1).required()
            .messages({
                "string.base": `Category should be a type of String`,
                "array.min": `Category is Required`,
                "any.required": `Category is Required.`
            }),
        brand: Joi.string().required()
            .messages({
                "string.base": `Brand should be a type of String`,
                "string.empty": `Brand is Required`,
                "any.required": `Brand is Required.`
            }),
        short_description: Joi.string().required()
            .messages({
                "string.base": `Short Description should be a type of String`,
                "string.empty": `Short Description is Required`,
                "any.required": `Short Description is Required.`
            }),
        long_description: Joi.string().required()
            .messages({
                "string.base": `Long Description should be type of String`,
                "string.empty": `Long Description is Required`,
                "any.required": `Long Description is Required.`
            }),
        whats_in_the_box: Joi.string().max(255).required()
            .messages({
                "string.base": `Whats in the Box should be type of String`,
                'string.max': `Whats in the Box should have a maximum length of 255`,
                "string.empty": `Whats in the Box is Required`,
                "any.required": `Whats in the Box is Required.`
            }),
        package_weight: Joi.number().required()
            .messages({
                "number.base": `Package Weight should be type of Number`,
                "any.required": `Package Weight is Required.`
            }),
        package_dimensions: Joi.object().keys({
            length: Joi.number().required()
                .messages({
                    "number.base": `Package Length should be type of Number`,
                    "any.required": `Package Length is Required.`
                }),
            width: Joi.number().required()
                .messages({
                    "number.base": `Package Width should be type of Number`,
                    "any.required": `Package Width is Required.`
                }),
            height: Joi.number().required()
                .messages({
                    "number.base": `Package Height should be type of Number`,
                    "any.required": `Package Height is Required.`
                }),
        }).required().messages({
            "any.required": `Package Dimensions is Required.`
        }),

    })

    const { value, error } = joiSchema.validate({
        product_name,
        category,
        brand,
        short_description,
        long_description,
        whats_in_the_box,
        package_weight,
        package_dimensions,
    }, { escapeHtml: true })
    return { value, error }
}

export { AddProductValidation }