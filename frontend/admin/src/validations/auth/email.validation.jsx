import Joi from "joi"
const EmailSignInValidation = ({email}) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": "Please enter Correct Email",
                "any.required": `Email is Required.`,
            }),
    })
    const { value, error } = joiSchema.validate({ email }, { escapeHtml: true })
    return { value, error }
}

export {EmailSignInValidation}