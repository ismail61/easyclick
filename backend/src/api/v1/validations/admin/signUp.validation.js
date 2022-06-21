import Joi from 'joi';

const adminSignUpValidation = ({ email }) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`,
                "any.required": `Email is required.`,
            }),
    })
    const { value, error } = joiSchema.validate({ email }, { escapeHtml: true })
    return { value, error }
}

export { adminSignUpValidation }