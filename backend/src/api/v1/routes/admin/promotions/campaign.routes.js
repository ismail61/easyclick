
import { campaignController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";
import { upload } from '../../../middlewares/commom';
import { tryCatchHandle } from "../../../utils";

function campaignRoutes(app) {

    app.post(
        "/XYZ!@!/admin/promotions/create-campaign",
        adminAuthentication, upload.single('image'),
        tryCatchHandle(campaignController().createCampaign)
    );
    app.get(
        "/XYZ!@!/admin/promotions/campaigns",
        adminAuthentication,
        tryCatchHandle(campaignController().getAllCampaigns)
    );
    app.get(
        "/XYZ!@!/admin/promotions/active-campaigns",
        adminAuthentication,
        tryCatchHandle(campaignController().getAllActiveCampaigns)
    );
    app.get(
        "/XYZ!@!/admin/promotions/campaign-products/:id",
        adminAuthentication,
        tryCatchHandle(campaignController().getSingleCampaignProducts)
    );
    app.get(
        "/XYZ!@!/admin/promotions/deactive-campaigns",
        adminAuthentication,
        tryCatchHandle(campaignController().getAllDeActiveCampaigns)
    );
    app.get(
        "/XYZ!@!/admin/promotions/campaign/:id",
        adminAuthentication,
        tryCatchHandle(campaignController().getSingleCampaign)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/update-campaign/:id",
        adminAuthentication,
        tryCatchHandle(campaignController().updateCampaign)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/active-campaign/:id",
        adminAuthentication,
        tryCatchHandle(campaignController().activeCampaign)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/deactive-campaign/:id",
        adminAuthentication,
        tryCatchHandle(campaignController().deActiveCampaign)
    );
}
export { campaignRoutes };
