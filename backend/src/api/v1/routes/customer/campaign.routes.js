import { campaignController } from "../../controllers/admin";
import { customerCampaignController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
function campaignRoutes(app) {
    app.get('/customer/campaigns', tryCatchHandle(customerCampaignController().getAllActiveCampaigns));
    app.get(
        "/customer/campaign-products/:id",
        tryCatchHandle(campaignController().getSingleCampaignProducts)
    );
}
export { campaignRoutes };