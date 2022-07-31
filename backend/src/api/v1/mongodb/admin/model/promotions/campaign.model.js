
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
const campaignSchema = mongoose.Schema({
    title: StringRequired,
    name: {
        ...StringRequired,
        index: true,
        unique: true
    },
    campaign_start_time: {
        type: Date,
        required: true
    },
    campaign_end_time: {
        type: Date,
        required: true
    },
    registration_end_time: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    discount: NumberRequired, // like 10% 
    description: StringRequired,
    image: {
        url: StringRequired
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
}, {
    timestamps: true
})


export default mongoose.model('Campaign', campaignSchema)