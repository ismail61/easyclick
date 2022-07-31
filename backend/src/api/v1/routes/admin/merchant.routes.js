import { merchantController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";
import { adminAuthentication } from "../../middlewares/admin";

function merchantRoutes(app) {

    app.get('/XYZ!@!/admin/merchants', adminAuthentication, tryCatchHandle(merchantController().getAllMerchants));
    app.get('/XYZ!@!/admin/merchant/:id', adminAuthentication, tryCatchHandle(merchantController().getSingleMerchant));
    app.get('/XYZ!@!/admin/deactivated-merchants', adminAuthentication, tryCatchHandle(merchantController().getAllDeActivatedMerchants));
    app.get('/XYZ!@!/admin/activated-merchants', adminAuthentication, tryCatchHandle(merchantController().getAllActivatedMerchants));
    app.get('/XYZ!@!/admin/deactivated-merchant-counts', adminAuthentication, tryCatchHandle(merchantController().getDeActivatedMerchantCounts));
    app.get('/XYZ!@!/admin/activated-merchant-counts', adminAuthentication, tryCatchHandle(merchantController().getActivatedMerchantCounts));
    app.patch('/XYZ!@!/admin/active-merchant/:id', adminAuthentication, tryCatchHandle(merchantController().activeMerchant));
    app.patch('/XYZ!@!/admin/de_active-merchant/:id', adminAuthentication, tryCatchHandle(merchantController().deActiveMerchant));


    app.get('/XYZ!@!/admin/merchant-discount', adminAuthentication, tryCatchHandle(merchantController().getMerchantDiscount));
    app.patch('/XYZ!@!/admin/update-merchant-discount', adminAuthentication, tryCatchHandle(merchantController().updateMerchantDiscount));
}
export { merchantRoutes };