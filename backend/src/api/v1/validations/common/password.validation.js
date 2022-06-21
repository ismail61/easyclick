import Joi from 'joi';

const passwordValidation = ({ new_password, repeat_password }) => {
    const joiSchema = Joi.object().keys({
        new_password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is required.`,
            }),
        repeat_password: Joi.any().equal(Joi.ref('password')).required()
            .messages({
                "any.only": "Repeat Password does not match!",
                "any.required": `Repeat Password is required.`,
            })
    })
    const { value, error } = joiSchema.validate({ new_password, repeat_password }, { escapeHtml: true })
    return { value, error }
}

export { passwordValidation }