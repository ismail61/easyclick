import { accountController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
import { upload } from '../../middlewares/commom'
import { customerAuthentication } from '../../middlewares/customer'

function accountRoutes(app) {
    //Customer Account Info
    app.get('/customer/account-info', customerAuthentication, tryCatchHandle(accountController().getCustomerAccountInfo));
    app.patch('/customer/account-info', customerAuthentication, upload.single('image'), tryCatchHandle(accountController().updateCustomerAccountInfo))

    //change Password
    app.patch('/customer/change-password', customerAuthentication, tryCatchHandle(accountController().changePassword))
}
export { accountRoutes };