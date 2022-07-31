
import { productController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function productRoutes(app) {

    app.get('/XYZ!@!/admin/products', adminAuthentication, tryCatchHandle(productController().getAdminProducts));
    app.get('/XYZ!@!/admin/product/:id', adminAuthentication, tryCatchHandle(productController().getSingleProduct));
    app.post('/XYZ!@!/admin/add-product', adminAuthentication, tryCatchHandle(productController().addProduct));
    app.get('/XYZ!@!/admin/deactive-products', adminAuthentication, tryCatchHandle(productController().getAdminDeActiveProducts));
    app.get('/XYZ!@!/admin/online-products', adminAuthentication, tryCatchHandle(productController().getAdminActiveProducts));
    app.patch('/XYZ!@!/admin/active-product/:id', adminAuthentication, tryCatchHandle(productController().activeProduct));
    app.patch('/XYZ!@!/admin/deactive-product/:id', adminAuthentication, tryCatchHandle(productController().deActiveProduct));
    app.patch('/XYZ!@!/admin/update-product/:id', adminAuthentication, tryCatchHandle(productController().updateProduct));
}

export { productRoutes };