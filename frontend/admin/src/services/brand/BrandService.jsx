import { BrandList, CreateBrand, DeleteBrand, UpdateBrand } from "adapters/brand/brandList";

export function getBrands() {
  return BrandList('brands');
}

export function createBrand(data) {
  return CreateBrand('brand/create-brand', data);
}

export function deleteBrand(id) {
  return DeleteBrand(`brand/delete-brand/${id}`);
}

export function editBrand(id, data) {
  return UpdateBrand(`brand/${id}`, data);
}

export function getVendorBrands(){
  return BrandList('get-brands');
}