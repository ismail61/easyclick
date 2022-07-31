/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikSelect from "components/Input/FormikSelect";
import FormikRichText from "components/Input/FormikRichText";
import FormikTextArea from "components/Input/FormikTextArea";
import { Button } from "@mui/material";
import { ErrorToast, TryCatch } from "utils";
import { ImageInput } from "components";
import ComboBox from "components/Input/ComboBox";
import { color, size } from "constants/index";
import './demo.css'
import { dangerous_goods_options, warranty_type, warranty_period } from "constants/index";
import { dynamicProductFeaturesHandler, getSingleProduct } from "services/product/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cascade from "./Cascade";
export default function ProductDetails() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [product, setProduct] = useState("");
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [inputList, setInputList] = useState([]);
  const history = useNavigate();

  const suspendedProduct = async (type, id) => {
    const res = await Swal.fire({
      title: 'Enter the Suspended Reason',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      inputPlaceholder: 'Enter a reason',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to input some value!'
        }
      }
    })
    if (res?.isConfirmed && res?.value) {
      TryCatch(async () => {
        await dynamicProductFeaturesHandler(type, id, { suspended_reasons: res?.value });
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'This product has been Suspended',
          showConfirmButton: false,
          timer: 1500
        })
        history('/product/list')
      });
    }
  };
  const approvedProduct = async (type, id) => {
    const res = await Swal.fire({
      title: 'Do you want to Approved this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `cancel`,
    })
    if (res?.isConfirmed) {
      TryCatch(async () => {
        await dynamicProductFeaturesHandler(type, id, {});
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'This Product has been Approved',
          showConfirmButton: false,
          timer: 1500
        })

        history('/product/list')
      });
    }
  };
  const ProductIdCheck = async () => {
    try {
      const res = await getSingleProduct(id);
      setProduct(res?.data);
      setValue(res?.data?.long_description);
      let tempRows = [];
      let tempInputList = [];
      res?.data?.variant_stock_price?.forEach(variant => {
        const tmp = {
          color_family: variant?.color_family,
          image: variant.images
        }
        variant.sizes?.forEach(sizeObj => {
          const tmp1 = {
            color_family: variant?.color_family,
            image: variant?.images,
            size: sizeObj?.size,
            pricing: sizeObj?.pricing,
            quantity: sizeObj?.quantity,
            seller_sku: sizeObj?.seller_sku | '',
            free_items: sizeObj?.free_items | ''
          }
          tempRows.push(tmp1);
        })
        tempInputList.push(tmp);
      })
      setRows([tempRows]);
      let tempSize = [];
      res?.data?.variant_stock_price?.forEach(variant => {
        variant.sizes?.forEach(sizeObj => {
          tempSize.push(sizeObj.size);
        })
      })
      var uniq = [...new Set(tempSize)]
      tempSize = [];
      uniq.forEach(uniqueSize => {
        const tmp = {
          title: uniqueSize
        }
        tempSize.push(tmp);
      })
      let tempCate = [];
      res?.data?.category?.forEach(cate => {
        tempCate.push(cate?.value)
      })
      setSelectedCategories(tempCate);
      setSizes(tempSize)
      setInputList(tempInputList)
    } catch (error) {
      ErrorToast("Product Not Found");
      history('/product/list')
    }
  };

  useEffect(() => {
    ProductIdCheck();
  }, []);

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 2 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Formik Form handler */}
            <Formik
              enableReinitialize={true}
              initialValues={{
                product_name: product?.product_name || "",
                category: [] || product?.category,
                video_url: product?.video_url || undefined,
                brand: product?.brand || "",
                short_description: product?.short_description || "",
                long_description: product?.long_description || "",
                variant_stock_price: product?.variant_stock_price || "",
                whats_in_the_box: product?.whats_in_the_box || "",
                warranty_type: product?.warranty_type || undefined,
                warranty_period: product?.warranty_period || undefined,
                warranty_policy: product?.warranty_policy || undefined,
                package_weight: product?.package_weight || "",
                package_dimensions: {
                  length: product?.package_dimensions?.length || "",
                  height: product?.package_dimensions?.height || "",
                  width: product?.package_dimensions?.width || "",
                },
                dangerous_goods: product?.dangerous_goods || undefined
              }}
            >
              {({ values }) => (
                <Form>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Basic Information
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikInput
                      id="product_name"
                      name="product_name"
                      label="Product Name"
                      placeholder="Enter The Product Name"
                    />
                    <Cascade
                      id="category"
                      name="category"
                      label="Category"
                      defaultValue={[...selectedCategories]}
                      categories={categories}
                      disabled={true}
                    />
                    <FormikInput
                      id="video_url"
                      name="video_url"
                      label="Video url"
                    />
                    <FormikInput id="brand" name="brand" label="Brand" fixed={product?.brand} />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Description
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikTextArea
                      id="short_description"
                      name="short_description"
                      label="Short Description"
                    />
                    <FormikRichText
                      id="long_description"
                      name="long_description"
                      label="Long Description"
                      value={value}
                      setValue={setValue}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Variations(Price & Stock)
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    {inputList?.map((list, index) => {
                      let val = [{ title: list?.color_family }]
                      return (
                        <Box sx={{ border: 1, my: 2 }} key={index}>
                          <ComboBox
                            index={index}
                            id="color_family"
                            name="color_family"
                            label="Color Family"
                            textLabel="Select Color"
                            defaultValue={val[0]}
                            options={color}
                            multiple={false}
                            disabled={true}
                            edit={true}
                          />
                          {list?.image && list?.image?.length > 0 && list?.image?.slice(0, 5).map((image, imageIndex) => {
                            return (<div className="show-image">
                              <img height="80px"
                                key={imageIndex}
                                width="80px"
                                className="img-fluid ml-5 m-2"
                                src={image?.url} />
                            </div>)
                          })}

                          <ImageInput
                            className="px-2 pb-2"
                            index={index}
                            disabled
                            id="image"
                            name="image"
                            label="Upload Image(max 5)"
                          />
                        </Box>
                      );
                    })}
                    <ComboBox
                      id="size"
                      name="size"
                      label="Size"
                      textLabel="Select Size"
                      defaultValue={sizes}
                      options={size}
                      multiple={true}
                      edit={true}
                      disabled={true}
                    />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Color Family</TableCell>
                            <TableCell align="left">Size</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Special Price</TableCell>
                            <TableCell align="left">Qty</TableCell>
                            <TableCell align="left">SKU</TableCell>
                            <TableCell align="left">Free items</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows &&
                            rows.map(
                              (row, parentIndex) =>
                                row?.length > 0 &&
                                row?.map((singleRow, index) => {
                                  return (
                                    <>
                                      <TableRow key={index}>
                                        <TableCell align="left">
                                          {singleRow.color_family}
                                        </TableCell>
                                        <TableCell align="left">

                                          {singleRow.size}
                                        </TableCell>
                                        <TableCell align="left">

                                          <input
                                            className="form-control form-control-sm"
                                            name="price"
                                            type="number"
                                            placeholder="Price"
                                            value={singleRow?.pricing?.price || ''}
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">
                                          <input
                                            className="form-control form-control-sm"
                                            name="special_price"
                                            type="number"
                                            placeholder="Special Price"
                                            value={singleRow?.pricing?.special_price || ''}
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">
                                          <input
                                            className="form-control form-control-sm"
                                            name="quantity"
                                            type="number"
                                            placeholder="Quantity"
                                            value={singleRow?.quantity || ''}
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">

                                          <input
                                            className="form-control form-control-sm"
                                            name="seller_sku"
                                            type="text"
                                            placeholder="Seller SKU"
                                            value={singleRow?.seller_sku || ''}
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">
                                          <input
                                            className="form-control form-control-sm"
                                            name="free_items"
                                            type="text"
                                            placeholder="Free Items"
                                            value={singleRow?.free_items || ''}
                                          ></input>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  );
                                })
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Advanced
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikInput
                      id="whats_in_the_box"
                      name="whats_in_the_box"
                      label="Whats in the box"
                      placeholder="maximum length of 255"
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Warranty
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikSelect
                      id="warranty_type"
                      name="warranty_type"
                      label="Warranty Type"
                      disabled
                      options={warranty_type}
                    />
                    <FormikSelect
                      id="warranty_period"
                      name="warranty_period"
                      label="Warranty Period"
                      disabled
                      options={warranty_period}
                    />
                    <FormikInput
                      id="warranty_policy"
                      name="warranty_policy"
                      label="Warranty Policy"
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Packing
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikInput
                      id="package_weight"
                      name="package_weight"
                      label="Package Weight(kg)"
                      placeholder="Weight (kg)"
                      type="number"
                    />
                    <FormikInput
                      id="package_dimensions.length"
                      name="package_dimensions.length"
                      label="Package Length(cm)"
                      placeholder="length (cm)"
                      type="number"
                    />
                    <FormikInput
                      id="package_dimensions.height"
                      name="package_dimensions.height"
                      label="Package Height(cm)"
                      placeholder="height (cm)"
                      type="number"
                    />
                    <FormikInput
                      id="package_dimensions.width"
                      name="package_dimensions.width"
                      label="Package Width(cm)"
                      placeholder="width (cm)"
                      type="number"
                    />
                    <FormikSelect id="dangerous_goods" disabled name="dangerous_goods" label="Dangerous Goods" options={dangerous_goods_options} />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      my: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button color="error" variant="contained" onClick={() => suspendedProduct('suspended', product._id)}>
                      Suspended
                    </Button>
                    <Button type="submit" variant="contained" onClick={() => approvedProduct('approved', product._id)}>
                      Approved
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
