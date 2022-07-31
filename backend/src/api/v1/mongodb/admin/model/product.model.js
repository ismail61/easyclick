import mongoose from "mongoose"
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

//PriceSchema
const priceSchema = mongoose.Schema({
    price: NumberRequired,
    special_price: Number,
}, { _id: false })

// variant stock price combine schema
const variant_stock_price = mongoose.Schema({
    color_family: StringRequired,
    images: [{
        url: String,
        public_id: String
    }],
    others: String,
    sizes: [{
        size: StringRequired,
        pricing: priceSchema,
        quantity: NumberRequired,
        free_items: String
    }],
}, { _id: false })

// Product Schema here
const productSchema = mongoose.Schema({
    product_name: {
        ...StringRequired,
        min: 10,
        maxLength: 255,
        unique: true,
        index: true
    },
    category: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        value: {
            type: String,
            required: true
        }
    }],
    slug: {
        ...StringRequired,
        unique: true,
        index: true
    },
    brand: StringRequired,
    short_description: StringRequired,
    long_description: StringRequired,
    whats_in_the_box: {
        ...StringRequired,
        maxLength: 255
    },
    variant_stock_price: [variant_stock_price],
    warranty_type: StringRequired,
    warranty_period: String,
    package_weight: NumberRequired,
    package_dimensions: {
        length: NumberRequired,
        width: NumberRequired,
        height: NumberRequired,
    },
    dangerous_goods: {
        type: String,
        default: 'None'
    },
    is_active: {
        type: Boolean,
        default: true,
        index: true
    },
    rating: {
        type: Number,
        default: 0,
        index: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    questions_and_answers: [
        {
            text: {
                type: String,
                required: true
            },
            reply: String,
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer',
                required: true,
                index: true
            }
        }
    ],
}, {
    timestamps: true,
})

productSchema.index({ is_active: 1, slug: 1 })


export default mongoose.model('Product', productSchema)