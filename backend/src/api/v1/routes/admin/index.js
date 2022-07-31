import { addressRoutes } from "./address.routes";
import { authRoutes } from "./auth.routes";
import { bannerRoutes } from "./banner.routes";
import { brandRoutes } from "./brand.routes";
import { categoryRoutes } from "./category.routes";
import { chatRoutes } from "./chat.routes";
import { deliveryFeeRoutes } from "./delivery.fee.routes";
import { emailRoutes } from "./email.routes";
import { imageRoutes } from "./image.routes";
import { merchantRoutes } from "./merchant.routes";
import { orderRoutes } from "./order.routes";
import { productRoutes } from "./product.routes";
import { PromotionRoutes } from "./promotions";
import { qasRoutes } from "./qa.routes";
import { reviewRoutes } from "./review.routes";
import { smsRoutes } from "./sms.routes";
import { walletRoutes } from "./wallet.routes";

function AdminRoutes(app) {
    authRoutes(app);
    categoryRoutes(app)
    brandRoutes(app);
    PromotionRoutes(app);
    bannerRoutes(app);
    orderRoutes(app);
    productRoutes(app);
    emailRoutes(app);
    smsRoutes(app);
    chatRoutes(app);
    imageRoutes(app);
    reviewRoutes(app);
    qasRoutes(app);
    addressRoutes(app);
    deliveryFeeRoutes(app);
    merchantRoutes(app);
    walletRoutes(app);
}
export { AdminRoutes };