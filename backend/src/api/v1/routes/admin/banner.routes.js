import { tryCatchHandle } from "../../utils";
import { upload } from '../../middlewares/commom';
import { adminAuthentication } from "../../middlewares/admin";
import { bannerController } from "../../controllers/admin/banner.controller";

function bannerRoutes(app) {
    app.post('/XYZ!@!/admin/banner/create-banner', adminAuthentication, upload.single('image'), tryCatchHandle(bannerController().createBanner));
    app.get('/XYZ!@!/admin/banners', adminAuthentication, tryCatchHandle(bannerController().getAllBanner));
    app.get('/XYZ!@!/admin/home-page-banners', adminAuthentication, tryCatchHandle(bannerController().getAllHomePageBanner));  
    app.get('/XYZ!@!/admin/banner/:id', adminAuthentication, tryCatchHandle(bannerController().getSingleBanner));
    app.patch('/XYZ!@!/admin/banner/:id', adminAuthentication, upload.single('image'), tryCatchHandle(bannerController().updateBanner));
    app.patch('/XYZ!@!/admin/banner/show-home-page/:id', adminAuthentication, tryCatchHandle(bannerController().showHomePageBanner));
    app.patch('/XYZ!@!/admin/banner/hide-home-page/:id', adminAuthentication, tryCatchHandle(bannerController().hideHomePageBanner));
}
export { bannerRoutes };