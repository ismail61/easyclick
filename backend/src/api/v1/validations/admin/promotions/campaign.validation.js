import Joi from 'joi'

const campaignValidation = ({
    name,
    title,
    campaign_start_time,
    campaign_end_time,
    registration_end_time,
    discount,
    description
}) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required()
            .messages({
                "string.base": `Campaign Name should be type of String`,
                "any.required": `Campaign Name is Required.`
            }),
        title: Joi.string().required()
            .messages({
                "string.base": `Campaign Name should be type of String`,
                "any.required": `Campaign Name is Required.`
            }),
        campaign_start_time: Joi.date().required()
            .messages({
                "date.base": `Campaign Start Date should be type of Date`,
                "any.required": `Campaign Start Date is Required.`
            }),
        campaign_end_time: Joi.date().required()
            .messages({
                "date.base": `Campaign End Time should be type of Date`,
                "any.required": `Campaign End Date is Required.`
            }),
        registration_end_time: Joi.date().required()
            .messages({
                "date.base": `Registration End Time should be type of Date`,
                "any.required": `Registration End Time is Required.`
            }),
        discount: Joi.number().required()
            .messages({
                "number.base": `Discount should be type of Number`,
                "any.required": `Discount is Required.`
            }),
        description: Joi.string().required()
            .messages({
                "string.base": `Description should be type of String`,
                "any.required": `Description is Required.`
            }),
    })

    const { value, error } = joiSchema.validate({
        name,
        title,
        campaign_start_time,
        campaign_end_time,
        registration_end_time,
        discount,
        description
    });
    return { value, error };
}

export { campaignValidation }