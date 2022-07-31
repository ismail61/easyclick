import {  createCampaign, getAllCampaigns, getAllProducts, getDynamicCampaign, getSingleCampaign, updateCampaign } from "../../../services/admin";
import { error } from "../../../utils";
import { campaignValidation } from "../../../validations";
import * as cloudinary from 'cloudinary';

function campaignController() {
    return {
        // Create a new Campaign
        createCampaign: async (req, res) => {
            const validation = campaignValidation(req.body);
            if (validation.error)
                return error().resourceError(
                    res,
                    validation.error?.details[0].message,
                    422
                );
            if (!req.file) {
                return error().resourceError(res, 'You must select an image for this campaign', 415);
            }
            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const doesMatch = await getSingleCampaign({ name: req.body?.name });
            if (doesMatch) return error().resourceError(res, 'Sorry! Duplicate Campaign Name.Please Choose different name', 422);


            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'easyclick/campaigns', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Uploaded Failed . Please try again', 500);

            let image = {
                url: image_upload?.secure_url
            }

            const addedCampaign = await createCampaign({
                ...req.body,
                image
            }, res);
            return res.status(200).json(addedCampaign);
        },

        // Find single Campaign by ID
        getSingleCampaign: async (req, res) => {
            const campaign = await getSingleCampaign({ _id: req.params?.id });
            if (!campaign) return error().resourceError(res, 'Sorry! This Campaign doest not exists or something wrong', 422);
            return res.status(200).json(campaign);
        },

        // Get all Active Campaigns
        getAllActiveCampaigns: async (req, res) => {
            const campaigns = await getDynamicCampaign(true);
            return res.status(200).json(campaigns);
        },

        // Get Campaign Products
        getSingleCampaignProducts: async (req, res) => {
            const campaign = await getAllProducts({ 
                _id: req.params?.id,
                is_active: true,
                campaign_end_time: {$gt : new Date()},
            });
            return res.status(200).json(campaign);
        },

        // Get all DeActive Campaigns
        getAllDeActiveCampaigns: async (req, res) => {
            const campaigns = await getDynamicCampaign(false);
            return res.status(200).json(campaigns);
        },

        // Get all Campaigns
        getAllCampaigns: async (req, res) => {
            const campaigns = await getAllCampaigns({});
            return res.status(200).json(campaigns);
        },

        // Update single Campaign by ID
        updateCampaign: async (req, res) => {

            const validation = campaignValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.message, 422);

            const updatedCampaign = await updateCampaign(
                { _id: req.params?.id },
                req.body
            );
            if (!updatedCampaign) return error().resourceError(res, 'Sorry! This Campaign doest not exists or something wrong', 422);
            return res.status(200).json(updatedCampaign);
        },

        // Active single Campaign by ID
        activeCampaign: async (req, res) => {
            const updatedCampaign = await updateCampaign(
                { _id: req.params?.id },
                { is_active: true }
            );
            if (!updatedCampaign) return error().resourceError(res, 'Sorry! This Campaign doest not exists or something wrong', 422);
            return res.status(200).json(updatedCampaign);
        },

        // De Active single Campaign by ID
        deActiveCampaign: async (req, res) => {
            const updatedCampaign = await updateCampaign(
                { _id: req.params?.id },
                { is_active: false }
            );
            if (!updatedCampaign) return error().resourceError(res, 'Sorry! This Campaign doest not exists or something wrong', 422);
            return res.status(200).json(updatedCampaign);
        },

    
    };
}

export { campaignController };
