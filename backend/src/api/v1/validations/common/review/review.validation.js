import Joi from "joi"
const reviewValidation = ({message, product_id, order_id, rating}) => {
    const joiSchema = Joi.object().keys({
        message: Joi.string().required()
            .messages({
                "string.base": `Review message should be type of String`,
                "any.required": `Review message is Required.`,
            }),
        product_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Product ID should be type of ObjectID`,
                "any.required": `Product ID is Required.`
            }),
        order_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Order ID should be type of ObjectID`,
                "any.required": `Order ID is Required.`
            }),
        rating: Joi.number().min(1).max(5).required()
            .messages({
                "number.base": `Rating should be type of Number`,
                "number.min": `Rating should be minimum 1`,
                "number.max": `Rating should be maximum 5`,
                "any.required": `Rating is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ message, product_id, order_id, rating }, { escapeHtml: true })
    return { value, error }
}

export { reviewValidation }