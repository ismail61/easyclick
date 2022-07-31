import Joi from 'joi';

const PhoneSignInValidation = ({ phone }) => {
    const joiSchema = Joi.object().keys({
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Please Enter Valid BD Number`,
                "string.empty": `Invalid Credentials`,
                "any.required": `Phone is required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ phone }, { escapeHtml: true })
    return { value, error }
}

export { PhoneSignInValidation }