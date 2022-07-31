import { BannerFeatureUpdate, BannerList, CreateBanner, GetBanner, UpdateBanner } from "adapters/banner/bannerList";

export function getBanners(type) {
  switch (type) {
      case 'all':
          return BannerList('banners');
      case 'home_banner':
          return BannerList('home-page-banners');
      default:
          return null;
  }
}

export function dynamicBannerFeaturesHandler(type, id) {
  switch (type) {
      case 'active_home_page':
          return BannerFeatureUpdate(`banner/show-home-page/${id}`);
      case 'de_active_home_page':
          return BannerFeatureUpdate(`banner/hide-home-page/${id}`);
      default:
          return null;
  }
}

export function createBrand(data) {
    return CreateBanner('banner/create-banner', data);
}

export function updateBanner(id,data) {
    return UpdateBanner(`banner/${id}`, data);
}

export function getSingleBanner(id) {
    return GetBanner(`banner/${id}`);
}

