import Joi from "joi";

const orderValidation = ({
    products,
    billing_address,
    shipping_address,
}) => {
    const productSchema = Joi.object().keys({
        quantity: Joi.number().max(50).required()
            .messages({
                "number.base": `Product Quantity should be type of Number`,
                "number.max": `Product Quantity must be less than 50`,
                "any.required": `Product Quantity is Required.`
            }),
        product_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Product ID should be type of ObjectID`,
                "any.required": `Product ID is Required.`
            }),
        price: Joi.number().required()
            .messages({
                "number.base": `Product Price should be type of Number`,
                "any.required": `Product Price is Required.`
            }),
        special_price: Joi.number()
            .messages({
                "number.base": `Product Price should be type of Number`,
            }),
        name: Joi.string().required()
            .messages({
                "string.base": `Product Name must be type of String`,
                "any.required": `Product Name is Required.`
            }),
        slug: Joi.string()
            .messages({
                "string.base": `Product Slug must be type of String`,
            }),
        color: Joi.string().required()
            .messages({
                "string.base": `Product Color must be type of String`,
                "any.required": `Product Color is Required.`
            }),
        color_family: Joi.string()
            .messages({
                "string.base": `Product Color must be type of String`,
            }),
        image: Joi.string().required()
            .messages({
                "string.base": `Product Image Url should be type of String`,
                "any.required": `Product Image Url is Required.`
            }),
        size: Joi.string().required()
            .messages({
                "string.base": `Product Size must be type of String`,
                "any.required": `Product Size is Required.`
            }),
        shipment_fee: Joi.number().required()
            .messages({
                "number.base": `Shipment Fee should be type of Number`,
                "any.required": `Shipment Fee is Required.`
            })
    }).required().min(1)
        .messages({
            "array.base": `Minimum 1 Product is Required`,
            "any.required": `Product Details is Required.`
        })
    const joiSchema = Joi.object().keys({
        products: Joi.array().items(productSchema).min(1),
        billing_address: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Billing Address ID should be type of ObjectID`,
                "any.required": `Billing Address ID is Required.`
            }),
        shipping_address: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Shipping Address ID should be type of ObjectID`,
                "any.required": `Shipping Address ID is Required.`
            }),
    })

    const { value, error } = joiSchema.validate({
        products,
        billing_address,
        shipping_address,
    }, {
        escapeHtml: true
    })
    return { value, error }
}

export { orderValidation }