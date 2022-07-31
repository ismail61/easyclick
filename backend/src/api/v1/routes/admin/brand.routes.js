import { brandController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function brandRoutes(app) {
    app.post('/XYZ!@!/admin/brand/create-brand', adminAuthentication, tryCatchHandle(brandController().createBrand));
    app.get('/XYZ!@!/admin/brands', adminAuthentication, tryCatchHandle(brandController().getAllBrands));
    app.patch('/XYZ!@!/admin/brand/:id', adminAuthentication, tryCatchHandle(brandController().updateBrand));
    app.delete('/XYZ!@!/admin/brand/delete-brand/:id', adminAuthentication, tryCatchHandle(brandController().deleteBrand));
    app.get('/XYZ!@!/admin/get-brands', adminAuthentication, tryCatchHandle(brandController().getAllBrand));
}
export { brandRoutes };