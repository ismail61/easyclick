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
import { ErrorToast, SuccessToast, TryCatch } from "utils";
import Cascade from "./Cascade";
import Loader from "layouts/loader/loader";
import { ImageInput } from "components";
import ComboBox from "components/Input/AddProductComboBox";
import { color } from "constants";
import { size } from "constants";
import './demo.css'
import { ImageUpload, RemoveImage } from "services/image/ImageUpload";
import { dangerous_goods_options, warranty_type, warranty_period } from "constants/index";
import { addProduct } from "services/product/ProductService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllNestedCategory } from "services/category/CategoryService";
import { getVendorBrands } from "services/brand/BrandService";

export default function AddProduct() {
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([]);
  const [inputList, setInputList] = useState([{ color_family: "", image: [], others: undefined }]);
  const history = useNavigate();

  const initialValues = {
    product_name: "",
    category: [],
    brand: "",
    short_description: "",
    long_description: "",
    variant_stock_price: "",
    whats_in_the_box: "",
    warranty_type: undefined,
    warranty_period: undefined,
    package_weight: "",
    package_dimensions: {
      length: "",
      height: "",
      width: "",
    },
    dangerous_goods: undefined
  };

  const onSubmit = (values) => {
    values.long_description = value;

    if (rows?.length === 0) return ErrorToast('Please Select Product Variation. Variation means color, size, image, price etc');
    if (rows[0]?.length === 0) return ErrorToast('Please Select Product Variation. Here Variation means size, image, price etc...');

    if (selectedCategory?.color && !rows[0][0]?.color_family) {
      return ErrorToast('Please Select Product Colors.');
    }

    if (selectedCategory?.size && !rows[0][0]?.size) {
      return ErrorToast('Please Select Product Colors & Sizes.');
    }
    let error = 0;

    rows.forEach((nestedRows) => {
      nestedRows.forEach((row) => {
        if (row?.color_family && row?.image?.length === 0) {
          error += 1;
          return ErrorToast(`Please Select at least one Image of ${row?.color_family} Color or Select a Size`);
        } else if (row?.color_family && !row?.pricing?.price) {
          error += 1;
          return ErrorToast(`Please Select Price of ${row?.color_family} Color & ${row?.size} Size`);
        } else if (row?.color_family && !row?.quantity) {
          error += 1;
          return ErrorToast(`Please Select Quantity of ${row?.color_family} Color & ${row?.size} Size`);
        }
      })
    })

    if (error === 0) {
      let final = [];
      rows.forEach((nestedRows, i) => {
        let tempObj = {
          color_family: '',
          others: undefined,
          images: [],
          sizes: []
        }
        nestedRows.forEach((row, index) => {
          if ((nestedRows.length - 1) === index) {
            tempObj.color_family = row.color_family || inputList[i]?.color_family;
            tempObj.others = row.others || inputList[i]?.others;
            tempObj.images = row.image || inputList[i]?.image
          }
          const nestedTemp = {
            size: row.size,
            pricing: row.pricing,
            quantity: row.quantity,
            free_items: row?.free_items || undefined
          }
          tempObj.sizes.push(nestedTemp);
        })
        final.push(tempObj)
      })
      let tempCate = [];
      values?.category?.forEach(cate => {
        const tmp = {
          _id: cate._id,
          value: cate.value
        }
        tempCate.push(tmp)
      })
      TryCatch(async () => {
        values.category = tempCate;
        values.variant_stock_price = final;
        console.log(values)
        await addProduct(values);
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product Added Successful',
          showConfirmButton: false,
          timer: 1500
        })
        history('/product/list');
      });
    }
  };
  const getAllCategory = async () => {
    TryCatch(async () => {
      const response = await getAllNestedCategory();
      if (response?.data) {
        setCategories(response.data);
      }
    });
  };
  const getBrands = async () => {
    TryCatch(async () => {
      const response = await getVendorBrands();
      if (response?.data) {
        setBrands(response.data)
      }
    });
  };
  const onCascadeChange = (selectedOptions, setFieldValue) => {
    const category = selectedOptions[selectedOptions?.length - 1] || selectedOptions[0];
    setSelectedCategory(category);
    setFieldValue("category", [].concat.apply([], selectedOptions));
  };

  const handleAddMoreButton = () => {
    setInputList([...inputList, { color_family: "", others: undefined, image: [], },]);
  };
  const handleRemoveButton = (index) => {
    //[].concat.apply([], full)
    const list = [...inputList];
    if (list[index]["color_family"]) {
      rows?.splice(index, 1);
    }
    list?.splice(index, 1);
    setInputList(list);
  };
  const handleColorInputChange = (value, index) => {
    const list = [...inputList];
    list[index]["color_family"] = value;
    setInputList(list);
    if (rows[index]) {
      rows[index]?.forEach((row) => {
        row.color_family = value;
      });
    } else {
      let temp = [];
      rows &&
        rows[0]?.forEach((row) => {
          const { size } = row;
          const temp1 = {
            color_family: value,
            others: undefined,
            image: [],
            size: size,
            pricing: {
              price: "",
              special_price: "",
            },
            quantity: "",
            free_items: "",
          };
          temp.push(temp1);
        });
      setRows([...rows, temp]);
    }
  };
  const ImageHandler = async (e, index) => {
    const list = [...inputList];
    if (!list[index]?.color_family) return ErrorToast('Please Select Color First')
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      setLoader(true);
      const res = await ImageUpload(formData);
      list[index]["image"].push(res?.data);
      setInputList(list);
      rows[index][0]?.image?.push(res?.data)
      SuccessToast("Image Uploaded");
    } catch (error) {
      ErrorToast("Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };

  const OthersHandler = async (e, index) => {
    const list = [...inputList];
    if (!list[index]?.color_family) return ErrorToast('Please Select Color First')
    list[index]["others"] = e.target.value;
    setInputList(list);
  };


  const RemoveImageHandle = async (image, parentIndex, index) => {
    const list = [...inputList];
    try {
      setLoader(true);
      await RemoveImage(list[parentIndex]?.image[index]?.public_id);
      list[parentIndex]?.image?.splice(index, 1);
      rows[parentIndex][0]?.image?.splice(index, 1)
      setInputList(list);

      SuccessToast("Image Removed");
    } catch (error) {
      ErrorToast("Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };
  const handleSizeInputChange = (value) => {
    let full = [];
    inputList?.forEach((singleInputList, index) => {
      const { color_family, image, others } = singleInputList;
      let temp = [];
      if (color_family) {
        value?.forEach((val, index1) => {
          const { title } = val;
          const temp1 = {
            color_family: color_family,
            others: others,
            image: image,
            size: title,
            pricing: {
              price: rows[index][index1]?.pricing?.price || "",
              special_price: rows[index][index1]?.pricing?.special_price || "",
            },
            quantity: rows[index][index1]?.quantity || "",
            free_items: rows[index][index1]?.free_items || "",
          };
          temp.push(temp1);
        });
      }
      full.push(temp);
    });
    setRows(full);
  };

  const variantChange = (e, parentIndex, index) => {
    const { name, value } = e.target;
    if (name === "price") {
      rows[parentIndex][index].pricing.price = value;
    } else if (name === "special_price") {
      rows[parentIndex][index].pricing.special_price = value;
    } else if (name === "quantity") {
      rows[parentIndex][index].quantity = value;
    } else if (name === "free_items") {
      rows[parentIndex][index].free_items = value;
    }
    setRows([...rows]);
  };

  useEffect(() => {
    getAllCategory();
    getBrands();
  }, []);

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 2 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Formik Form handler */}
            <Formik
              enableReinitialize={true}
              onSubmit={onSubmit}
              initialValues={initialValues}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Box
                    sx={{
                      backgroundColor: "#BA2BAF",
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
                      categories={categories}
                      setFieldValue={setFieldValue}
                      onCascadeChange={onCascadeChange}
                    />
                    <FormikSelect id="brand" name="brand" label="Brand" options={brands} />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#BA2BAF",
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
                      backgroundColor: "#BA2BAF",
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
                    <small>
                      <b>
                        Add variants when the product have different versions,
                        such as color and size.
                      </b>
                      <ul>
                        <li><b>
                          If your variant products does not need color so please choose <span className="text-danger">NONE</span> color
                        </b></li>
                        <li><b>
                          If your variant products does not need size so please choose <span className="text-danger">NONE</span> size
                        </b></li>
                        <li><b>
                          If EsyClick missing your variant product properties please add this in <span className="text-danger">LONG DESCRIPTION</span>
                        </b></li>
                        <li><b>
                          If you choose color & size then you can see <span className="text-danger text-uppercase"> variant price & more information </span> .So at first choose a color or NONE color
                        </b></li>
                        <li><b>
                          First uploaded image consider in product main image
                        </b></li>
                      </ul>
                    </small>
                    {
                      loader ? < Loader /> : null
                    }
                    <Box
                      sx={{
                        backgroundColor: "white",
                        my: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div></div>
                      <Button variant="contained" sx={{ backgroundColor: '#A01521', }} onClick={handleAddMoreButton}>
                        Add More Variant
                      </Button>
                    </Box>
                    {inputList?.map((list, index) => {
                      return (
                        <Box sx={{ border: 1, my: 2 }} key={index}>
                          <ComboBox
                            index={index}
                            id="color_family"
                            name="color_family"
                            label="Color Family"
                            textLabel="Select Color"
                            options={color}
                            multiple={false}
                            handleColorInputChange={handleColorInputChange}
                          />
                          {list?.image && list?.image?.length > 0 && list?.image?.slice(0, 5).map((image, imageIndex) => {
                            return (<div className="show-image">
                              <img height="80px"
                                key={imageIndex}
                                width="80px"
                                className="img-fluid ml-5 m-2"
                                src={image?.url} />
                              <input className=" delete btn btn-danger" type="button" value="Remove" onClick={() => RemoveImageHandle(image, index, imageIndex)} />
                            </div>)
                          })}
                          <ImageInput
                            className="px-2 pb-2"
                            index={index}
                            id="image"
                            name="image"
                            label="Upload Image(max 5)"
                            ImageHandler={ImageHandler}
                          />

                          <div className="px-2 py-1">
                            <FormikInput
                              className="px-2 py-1"
                              id="others"
                              name="others"
                              label="Others"
                              placeholder="Other Property"
                              onChange={(e) => OthersHandler(e, index)}
                            />
                          </div>
                          {(index === (inputList?.length - 1)) && (index !== 0) ? (
                            <>
                              <Box
                                sx={{
                                  backgroundColor: "white",
                                  my: 1,
                                  mx: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div></div>
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => handleRemoveButton(index)}
                                >
                                  Remove This
                                </Button>
                              </Box>
                            </>
                          ) : null}
                        </Box>
                      );
                    })}
                    <ComboBox
                      id="size"
                      name="size"
                      label="Size"
                      textLabel="Select Size"
                      options={size}
                      multiple={true}
                      disabled={inputList[0].color_family ? false : true}
                      handleSizeInputChange={handleSizeInputChange}
                    />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Color Family</TableCell>
                            <TableCell align="left">Size</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Special Price</TableCell>
                            <TableCell align="left">Quantity</TableCell>
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
                                          {" "}
                                          {singleRow.size}
                                        </TableCell>
                                        <TableCell align="left">
                                          {" "}
                                          <input
                                            class="form-control form-control-sm"
                                            name="price"
                                            type="number"
                                            placeholder="Price"
                                            onChange={(e) =>
                                              variantChange(e, parentIndex, index)
                                            }
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">
                                          <input
                                            class="form-control form-control-sm"
                                            name="special_price"
                                            type="number"
                                            placeholder="Special Price"
                                            onChange={(e) =>
                                              variantChange(e, parentIndex, index)
                                            }
                                          ></input>{" "}
                                        </TableCell>
                                        <TableCell align="left">
                                          {" "}
                                          <input
                                            class="form-control form-control-sm"
                                            name="quantity"
                                            type="number"
                                            placeholder="Quantity"
                                            onChange={(e) =>
                                              variantChange(e, parentIndex, index)
                                            }
                                          ></input>
                                        </TableCell>
                                        <TableCell align="left">
                                          <input
                                            class="form-control form-control-sm"
                                            name="free_items"
                                            type="text"
                                            placeholder="Free Items"
                                            onChange={(e) =>
                                              variantChange(e, parentIndex, index)
                                            }
                                          ></input>{" "}
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
                      backgroundColor: "#BA2BAF",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Box
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
                      placeholder="Box Product..."
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#BA2BAF",
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
                      options={warranty_type}
                    />
                    <FormikSelect
                      id="warranty_period"
                      name="warranty_period"
                      label="Warranty Period"
                      options={warranty_period}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#BA2BAF",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    Package
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
                    <FormikSelect id="dangerous_goods" name="dangerous_goods" label="Dangerous Goods" options={dangerous_goods_options} />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      my: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button color="error" variant="contained">
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Submit
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
