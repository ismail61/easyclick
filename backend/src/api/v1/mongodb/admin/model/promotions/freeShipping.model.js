import mongoose from "mongoose";
// String type & required
const StringRequired = {
    type: String,
    required: true,
};

const freeShippingSchema = mongoose.Schema(
    {
        name: {
            ...StringRequired,
            index: true,
        },
        period_type: {
            type: String,
            enum: ["LONG_TERM", "SPECIFIC_PERIOD"],
            default: "LONG_TERM",
        },
        specific_period: {
            start_date: Date,
            end_date: Date,
        },
        condition_type: {
            type: String,
            enum: [
                "NO_CONDITION",
                "SHOP_ITEM_QUANTITY_ABOVE",
                "SHOP_ORDER_AMOUNT_ABOVE",
            ],
            default: "NO_CONDITION",
        },
        quantity: Number,
        amount: Number,
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("FreeShipment", freeShippingSchema);