import Joi from 'joi';

const adminPhoneNumberValidation = ({ phone }) => {
    const joiSchema = Joi.object().keys({
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Invalid Credentials `,
                "string.empty": `Invalid Credentials`,
                "any.required": `Phone is required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ phone }, { escapeHtml: true })
    return { value, error }
}

export { adminPhoneNumberValidation }