import { Get } from "../xhr";

export function getCampaigns() {
    return Get('customer/campaigns');
}
export function getCampaignProducts(id) {
    return Get(`customer/campaign-products/${id}`);
}
