import { addressController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function addressRoutes(app) {
    app.get('/XYZ!@!/admin/get-all-district',adminAuthentication, tryCatchHandle(addressController().getCities));
}
export { addressRoutes };