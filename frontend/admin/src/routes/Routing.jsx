import { Routes, Route, Navigate } from "react-router-dom";
import { OrderDetails, OrderList } from "pages/order";
import { ProductDetails, ProductList } from 'pages/product'
import {
  CampaignList,
  EditVoucher,
  FreeShippingList,
  VoucherList,
} from "pages/promotion";
import { NotFound } from "pages/notFound";
import { Logout, SignIn } from "pages/auth";
import { AddBrand, BrandList } from "pages/brand";
import { AddBanner, BannerList, EditBanner } from "pages/banner";
import { AddCategory, CategoryList, EditCategory } from "pages/category";
import EditCampaign from "pages/promotion/campaign/EditCampaign";
import CampaignDetails from "pages/promotion/campaign/CampaignDetails";
import Email from "pages/email/Email";
import ChatWindow from "pages/chat/ChatWindow";
import AddProduct from "pages/product/AddProduct";
import EditProduct from "pages/product/EditProduct";
import { ReviewList } from "pages/review";
import QuestionList from "pages/qa/QuestionList";
import DeliveryFeeList from "pages/delivery-fee/DeliveryFee";
import AddDeliveryFee from "pages/delivery-fee/AddDeliveryFee";
import MerchantList from "pages/merchant/MerchnatList";
export const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/category/list"
        element={user ? <CategoryList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/"
        element={user ? <ProductList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-category"
        element={user ? <AddCategory /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-category/:id"
        element={user ? <EditCategory /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/brand/list"
        element={user ? <BrandList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-brand"
        element={user ? <AddBrand /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/banner/list"
        element={user ? <BannerList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-banner"
        element={user ? <AddBanner /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-banner/:id"
        element={user ? <EditBanner /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/order/list"
        element={user ? <OrderList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/order/:id"
        element={user ? <OrderDetails /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/product/list"
        element={user ? <ProductList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-product"
        element={user ? <AddProduct /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-product/:id"
        element={user ? <EditProduct /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/product/:id"
        element={user ? <ProductDetails /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/list"
        element={user ? <CampaignList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/:id"
        element={
          user ? <CampaignDetails /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/review/list"
        element={user ? <ReviewList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/question-answer"
        element={user ? <QuestionList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-campaign/:id"
        element={
          user ? <EditCampaign /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/merchant/list"
        element={user ? <MerchantList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/voucher/list"
        element={user ? <VoucherList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-voucher/:id"
        element={user ? <EditVoucher /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/free-shipping/list"
        element={user ? <FreeShippingList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/chat"
        element={user ? <ChatWindow /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/chat/vendor/:id"
        element={user ? <ChatWindow /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/delivery-fee"
        element={user ? <DeliveryFeeList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-delivery-fee"
        element={user ? <AddDeliveryFee /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/log-out"
        element={
          user ? <Logout /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/email"
        element={user ? <Email /> : <Navigate to="/sign-in" replace />}
      />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
};