import { tryCatchHandle } from "../../utils";
import { adminAuthentication } from '../../middlewares/admin/'
import { walletController } from "../../controllers/common/wallet.controller";

function walletRoutes(app) {
    app.get('/XYZ!@!/admin/request-wallets', adminAuthentication, tryCatchHandle(walletController().getCustomerRequestedWallets));
    app.patch('/XYZ!@!/admin/request-wallet-paid/:wallet_id/:transaction_id', adminAuthentication, tryCatchHandle(walletController().getCustomerRequestedPaidWallets));
    app.patch('/XYZ!@!/admin/request-wallet-delete/:wallet_id/:transaction_id', adminAuthentication, tryCatchHandle(walletController().getCustomerRequestedDeleteWallets));
}
export { walletRoutes };