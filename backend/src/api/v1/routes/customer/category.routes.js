import { categoryController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";

function categoryRoutes(app) {
    app.get('/customer/categories', tryCatchHandle(categoryController().getWebsiteCategory));
    app.get('/customer/home-page-categories', tryCatchHandle(categoryController().getWebsiteHomePageCategory));
    app.get('/customer/category/products/:slug', tryCatchHandle(categoryController().getWebsiteProductBySpecificCategory));
}
export { categoryRoutes };