import Joi from "joi"
const categoryValidation = ({
    name,
    description,
    commission_rate,
    vat
}) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required()
            .messages({
                "string.base": `Category Name should be type of String`,
                "any.required": `Category Name is Required`
            }),
        commission_rate: Joi.number().required()
            .messages({
                "number.base": `Commission Rate should be type of Number`,
                "any.required": `Commission Rate is Required`
            }),
        vat: Joi.number().required()
            .messages({
                "number.base": `Vat should be type of Number`,
                "any.required": `Vat is Required`
            }),
        description: Joi.string()
            .messages({
                "string.base": `Description should be type of String`
            })
    })
    const { value, error } = joiSchema.validate({
        name,
        description,
        commission_rate,
        vat
    }, { escapeHtml: true })
    return { value, error }
}

export { categoryValidation }