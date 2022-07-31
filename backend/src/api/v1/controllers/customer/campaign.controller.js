import { getAllCampaigns } from "../../services/admin";

function customerCampaignController() {
    return {
        // Get all Active Campaigns
        getAllActiveCampaigns: async (req, res) => {
            const campaigns = await getAllCampaigns({
                is_active: true,
                campaign_end_time: {$gt : new Date()}
            });
            return res.status(200).json(campaigns);
        },
    };
}

export { customerCampaignController };
