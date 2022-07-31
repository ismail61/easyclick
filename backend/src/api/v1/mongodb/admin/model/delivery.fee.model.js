import mongoose from "mongoose";

const DeliveryFeeSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fee: {
        type: Number,
        required: true
    }
});

export default mongoose.model('DeliveryFee', DeliveryFeeSchema);