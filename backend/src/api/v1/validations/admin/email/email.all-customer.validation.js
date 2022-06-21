import Joi from "joi"
const emailValidationAllCustomer = ({
    body, subject
}) => {
    const joiSchema = Joi.object().keys({
        subject: Joi.string().required()
        .messages({
            "string.base": `Email Subject should be type of String`,
            "string.empty": `Email Subject is Required`,
            "any.required": `Email Subject is Required`
        }),
        body: Joi.string().required()
            .messages({
                "string.base": `Email Body should be type of String`,
                "string.empty": `Email Body is Required`,
                "any.required": `Email Body is Required`
            }),
    })
    const { value, error } = joiSchema.validate({
        body, subject
    }, { escapeHtml: true })
    return { value, error }
}

export { emailValidationAllCustomer }