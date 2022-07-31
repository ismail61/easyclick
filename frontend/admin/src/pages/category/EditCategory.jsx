/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikSelect from "components/Input/FormikSelect";
import FormikRichText from "components/Input/FormikRichText";
import { Button } from "@mui/material";
import { ErrorToast, FormDataAppend, SuccessToast, TryCatch } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategories, getSingleCategory, updateCategory } from "services/category/CategoryService";
import BooleanCheckBox from "components/Input/CheckBox";
import { ImageInput } from "components";


export default function EditCategory() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const onSubmit = (values) => {
    values.description = value || undefined;
    if (values?.parent_id) {
      for (let category of categories) {
        if (category.name === values?.parent_id) {
          values.parent_id = category?._id;
          break;
        }
      }
    }
    TryCatch(async () => {
      const formData = new FormData();
      const getFormData = FormDataAppend(formData, values, Object.keys(values));
      if (image) getFormData.append('image', image);
      await updateCategory(id, getFormData);
      SuccessToast("Updated Successful");
      history('/category/list');
    });
  };
  const getAllCategory = async () => {
    TryCatch(async () => {
      const response = await getCategories('all');
      setCategories(response?.data);
    });
  };

  const handleBooleanChange = (event, setFieldValue, type) => {
    setFieldValue(type, event.target.checked)
  };
  const ImageHandler = (e) => {
    setImage(e.target.files[0])
  }
  const CategoryIdCheck = async () => {
    try {
      const res = await getSingleCategory(id);
      setCategory(res?.data);
      setValue(res?.data?.description);
    } catch (error) {
      ErrorToast("Category Not Found");
      history('/category/list');
    }
  }

  useEffect(() => {
    CategoryIdCheck(id)
    getAllCategory();
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
                name: category?.name || undefined,
                parent_id: category?.parent_id?.name || '',
                color: category?.color || false,
                size: category?.size || false,
                description: category?.description || undefined,
                show_on_home_page: category?.show_on_home_page || false,
                commission_rate: category?.commission_rate || undefined,
                vat: category?.vat || undefined
              }}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikInput
                      id="name"
                      name="name"
                      label="Category Name"
                      placeholder="Enter The Category Name"
                    />
                    <FormikSelect id="parent_id" name="parent_id" label="Parent Category" options={categories} value={values.parent_id} disabled/>
                    <FormikRichText
                      id="description"
                      name="description"
                      label="Description"
                      value={value}
                      setValue={setValue}
                    />
                    <ImageInput
                      className="py-2"
                      index={0}
                      id="image"
                      name="image"
                      label="Image"
                      ImageHandler={ImageHandler}
                    />
                    {
                      category?.image?.url ?
                        <img height="50px" width="50px" className="img-fluid ml-5 my-2" src={category?.image ? category?.image?.url : ''} /> : null
                    }
                    <FormikInput
                      id="commission_rate"
                      name="commission_rate"
                      label="Commission Rate(%)"
                      type="number"
                    />
                    <FormikInput
                      id="vat"
                      name="vat"
                      label="Vat(%)"
                      type="number"
                    />
                    <BooleanCheckBox
                      id="color"
                      name="color"
                      label="Need Color"
                      handleBooleanChange={handleBooleanChange}
                      check={values.color}
                      setFieldValue={setFieldValue}
                      type="color"
                    />
                    <BooleanCheckBox
                      id="size"
                      name="size"
                      label="Need Size"
                      check={values.size}
                      handleBooleanChange={handleBooleanChange}
                      setFieldValue={setFieldValue}
                      type="size"
                    />
                    <BooleanCheckBox
                      id="show_on_home_page"
                      name="show_on_home_page"
                      label="Show Home Page"
                      check={values.show_on_home_page}
                      handleBooleanChange={handleBooleanChange}
                      setFieldValue={setFieldValue}
                      type="show_on_home_page"
                    />
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
