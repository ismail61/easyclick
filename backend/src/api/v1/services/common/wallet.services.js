import { Customer, Wallet } from "../../mongodb/customer";

export const getWallet = async (query) => {
    try {
        return await Wallet.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getCustomerWallets = async (query) => {
    try {
        const wallets = await Wallet.find({ 'transactions.status': 'REQUESTED' }).lean().populate({
            path: 'user_id',
            model: Customer,
            select: 'name email phone'
        });
        let tempWallets = [];
        wallets?.forEach(wallet => {
            const tmp = {
                ...wallet,
                transactions: wallet.transactions?.filter(transaction => transaction.status === 'REQUESTED')
            }
            tempWallets.push(tmp)
        })
        return tempWallets;
    } catch (err) {
        console.log(err);
    }
};


export const updateWalletTransaction = async (wallet_id, user_id, amount) => {
    try {
        return await Wallet.findOneAndUpdate({
            _id: wallet_id,
            user_id: user_id,
            total_amount: { $gte: amount },
        }, {
            $push: {
                transactions: {
                    amount,
                    status: 'REQUESTED'
                }
            }
        }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
};

export const paidWalletTransaction = async (wallet_id, transaction_id, amount) => {
    try {
        const wallet = await Wallet.findOne({
            _id: wallet_id,
            'transactions._id': transaction_id,
            total_amount: { $ne: 0 },
        });
        if (wallet) {
            let money = Number(wallet?.total_amount) - Number(amount);
            if (money > 0) {
                return await Wallet.findOneAndUpdate({
                    _id: wallet_id,
                    'transactions._id': transaction_id,
                    total_amount: { $ne: 0 },
                },
                    { $set: { total_amount: Number(money), 'transactions.$.status': 'OUTGOING' } }
                    , { new: true }).lean();
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
};

export const deleteWalletTransaction = async (wallet_id, transaction_id) => {
    try {
        return await Wallet.findOneAndUpdate({
            _id: wallet_id,
            'transactions._id': transaction_id,
        },
            { $pull: { transactions: { _id: transaction_id } } }
            , { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
};
