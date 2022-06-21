import Joi from "joi";

const freeShippingValidation = ({
    name,
    period_type,
    condition_type,
    quantity,
    amount,
}) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required().messages({
            "string.base": `Name should be type of String`,
            "any.required": `Name is Required.`,
        }),
        period_type: Joi.string().required().messages({
            "string.base": `Period Type should be type of String`,
            "any.required": `Period Type is Required.`,
        }),
        condition_type: Joi.string().required().messages({
            "string.base": `Condition Type should be type of String`,
            "any.required": `Condition Type is Required.`,
        }),
        quantity: Joi.alternatives().conditional('condition_type', { is: 'SHOP_ITEM_QUANTITY_ABOVE', then: Joi.number().required() })
            .messages({
                "number.base": `Quantity should be type of Number`,
                "any.required": `Quantity is required`,
            }),
        amount: Joi.alternatives().conditional("condition_type", {
            is: "SHOP_ORDER_AMOUNT_ABOVE",
            then: Joi.number().required(),
        })
            .messages({
                "number.base": `Amount should be type of Number`,
                "any.required": `Amount is required`,
            }),
    });

    const { value, error } = joiSchema.validate({
        name,
        period_type,
        condition_type,
        quantity,
        amount,
    });
    return { value, error };
};

export { freeShippingValidation };