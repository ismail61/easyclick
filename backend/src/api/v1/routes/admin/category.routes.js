import { categoryController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";
import { upload } from '../../middlewares/commom';
import { adminAuthentication } from "../../middlewares/admin";

function categoryRoutes(app) {
    app.post('/XYZ!@!/admin/category/create-category', adminAuthentication, upload.single('image'), tryCatchHandle(categoryController().createCategory));
    app.get('/XYZ!@!/admin/categories', adminAuthentication, tryCatchHandle(categoryController().getAllCategory));
    app.get('/XYZ!@!/admin/home-page-categories', adminAuthentication, tryCatchHandle(categoryController().getAllHomePageCategory));
    app.get('/XYZ!@!/admin/category/products/:id', adminAuthentication, tryCatchHandle(categoryController().getAllProductBySpecificCategory));
    app.get('/XYZ!@!/admin/category/:id', adminAuthentication, tryCatchHandle(categoryController().getSingleCategory));
    app.patch('/XYZ!@!/admin/category/:id', adminAuthentication, upload.single('image'), tryCatchHandle(categoryController().updateCategory));
    app.patch('/XYZ!@!/admin/category/show-home-page/:id', adminAuthentication, tryCatchHandle(categoryController().showHomePageCategory));
    app.patch('/XYZ!@!/admin/category/hide-home-page/:id', adminAuthentication, tryCatchHandle(categoryController().hideHomePageCategory));
    app.get('/XYZ!@!/admin/get-categories', adminAuthentication, tryCatchHandle(categoryController().getAllNestedCategory));
}
export { categoryRoutes };