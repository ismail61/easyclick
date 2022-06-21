import Joi from 'joi';

const customerSignUpValidation = ({ name, email, phone, password }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().trim().required()
            .messages({
                "string.base": `Your Name should be a type of String`,
                "string.empty": `Your Name cannot be an empty field`,
                "any.required": `Your Name is required.`
            }),
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`,
                "any.required": `Email is required.`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
                "string.empty": `Phone cannot be an empty field`,
                "any.required": `Phone is required.`,
            }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is required.`,
            })
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ name, email, phone, password }, { escapeHtml: true })
    return { value, error }
}

export { customerSignUpValidation }