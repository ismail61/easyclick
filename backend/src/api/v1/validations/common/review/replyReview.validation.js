import Joi from "joi"
const replyReviewValidation = (reply) => {
    const joiSchema = Joi.object().keys({
        reply: Joi.string().required()
            .messages({
                "string.base": `Review Reply Description should be type of String`,
                "any.required": `Review Reply Description is Required.`,
            }),
    })
    const { value, error } = joiSchema.validate({ reply }, { escapeHtml: true })
    return { value, error }
}

export { replyReviewValidation }