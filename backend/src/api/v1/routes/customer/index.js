import { accountRoutes } from "./account.routes";
import { addressRoutes } from "./address.routes";
import { authRoutes } from "./auth.routes";
import { bannerRoutes } from "./banner.routes";
import { campaignRoutes } from "./campaign.routes";
import { cartRoutes } from "./cart.routes";
import { categoryRoutes } from "./category.routes";
import { discountRoutes } from "./discount.routes";
import { imageRoutes } from "./image.routes";
import { orderRoutes } from "./order.routes";
import { productRoutes } from "./product.routes";
import { reviewRoutes } from "./review.routes";
import { shippingFeeRoutes } from "./shipping.routes";
import { voucherRoutes } from "./vocuher.routes";
import { walletRoutes } from "./wallet.routes";
import { wishlistRoutes } from "./wishlist.routes";

function CustomerRoutes(app) {
    authRoutes(app);
    accountRoutes(app);
    productRoutes(app);
    orderRoutes(app);
    reviewRoutes(app);
    addressRoutes(app);
    wishlistRoutes(app);
    cartRoutes(app);
    categoryRoutes(app);
    bannerRoutes(app);
    voucherRoutes(app);
    campaignRoutes(app);
    imageRoutes(app);
    shippingFeeRoutes(app);
    discountRoutes(app);
    walletRoutes(app);
}
export { CustomerRoutes };