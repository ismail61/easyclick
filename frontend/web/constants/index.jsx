import Cookies from "js-cookie";
const headerOptions = {
  Accept: "application/json",
  "Content-Type": "application/json",
},
  payment_method = {
    'COD': 'Cash On Delivery',
  },
  cancel_reasons = {
    "Mind Change": "Mind Change",
    "Wrong Product": "Wrong Product",
    "Delivery Time long": "Delivery Time long",
  },
  return_reasons = {
    "Quantity Mismatch": "Quantity Mismatch",
    "Damaged Product": "Damaged Product",
    "Wrong Product": "Wrong Product"
  },
  customer = Cookies.get("token"),
  // baseUrl = "http://localhost:3690"
  baseUrl = "https://api.esyclick.com"

export {
  headerOptions,
  payment_method,
  baseUrl,
  cancel_reasons,
  return_reasons,
  customer
};
