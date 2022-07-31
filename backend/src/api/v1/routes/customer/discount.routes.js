import { merchantController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";

function discountRoutes(app) {
    app.get('/merchant-discount', tryCatchHandle(merchantController().getMerchantDiscount));
}
export { discountRoutes };