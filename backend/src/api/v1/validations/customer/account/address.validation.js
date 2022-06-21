import Joi from "joi"
const addressValidation = ({ full_name, address, phone, region, city, area }) => {
    const joiSchema = Joi.object().keys({
        full_name: Joi.string().required()
            .messages({
                "string.base": `Full Name should be a type of String`,
                "any.required": `Full Name is Required.`,
            }),
        address: Joi.string().required()
            .messages({
                "string.base": `Address should be a type of String`,
                "any.required": `Address is Required.`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
                "string.empty": `Phone cannot be an empty field`,
                "any.required": `Phone is required.`,
            }),
        region: Joi.string().required()
            .messages({
                "string.base": `Region should be a type of String`,
                "any.required": `Region is Required.`,
            }),
        area: Joi.string().required()
            .messages({
                "string.base": `Area should be a type of String`,
                "any.required": `Area is Required.`,
            }),
        city: Joi.string().required()
            .messages({
                "string.base": `City should be a type of String`,
                "any.required": `City is Required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ full_name, address, phone, region, city, area }, { escapeHtml: true })
    return { value, error }
}

const updateAddressValidation = ({ full_name, address, phone, region, city, area }) => {
    const joiSchema = Joi.object().keys({
        full_name: Joi.string()
            .messages({
                "string.base": `Full Name should be a type of String`,
            }),
        address: Joi.string()
            .messages({
                "string.base": `Address should be a type of String`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/)
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
            }),
        region: Joi.string()
            .messages({
                "string.base": `Region should be a type of String`,
            }),
        area: Joi.string()
            .messages({
                "string.base": `Area should be a type of String`,
            }),
        city: Joi.string()
            .messages({
                "string.base": `City should be a type of String`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ full_name, address, phone, region, city, area }, { escapeHtml: true })
    return { value, error }
}


export { addressValidation, updateAddressValidation }