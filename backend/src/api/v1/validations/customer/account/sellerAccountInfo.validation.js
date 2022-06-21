import Joi from "joi"
const customerAccountInfoValidation = ({ name, phone }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string()
            .messages({
                "string.base": `Name should be a type of String`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/)
            .messages({
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ name, phone }, { escapeHtml: true })
    return { value, error }
}

export { customerAccountInfoValidation }