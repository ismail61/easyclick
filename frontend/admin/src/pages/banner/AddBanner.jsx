/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Grid,
} from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast, FormDataAppend } from "utils";
import { useNavigate } from "react-router-dom";
import Loader from "layouts/loader/loader";
import { ImageInput } from "components";
import { createBrand } from "services/banner/BannerService";
import BooleanCheckBox from "components/Input/CheckBox";


export default function AddBanner() {
  const [loader, setLoader] = useState(false)
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const initialValues = {
    redirect_url: undefined,
    show_on_home_page: false
  };

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      const formData = new FormData();
      const getFormData = FormDataAppend(formData, values, Object.keys(values));
      getFormData.append('image', image);
      await createBrand(getFormData);
      history('/banner/list');
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    }
    finally {
      setLoader(false);
    }
  };
  const handleBooleanChange = (event, setFieldValue, type) => {
    setFieldValue(type, event.target.checked)
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <>
      <Box sx={{ p: { xs: 2 }, mt: 5, p: 2 }}>
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
                    <ImageInput
                      className="py-2"
                      index={0}
                      id="image"
                      name="image"
                      label="Image"
                      ImageHandler={ImageHandler}
                    />
                    <FormikInput
                      id="redirect_url"
                      name="redirect_url"
                      label="Redirect Url"
                      placeholder="Enter The Banner Redirect Url"
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
