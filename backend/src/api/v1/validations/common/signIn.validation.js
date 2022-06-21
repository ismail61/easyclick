import Joi from "joi"
const signInValidation = ({ email, password }) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Invalid Credentials.`,
                "string.empty": `Invalid Credentials.`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"].`,
                "any.required": `Invalid Credentials.`,
            }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `Invalid Credentials.`,
                "string.pattern.base": `Invalid Credentials.`,
                "string.empty": `Invalid Credentials.`,
                "any.required": `Password is Required.`,
            }),
    })
    const { value, error } = joiSchema.validate({ email, password }, { escapeHtml: true })
    return { value, error }
}

export { signInValidation }