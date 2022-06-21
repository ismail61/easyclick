import Joi from "joi"
const smsValidationAllCustomer = ({
    body
}) => {
    const joiSchema = Joi.object().keys({
        body: Joi.string().required()
            .messages({
                "string.base": `Sms Body should be type of String`,
                "string.empty": `Sms Body is Required`,
                "any.required": `Sms Body is Required`
            }),
    })
    const { value, error } = joiSchema.validate({
        body
    }, { escapeHtml: true })
    return { value, error }
}

export { smsValidationAllCustomer }