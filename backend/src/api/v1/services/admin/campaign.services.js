import { Campaign } from "../../mongodb/admin";
import _ from 'lodash'
import { globalErrorHandler } from "../../utils";

export const createCampaign = async (data, res) => {
    try {
        return await new Campaign(data).save();
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
};

export const getSingleCampaign = async (query) => {
    try {
        return await Campaign.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getAllCampaigns = async (query) => {
    try {
        return await Campaign.find(query).lean().sort({ createdAt: -1 });
    } catch (err) {
        console.log(err);
    }
};

export const getAllProducts = async (query) => {
    try {
        return await Campaign.findOne(query).lean().select('discount');
    } catch (err) {
        console.log(err);
    }
};


export const getDynamicCampaign = async (status) => {
    try {
        return await Campaign.find({
            is_active: status
        }).lean()
    } catch (err) {
        console.log(err);
    }
};

export const updateCampaign = async (query, data) => {
    try {
        return await Campaign.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err);
    }
};


