import mongoose from "mongoose";
// String type & required
const StringRequired = {
    type: String,
    required: true,
};

// Number type & required
const NumberRequired = {
    type: Number,
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
        /* apply_to: String */ // will be used in next version,
        is_active: {
            type: Boolean,
            default: false,
        },
       
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("FreeShipment", freeShippingSchema);
