import Joi from "joi"
const sellerAccountInfoValidation = ({ phone }) => {
    const joiSchema = Joi.object().keys({
        phone: Joi.string().regex(/^(?:\+88|88)?(1[3-9]\d{8})$/)
            .messages({
                "string.pattern.base": `Please Enter the Valid BD Phone number! `
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ phone }, { escapeHtml: true })
    return { value, error }
}

export { sellerAccountInfoValidation }