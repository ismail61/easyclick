import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true
}

// Address Schema
const addressSchema = new mongoose.Schema({
    full_name: StringRequired,
    phone: StringRequired,
    region: StringRequired,
    city: StringRequired,
    area: StringRequired,
    address: StringRequired,
    default_shipping_address: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Address", addressSchema);