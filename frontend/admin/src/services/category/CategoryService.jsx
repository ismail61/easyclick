import { CategoryList, CategoryFeatureUpdate, CreateCategory, GetCategory, UpdateCategory } from "adapters/category/categoryList";

export function getCategories(type) {
  switch (type) {
      case 'all':
          return CategoryList('categories');
      case 'home_category':
          return CategoryList('home-page-categories');
      default:
          return null;
  }
}

export function dynamicCategoryFeaturesHandler(type, id) {
  switch (type) {
      case 'active_home_page':
          return CategoryFeatureUpdate(`category/show-home-page/${id}`);
      case 'de_active_home_page':
          return CategoryFeatureUpdate(`category/hide-home-page/${id}`);
      default:
          return null;
  }
}

export function createCategory(data) {
    return CreateCategory('category/create-category', data);
}

export function updateCategory(id,data) {
    return UpdateCategory(`category/${id}`, data);
}

export function getSingleCategory(id) {
    return GetCategory(`category/${id}`);
}

export function getAllNestedCategory(){
    return CategoryList('get-categories');
  }
