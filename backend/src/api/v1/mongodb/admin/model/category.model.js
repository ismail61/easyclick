import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    root: {
        type: String,
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    color: {
        type: Boolean,
        default: false
    },
    size: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: null
    },
    image: {
        url: String,
        public_id: String
    },
    show_on_home_page: {
        type: Boolean,
        default: false
    },
    commission_rate: { // like 10% but input a number like as 10
        type: Number,
        required: true
    },
    vat: { // like 10% but input a number like as 10
        type: Number,
        default: 0
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
});

export default mongoose.model('Category', CategorySchema);