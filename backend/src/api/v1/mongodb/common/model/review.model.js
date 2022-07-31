import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    image: [{
        url: String,
        _id: false
    }],
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    reply: String,
}, {
    timestamps: true
})
reviewSchema.index({product_id: 1, order_id: 1, user_id: 1 })

export default mongoose.model('Review', reviewSchema)