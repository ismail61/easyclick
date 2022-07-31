import { productController } from '../../controllers/customer'
import {customerAuthentication} from '../../middlewares/customer'
import { tryCatchHandle } from "../../utils";

function productRoutes(app) {

    app.get('/products', tryCatchHandle(productController().getAllProducts));
    app.get('/get-admin-eight-products', tryCatchHandle(productController().GetAdminAllProducts));
    app.get('/products/admin', tryCatchHandle(productController().GetAdminAllProducts));
    app.get('/product/:slug', tryCatchHandle(productController().getSingleProductBySlug));
    app.patch('/customer/product/add-question/:slug', customerAuthentication, tryCatchHandle(productController().addQuestion));

}
export { productRoutes };