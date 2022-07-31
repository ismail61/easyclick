import { tryCatchHandle } from "../../utils";
import { customerAuthentication } from '../../middlewares/customer/'
import { walletController } from "../../controllers/common/wallet.controller";

function walletRoutes(app) {
    app.get('/customer/wallet', customerAuthentication, tryCatchHandle(walletController().getCustomerWallet));
    app.patch('/customer/request-wallet/:wallet_id', customerAuthentication, tryCatchHandle(walletController().requestWallet));
}
export { walletRoutes };