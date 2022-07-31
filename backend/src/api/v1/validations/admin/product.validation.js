import Joi from 'joi';

const productValidation = ({
    product_name,
    video_url,
    brand,
    short_description,
    long_description,
    whats_in_the_box,
    warranty_type,
    warranty_period,
    package_weight,
    package_dimensions,
    variant_stock_price,
}) => {
    const joiSchema = Joi.object().keys({
        product_name: Joi.string().max(255).required()
            .messages({
                "string.base": `Product Name should be a type of String`,
                "string.max": `Product Name should have a maximum length of 255`,
                "any.required": `Product Name is Required.`
            }),
        video_url: Joi.string()
            .messages({
                "string.base": `Video url should be a type of String`
            }),
        brand: Joi.string().required()
            .messages({
                "string.base": `Brand should be a type of String`,
                "any.required": `Brand is Required.`
            }),
        short_description: Joi.string().required()
            .messages({
                "string.base": `Short Description should be a type of String`,
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
                "any.required": `Whats in the Box is Required.`
            }),
        warranty_type: Joi.string().required()
            .messages({
                "string.base": `Warranty Type should be type of String`,
                "any.required": `Warranty Type is Required.`
            }),
        warranty_period: Joi.string()
            .messages({
                "string.base": `Warranty Period should be type of String`
            }),
        package_weight: Joi.number().required()
            .messages({
                "number.base": `Package Weight should be type of Number`,
                "any.required": `Package Weight is Required.`
            }),
        package_dimensions: Joi.object().keys({
            length: Joi.number().required()
                .messages({
                    "number.base": `Length should be type of Number`,
                    "any.required": `Length is Required.`
                }),
            width: Joi.number().required()
                .messages({
                    "number.base": `Width should be type of Number`,
                    "any.required": `Width is Required.`
                }),
            height: Joi.number().required()
                .messages({
                    "number.base": `Height should be type of Number`,
                    "any.required": `Height is Required.`
                }),
        }).required().messages({
            "any.required": `Package Dimensions is Required.`
        }),
        variant_stock_price: Joi.array()
            .items(Joi.object().keys({
                color_family: Joi.string().required()
                    .messages({
                        "string.base": `Color Family should be type of String`,
                        "any.required": `Color Family is Required.`
                    }),
                images: Joi.array()
                    .items(Joi.object().keys({
                        public_id: Joi.string().required()
                            .messages({
                                "string.base": `Image Public Id should be type of String`,
                                "any.required": `Image Public Id is Required.`
                            }),
                        url: Joi.string().required()
                            .messages({
                                "string.base": `Image URL should be type of String`,
                                "any.required": `Image URL is Required.`
                            }),
                    })),
                sizes: Joi.array()
                    .items(Joi.object().keys({
                        pricing: Joi.object().keys({
                            price: Joi.number().required()
                                .messages({
                                    "number.base": `Price in Varient's Item should be type of Number`,
                                    "any.required": `Price in Varient's Item is Required.`
                                }),
                            special_price: Joi.number()
                                .messages({
                                    "number.base": `Special Price in Varient's Item should be type of Number`,
                                })
                        }).options({ stripUnknown: true }),
                        size: Joi.string()
                            .messages({
                                "string.base": `Size should be type of String`
                            }),
                        quantity: Joi.number().required()
                            .messages({
                                "number.base": `Quantity in Varient's Item should be type of Number`,
                                "any.required": `Quantity in Varient's Item is Required.`
                            }),
                        others: Joi.string()
                            .messages({
                                "string.base": `Others should be type of String`,
                            }),
                        free_items: Joi.string()
                            .messages({
                                "string.base": `Free Items should be type of String`
                            })
                    })),
            })).min(1).required().messages({
                "array.min": `Minimum 1 Variants Product is Required`,
                "any.required": `Variant Stock Price is Required.`
            }),
    })

    const { value, error } = joiSchema.validate({
        product_name,
        video_url,
        brand,
        short_description,
        long_description,
        whats_in_the_box,
        warranty_type,
        warranty_period,
        package_weight,
        package_dimensions,
        variant_stock_price
    }, { escapeHtml: true })
    return { value, error }
}

export { productValidation }