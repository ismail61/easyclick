import { AddFreeShipping, FreeShippingList } from 'components/freeShipping';
import OrderDetailsInformationFactory from 'components/order/OrderDetailsInformationFactory';
import OrderFactory from 'components/order/OrderFactory';
import { CategoryFactory } from 'components/category';
import { AddVoucher, VoucherList } from 'components/voucher';
import React from 'react'
import { BrandFactory } from 'components/brand';
import { BannerFactory } from 'components/banner';
import { AddCampaign, CampaignList } from 'components/campaign';
import CampaignDetailsFactory from 'components/campaign/CampaignDetailsFactory';
import {
    OrderOverview,
} from "pages/finance";
import { ProductFactory } from 'components/product';
import MerchantFactory from 'components/merchant/MerchantFactory';
import WalletFactory from 'components/wallet/WalletFactory';

const CaseDecision = (props) => {
    const { type } = props;
    switch (type) {
        case 'all_product':
            return (
                <ProductFactory type="all" />
            )
        case 'deactive_product':
            return (
                <ProductFactory type="deactive" />
            )
        case 'online_product':
            return (
                <ProductFactory type="online" />
            )
        case 'vouchercode':
            return (
                <VoucherList />
            )
        case 'addvoucher':
            return (
                <AddVoucher />
            )
        case 'campaigns':
            return (
                <CampaignList />
            )
        case 'addcampaign':
            return (
                <AddCampaign />
            )
        case 'freeshipping':
            return (
                <FreeShippingList />
            )
        case 'addfreeshipping':
            return (
                <AddFreeShipping />
            )
        case 'all_category':
            return (
                <CategoryFactory type="all" />
            )
        case 'all_brand':
            return (
                <BrandFactory />
            )
        case 'home_category':
            return (
                <CategoryFactory type="home_category" />
            )
        case 'all_banner':
            return (
                <BannerFactory type="all" />
            )
        case 'home_banner':
            return (
                <BannerFactory type="home_banner" />
            )
        case 'all_order':
            return (
                <OrderFactory type="all" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'pending_order':
            return (
                <OrderFactory type="pending" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'ready_to_ship_order':
            return (
                <OrderFactory type="ready_to_ship" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'sla_beached_order':
            return (
                <OrderFactory type="sla_beached_order" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'shipped_order':
            return (
                <OrderFactory type="shipped" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'delivered_order':
            return (
                <OrderFactory type="delivered" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'canceled_order':
            return (
                <OrderFactory type="canceled" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'returned_order':
            return (
                <OrderFactory type="returned" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'return_request':
            return (
                <OrderFactory type="return_request" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'failed_delivery_order':
            return (
                <OrderFactory type="failed_delivery" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'campaign_vendors':
            return (
                <CampaignDetailsFactory type="vendors" campaign={props?.campaign} />
            )
        case 'campaign_products':
            return (
                <CampaignDetailsFactory type="products" campaign={props?.campaign} />
            )
        case 'customer_information':
            return (
                <OrderDetailsInformationFactory type="customer" />
            )
        case 'amount_information':
            return (
                <OrderDetailsInformationFactory type="amount" />
            )
        case 'transaction_information':
            return (
                <OrderDetailsInformationFactory type="transaction" />
            )
        case 'billing_information':
            return (
                <OrderDetailsInformationFactory type="billing_information" />
            )
        case 'shipping_information':
            return (
                <OrderDetailsInformationFactory type="shipping_information" />
            )

        case 'vendor_order_overview':
            return (
                <OrderOverview />
            )
        case 'de_active_merchant':
            return (
                <MerchantFactory type="de_active" getAllMerchantCountManage={props?.getAllMerchantCountManage} />
            )
        case 'active_merchant':
            return (
                <MerchantFactory type="active" getAllMerchantCountManage={props?.getAllMerchantCountManage} />
            )
        case 'wallet_request':
            return (
                <WalletFactory getAllMerchantCountManage={props?.getAllMerchantCountManage} />
            )
        default:
            return (
                null
            )
    }
}

export default CaseDecision