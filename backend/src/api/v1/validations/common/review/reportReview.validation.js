import Joi from "joi"
const reportReviewValidation = (report) => {
    const joiSchema = Joi.object().keys({
        report: Joi.object().keys({
            report_type: Joi.string().required()
                .messages({
                    "string.base": `Review Report Type should be type of String`,
                    "any.required": `Review Report Type is Required.`,
                }),
            description: Joi.string().required()
                .messages({
                    "string.base": `Review Report Description should be type of String`,
                    "any.required": `Review Report Description is Required.`,
                }),
        }).required()
            .messages({
                "any.required": `Report  is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ report }, { escapeHtml: true })
    return { value, error }
}

export { reportReviewValidation }