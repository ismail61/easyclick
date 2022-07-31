import { getWallet, getCustomerWallets, updateWalletTransaction, paidWalletTransaction, deleteWalletTransaction } from "../../services/common";

function walletController() {
    return {
        //Customer
        // Get customer wallet
        getCustomerWallet: async (req, res) => {
            const wallet = await getWallet({ user_id: req.user?._id });
            return res.status(200).json(wallet);
        },

        requestWallet: async (req, res) => {
            const { amount } = req.body;
            const wallet = await updateWalletTransaction(req?.params?.wallet_id, req.user?._id, amount);
            return res.status(200).json(wallet);
        },

        //Admin
        // Get customer requested wallets
        getCustomerRequestedWallets: async (req, res) => {
            const wallets = await getCustomerWallets();
            return res.status(200).json(wallets);
        },

        // customer requested wallet paid
        getCustomerRequestedPaidWallets: async (req, res) => {
            const { wallet_id, transaction_id } = req.params;
            const { amount } = req.body;
            if(amount) {
                const wallet = await paidWalletTransaction(wallet_id, transaction_id, amount);
                return res.status(200).json(wallet);
            }
        },

        // customer requested wallet delete
        getCustomerRequestedDeleteWallets: async (req, res) => {
            const { wallet_id, transaction_id } = req.params;
            const wallet = await deleteWalletTransaction(wallet_id, transaction_id);
            return res.status(200).json(wallet);
        },
    };
}

export { walletController };
