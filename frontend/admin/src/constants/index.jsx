import Cookies from "js-cookie";
const headerOptions = {
  Accept: "application/json",
  "Content-Type": "application/json",
},
  admin = Cookies.get("admin"),
  // baseUrl = "http://localhost:3690/XYZ!@!/admin",
  // chatUrl = "http://localhost:3690",
  baseUrl = "https://api.esyclick.com/XYZ!@!/admin",
  chatUrl = "https://api.esyclick.com",
  legal_form_options = [
    { name: "Limited liability company" },
    { name: "Public Company" },
    {
      name: "No minimum capital, unlimited liability of partners, non-business",
    },
  ],
  banks = [
    {
      name: "AB Bank Ltd.",
    },
    {
      name: "Agrani Bank",
    },
    {
      name: "Al-Arafah Islami Bank Ltd.",
    },
    {
      name: "Ansar VDP Unnayan Bank",
    },
    {
      name: "BASIC Bank",
    },
    {
      name: "BRAC Bank Ltd.",
    },
    {
      name: "Bangladesh Commerce Bank Ltd.",
    },
    {
      name: "Bangladesh Development Bank",
    },
    {
      name: "Bangladesh Krishi Bank",
    },
    {
      name: "Bank Al-Falah",
    },
    {
      name: "Bank Asia Ltd.",
    },
    {
      name: "CITI Bank NA",
    },
    {
      name: "Commercial Bank of Ceylon",
    },
    {
      name: "Community Bank Bangladesh Limited",
    },
    {
      name: "Dhaka Bank Ltd.",
    },
    {
      name: "Dutch Bangla Bank Ltd.",
    },
    {
      name: "EXIM Bank Ltd.",
    },
    {
      name: "Eastern Bank Ltd.",
    },
    {
      name: "First Security Islami Bank Ltd.",
    },
    {
      name: "Global Islamic Bank Ltd.",
    },
    {
      name: "Grameen Bank",
    },
    {
      name: "HSBC",
    },
    {
      name: "Habib Bank Ltd.",
    },
    {
      name: "ICB Islamic Bank",
    },
    {
      name: "IFIC Bank Ltd.",
    },
    {
      name: "Islami Bank Bangladesh Ltd.",
    },
    {
      name: "Jamuna Bank Ltd.",
    },
    {
      name: "Janata Bank",
    },
    {
      name: "Jubilee Bank",
    },
    {
      name: "Karmashangosthan Bank",
    },
    {
      name: "Meghna Bank Ltd.",
    },
    {
      name: "Mercantile Bank Ltd.",
    },
    {
      name: "Midland Bank Ltd.",
    },
    {
      name: "Modhumoti Bank Ltd.",
    },
    {
      name: "Mutual Trust Bank Ltd.",
    },
    {
      name: "NCC Bank Ltd.",
    },
    {
      name: "NRB Bank Ltd.",
    },
    {
      name: "NRB Commercial Bank Ltd.",
    },
    {
      name: "National Bank Ltd.",
    },
    {
      name: "National Bank of Pakistan",
    },
    {
      name: "One Bank Ltd.",
    },
    {
      name: "Padma Bank Ltd.",
    },
    {
      name: "Palli Sanchay Bank",
    },
    {
      name: "Premier Bank Ltd.",
      "BankShortCode": "PBL",
    },
    {
      name: "Prime Bank Ltd.",
    },
    {
      name: "Pubali Bank Ltd.",
    },
    {
      name: "Rajshahi Krishi Unnayan Bank",
    },
    {
      name: "Rupali Bank",
    },
    {
      name: "SBAC Bank Ltd.",
    },
    {
      name: "Shahjalal Islami Bank Ltd.",
    },
    {
      name: "Shimanto Bank Ltd.",
    },
    {
      name: "Social Islami Bank Ltd.",
    },
    {
      name: "Sonali Bank",
    },
    {
      name: "Southeast Bank Ltd.",
    },
    {
      name: "Standard Bank Ltd.",
    },
    {
      name: "Standard Chartered Bank",
    },
    {
      name: "State Bank of India",
    },
    {
      name: "The City Bank Ltd.",
    },
    {
      name: "Trust Bank Ltd.",
    },
    {
      name: "Union Bank Ltd.",
    },
    {
      name: "United Commercial Bank Ltd.",
    },
    {
      name: "Uttara Bank Ltd.",
    },
    {
      name: "Woori Bank Ltd.",
    }
  ],
  shop_account = ["account", "business", "bank", "warehouse", "return"],
  admin_product_variation = [
    "online_product",
    "deactive_product",
    "all_product"
  ],
  vendor_product_variation = [
    "all_product",
    "online_product",
    "pending_product",
    "suspended_product",
  ],
  vendor_voucher_variation = [
    "vendor_all_voucher",
    "vendor_active_voucher",
    'vendor_deactive_voucher'
  ],
  vendor_free_shipping_variation = [
    "vendor_all_free_shipping",
    "vendor_active_free_shipping",
    'vendor_deactive_free_shipping'
  ],
  order_variation = [
    "all_order",
    "pending_order",
    'ready_to_ship_order',
    "shipped_order",
    "delivered_order",
    "canceled_order",
    "return_request",
    "returned_order",
    "failed_delivery_order",
  ],
  vendor_order_variation = [
    "vendor_all_order",
    "vendor_pending_order",
    'vendor_ready_to_ship_order',
    "vendor_shipped_order",
    "vendor_delivered_order",
    "vendor_canceled_order",
    "vendor_returned_order",
    "vendor_failed_delivery_order",
  ],
  merchant_variation = [
    'active_merchant',
    "de_active_merchant",
    "wallet_request",
  ],
  order_details_variation = [
    "customer_information",
    "amount_information",
    "billing_information",
    "shipping_information"
  ],
  campaign_details_variation = [
    "campaign_vendors",
    "campaign_products"
  ],
  vendor_details_variation = [
    "vendor_orders",
    "vendor_products",
    "vendor_vouchers",
    "vendor_free_shipments",
    "vendor_campaigns",
    "finance",
    "vendor_order_overview"
  ],
  cancel_reasons = {
    "Stock Out": "Stock Out",
    "SLA Time Expire": "SLA Time Expire",
    "Sourcing Delay": "Sourcing Delay",
    "Pricing Error": "Pricing Error",
    "Wrong Product": "Wrong Product"
  },
  color = [
    { title: "NONE" },
    { title: "Red" },
    { title: "Blue" },
    { title: "Multi Color" },
    { title: "White" },
    { title: "Cyan" },
    { title: "Black" },
    { title: "Sliver" },
    { title: "Blue" },
    { title: "Gray" },
    { title: "Marron" },
    { title: "Purple" },
    { title: "Green" },
    { title: "Olive" },
    { title: "Yellow" },
    { title: "Ash" },
    { title: "Pink" },
    { title: "Brown" },
    { title: "Chocolate" },
    { title: "Violet" },
    { title: "Gold" },
    { title: "Indigo" },
    { title: "Magenta" },
    { title: "Orange" },
    { title: "Skyblue" },
  ],
  warranty_type = [
    { title: "No Warranty" },
    { title: "Brand Warranty" },
    { title: "Seller Warranty" },
  ],
  warranty_period = [
    { title: "1 month" },
    { title: "2 months" },
    { title: "3 months" },
    { title: "4 months" },
    { title: "5 months" },
    { title: "6 months" },
    { title: "7 months" },
    { title: "8 months" },
    { title: "9 months" },
    { title: "10 months" },
    { title: "11 months" },
    { title: "18 months" },
    { title: "1 year" },
    { title: "2 years" },
    { title: "3 years" },
    { title: "4 years" },
    { title: "5 years" },
    { title: "6 years" },
    { title: "7 years" },
    { title: "8 years" },
    { title: "9 years" },
    { title: "10 years" },
    { title: "11 years" },
    { title: "12 years" },
    { title: "13 years" },
    { title: "14 years" },
    { title: "15 years" },
    { title: "20 years" },
    { title: "30 years" },
    { title: "Life Time" },
  ],
  size = [
    { title: "NONE" },
    { title: "XS" },
    { title: "S" },
    { title: "M" },
    { title: "L" },
    { title: "XL" },
    { title: "XXL" },
    { title: "XXXL" },

    { title: "30" },
    { title: "32" },
    { title: "34" },
    { title: "38" },

    { title: "40" },
    { title: "42" },
    { title: "44" },
    { title: "46" },

    { title: "50" },
    { title: "52" },
    { title: "54" },
    { title: "56" },
    { title: "0-4 years" },
    { title: "4-7 years" },
    { title: "7-10 years" },
    { title: "10-15 years" },

    { title: "10-15" },
    { title: "15-20" },
    { title: "20-25" },
    { title: "25-30" },
    { title: "30-35" },

    { title: "40-45" },
    { title: "45-50" },
    { title: "50-60" },
    { title: "Free Size" },
  ],
  dangerous_goods_options = [
    { title: "Battery" },
    { title: "Flammable" },
    { title: "Liquid" },
    { title: "None" },
  ];
export {
  headerOptions,
  baseUrl,
  chatUrl,
  admin,
  legal_form_options,
  shop_account,
  admin_product_variation,
  vendor_free_shipping_variation,
  vendor_product_variation,
  vendor_voucher_variation,
  cancel_reasons,
  order_variation,
  vendor_order_variation,
  merchant_variation,
  order_details_variation,
  vendor_details_variation,
  campaign_details_variation,
  color,
  warranty_period,
  warranty_type,
  size,
  dangerous_goods_options,
  banks
};
