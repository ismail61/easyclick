import Joi from "joi"
const itemValidation = ({ product_id, color_family, price, special_price, image, size, quantity }) => {
    const joiSchema = Joi.object().keys({
        product_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Product ID should be type of ObjectID`,
                "any.required": `Product ID is Required.`
            }),
        color_family: Joi.string().required()
            .messages({
                "string.base": `Color Family should be type of String`,
                "any.required": `Color Family is Required.`
            }),
        price: Joi.number().required()
            .messages({
                "number.base": `Price of this Item should be type of Number`,
                "any.required": `Price Item is Required.`
            }),
        special_price: Joi.number()
            .messages({
                "number.base": `Special Price in Varient's Item should be type of Number`,
            }),
        size: Joi.string().required()
            .messages({
                "string.base": `Size should be type of String`,
                "any.required": `Size is Required.`
            }),
        image: Joi.string().required()
            .messages({
                "string.base": `Image Url should be type of String`,
                "any.required": `Image Url is Required.`
            }),
        quantity: Joi.number().min(1).max(50).required()
            .messages({
                "number.base": `Quantity should be type of Number`,
                "number.min": `Quantity must be grater than 1`,
                "number.max": `Quantity must be less than or equal to 50`,
                "any.required": `Quantity is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ product_id, color_family, price, special_price, image, size, quantity }, { escapeHtml: true })
    return { value, error }
}

export { itemValidation }