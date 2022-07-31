import { voucherController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
import { customerAuthentication } from '../../middlewares/customer/'

function voucherRoutes(app) {
    app.get('/customer/collected-vouchers', customerAuthentication, tryCatchHandle(voucherController().getAllCollectedVouchers));
    app.get('/admin-vouchers', tryCatchHandle(voucherController().getAllAdminVouchers));
    app.post('/customer/voucher-apply', customerAuthentication, tryCatchHandle(voucherController().applyVoucher));
    app.patch('/customer/voucher/add/:id', customerAuthentication, tryCatchHandle(voucherController().addVoucher));
    app.patch('/customer/voucher/remove/:id', customerAuthentication, tryCatchHandle(voucherController().removeVoucher));
}
export { voucherRoutes };