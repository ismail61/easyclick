import { campaignRoutes } from "./campaign.routes";
import { freeShippingRoutes } from "./freeShipping.routes";
import { voucherRoutes } from "./voucher.routes";

function PromotionRoutes(app) {
    voucherRoutes(app);
    campaignRoutes(app);
    freeShippingRoutes(app);
}
export { PromotionRoutes };