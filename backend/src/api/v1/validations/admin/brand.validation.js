import Joi from 'joi'

const brandValidation = async ({
    name
}) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required()
            .messages({
                "string.base": `Brand Name should be type of String`,
                "any.required": `Brand Name is Required.`
            }),
    });

    const { value, error } = joiSchema.validate({
        name
    }, { escapeHtml: true });
    return { value, error };
}

export { brandValidation }