import { addNewCampaign, GetCampaigns, UpdateCampaign } from "adapters/promotions/Campaign";
import { addNewFreeShipping, DeleteFreeShipping, GetFreeShipments, UpdateFreeShipping } from "adapters/promotions/FreeShipping";
import { addNewVoucher, GetVouchers, UpdateVoucher } from "adapters/promotions/Voucher";

//Voucher
export function addVoucher(data) {
    return addNewVoucher('promotions/create-voucher', data);
}

export function getVouchers(path) {
    return GetVouchers(path);
}


export function getSingleVoucher(id) {
    return GetVouchers(`promotions/voucher/${id}`);
}

export function editVoucher(id, data) {
    return UpdateVoucher(`promotions/update-voucher/${id}`, data);
}

export function ActiveVoucher(id) {
    return UpdateVoucher(`promotions/active-voucher/${id}`, {});
}

export function DeActiveVoucher(id) {
    return UpdateVoucher(`promotions/deactive-voucher/${id}`, {});
}

export function getVoucherCount(type, id) {
    switch (type) {
        case 'all':
            return GetVouchers(`promotions/vendor-all-voucher-counts/${id}`);
        case 'active':
            return GetVouchers(`promotions/vendor-active-voucher-counts/${id}`);
        case 'deactive':
            return GetVouchers(`promotions/vendor-deactive-voucher-counts/${id}`);
        default:
            return null;
    }
}

//Free Shipping
export function getFreeShipping(path) {
    return GetFreeShipments(path);
}

export function addFreeShipping(data) {
    return addNewFreeShipping('promotions/create-free-shipping', data);
}
export function deleteFreeShipment(id) {
    return DeleteFreeShipping(`promotions/delete-free-shipping/${id}`);
}
export function ActiveFreeShipping(id) {
    return UpdateFreeShipping(`promotions/active-free-shipping/${id}`, {});
}
export function DeActiveFreeShipping(id) {
    return UpdateFreeShipping(`promotions/deactive-free-shipping/${id}`, {});
}
export function getSingleFreeShipping(id) {
    return GetFreeShipments(`promotions/free-shipping/${id}`);
}

export function getFreeShippingCount(type, id) {
    switch (type) {
        case 'all':
            return GetFreeShipments(`promotions/vendor-all-free-shipping-counts/${id}`);
        case 'active':
            return GetFreeShipments(`promotions/vendor-active-free-shipping-counts/${id}`);
        case 'deactive':
            return GetFreeShipments(`promotions/vendor-deactive-free-shipping-counts/${id}`);
        default:
            return null;
    }
}

//Campaigns
export function addCampaign(data) {
    return addNewCampaign('promotions/create-campaign', data);
}
export function getSingleCampaign(id) {
    return GetCampaigns(`promotions/campaign/${id}`);
}
export function editCampaign(id, data) {
    return UpdateCampaign(`promotions/update-campaign/${id}`, data);
}
export function getCampaigns(path) {
    return GetCampaigns(path);
}
export function ActiveCampaign(id) {
    return UpdateCampaign(`promotions/active-campaign/${id}`, {});
}
export function DeActiveCampaign(id) {
    return UpdateCampaign(`promotions/deactive-campaign/${id}`, {});
}