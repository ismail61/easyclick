import { tryCatchHandle } from "../../utils";
import { bannerController } from "../../controllers/admin/banner.controller";

function bannerRoutes(app) {
    app.get('/customer/banners', tryCatchHandle(bannerController().getAllHomePageBanner));
}
export { bannerRoutes };