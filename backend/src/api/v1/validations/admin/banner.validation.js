import Joi from "joi"
const bannerValidation = ({
    redirect_url
}) => {
    const joiSchema = Joi.object().keys({
        redirect_url: Joi.string()
            .messages({
                "string.base": `Banner ReDirect Url should be type of String`
            })
    })
    const { value, error } = joiSchema.validate({
        redirect_url
    }, { escapeHtml: true })
    return { value, error }
}

export { bannerValidation }