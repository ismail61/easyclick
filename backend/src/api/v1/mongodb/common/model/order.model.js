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

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    color: StringRequired,
    name: StringRequired,
    quantity: {
        type: Number,
        required: true,
        max: 50
    },
    image: StringRequired,
    // product Price
    price: NumberRequired,
    size: StringRequired,
    shipment_fee: NumberRequired,
    total_price: NumberRequired,
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED', 'DELIVERY_FAILED'],
        index: true
    },
    provider: {
        drop_off: {
            type: String,
            default: 'Easyclick'
        },
        delivery: {
            type: String,
            default: 'Easyclick'
        }
    },
    estimate_delivery_time: Date,
    ship_on_time: Date,
    delivered_time: Date,
    cancellation_reasons: String,
    return_on_reasons: String,
    return_request: {
        type: Boolean,
        default: false
    },
    reviewed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });



/* Order Schema here */

const orderSchema = new mongoose.Schema({
    products: [ProductSchema],
    total_shipment_fee: NumberRequired,
    shipment_fee_discount: Number,
    discount_amount: Number,
    grand_total: NumberRequired,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    billing_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    merchant_discount: {
        type: Number,
        default: 0
    },
    shipping_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
}, {
    timestamps: true
})

orderSchema.index({ status: 1, 'products.product_id': 1, user_id: 1 })

export default mongoose.model('Order', orderSchema)