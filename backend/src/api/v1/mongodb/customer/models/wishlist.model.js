import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true
}
// Number type & required
const NumberRequired = {
    type: Number,
    required: true
}

// Wishlist Schema
const wishListSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        color_family: StringRequired,
        size: StringRequired,
        price: NumberRequired,
        image: StringRequired,
        special_price: Number,
        offer_price: Number,
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        _id: false
    }],
})

wishListSchema.index({ user_id: 1 })

export default mongoose.model("Wishlist", wishListSchema);