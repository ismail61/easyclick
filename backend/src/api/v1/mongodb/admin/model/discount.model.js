import mongoose from "mongoose";

var discountSchema = new mongoose.Schema({
    discount: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Discount', discountSchema);