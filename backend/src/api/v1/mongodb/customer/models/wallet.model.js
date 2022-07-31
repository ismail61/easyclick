import mongoose from "mongoose"
const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        index: true
    },
    status: {
        type: String,
        enum: ['INCOMING', 'OUTGOING', 'REQUESTED'],
        default: 'INCOMING'
    },
}, { timestamps: true });

const walletSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    transactions: [TransactionSchema]
}, {
    timestamps: true
})
walletSchema.index({ user_id: 1 })

export default mongoose.model('Wallet', walletSchema)