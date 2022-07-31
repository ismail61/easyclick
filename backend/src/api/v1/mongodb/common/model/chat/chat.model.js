import mongoose from "mongoose"

const chatSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        index: true
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['admin', 'customer'],
                default: 'customer',
            },
            text: String,
            image: String,
            created: {
                type: Date,
                default: new Date()
            },
            _id: false
        }
    ]
}, {
    timestamps: true
})

chatSchema.index({ customer_id: 1 });
export default mongoose.model('Chat', chatSchema);