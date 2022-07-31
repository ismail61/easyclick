import { voucherController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";
import { tryCatchHandle } from "../../../utils";

function voucherRoutes(app) {
    app.get(
        "/XYZ!@!/admin/promotions/vouchers",
        adminAuthentication,
        tryCatchHandle(voucherController().getAllVouchers)
    );
    app.get(
        "/XYZ!@!/admin/promotions/active-vouchers",
        adminAuthentication,
        tryCatchHandle(voucherController().getAllActiveVouchers)
    );
    app.get(
        "/XYZ!@!/admin/promotions/deactive-vouchers",
        adminAuthentication,
        tryCatchHandle(voucherController().getAllDeActiveVouchers)
    );
    app.get(
        "/XYZ!@!/admin/promotions/voucher/:id",
        adminAuthentication,
        tryCatchHandle(voucherController().getSingleVoucher)
    );
    app.post(
        "/XYZ!@!/admin/promotions/create-voucher",
        adminAuthentication,
        tryCatchHandle(voucherController().createVoucher)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/update-voucher/:id",
        adminAuthentication,
        tryCatchHandle(voucherController().updateVoucher)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/active-voucher/:id",
        adminAuthentication,
        tryCatchHandle(voucherController().activeVoucher)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/deactive-voucher/:id",
        adminAuthentication,
        tryCatchHandle(voucherController().deActiveVoucher)
    );
}
export { voucherRoutes };
