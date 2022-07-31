/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Grid,
} from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikSelect from "components/Input/FormikSelect";
import FormikRichText from "components/Input/FormikRichText";
import { Button } from "@mui/material";
import { ErrorToast, FormDataAppend, TryCatch } from "utils";
import { useNavigate } from "react-router-dom";
import { createCategory, getCategories } from "services/category/CategoryService";
import BooleanCheckBox from "components/Input/CheckBox";
import { ImageInput } from "components";
import Loader from "layouts/loader/loader";

export default function AddCategory() {
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false)
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const initialValues = {
    name: undefined,
    parent_id: '',
    color: false,
    size: false,
    description: undefined,
    show_on_home_page: false,
    commission_rate: undefined,
    vat: undefined,
    root: undefined
  };

  const onSubmit = async (values) => {
    values.description = value || undefined;
    if (values?.parent_id) {
      for (let category of categories) {
        if (category.name === values?.parent_id) {
          values.parent_id = category?._id;
          values.root = category?.slug
          break;
        }
      }
    }

    try {
      setLoader(true);
      const formData = new FormData();
      const getFormData = FormDataAppend(formData, values, Object.keys(values));
      getFormData.append('image', image);
      await createCategory(getFormData);
      history('/category/list');
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    }
    finally {
      setLoader(false);
    }

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

  useEffect(() => {
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
              onSubmit={onSubmit}
              initialValues={initialValues}
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
                    <FormikSelect id="parent_id" name="parent_id" label="Parent Category" options={categories} />
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
                      check={values.color}
                      handleBooleanChange={handleBooleanChange}
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
                  {loader ? <Loader />
                    : <Box
                      sx={{
                        backgroundColor: "white",
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
                    </Box>}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
