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
import { createCategory, getCategories, getSingleCategory } from "services/category/CategoryService";
import BooleanCheckBox from "components/Input/CheckBox";
import { ImageInput } from "components";
import { getSingleBanner, getSingleBrand, updateBanner } from "services/banner/BannerService";
import { imageHover } from "components/hoverImage/HoverImage";


export default function EditBanner() {
  const { id } = useParams();
  const [banner, setBanner] = useState("");
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const onSubmit = (values) => {
    TryCatch(async () => {
      const formData = new FormData();
      const getFormData = FormDataAppend(formData, values, Object.keys(values));
      if(image) getFormData.append('image', image);
      await updateBanner(id, getFormData);
      SuccessToast("Updated Successful");
      history('/banner/list');
    });
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0])
  }
  const BannerIdCheck = async () => {
    try {
      const res = await getSingleBanner(id);
      setBanner(res?.data);
    } catch (error) {
      ErrorToast("Brand Not Found");
      history('/banner/list');
    }
  }
  const handleBooleanChange = (event, setFieldValue, type) => {
    setFieldValue(type, event.target.checked)
  };

  useEffect(() => {
    BannerIdCheck(id)
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
                redirect_url: banner?.redirect_url || undefined,
                show_on_home_page: banner?.show_on_home_page || false
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
                    <ImageInput
                      className="py-2"
                      index={0}
                      id="image"
                      name="image"
                      label="Image"
                      ImageHandler={ImageHandler}
                    />
                    <img height="100px" width="100px" onClick={() => imageHover(banner.image?.url)} style={{ cursor: 'pointer' }} className="img-fluid ml-5 my-2" src={banner?.image ? banner?.image?.url : ''} alt="Profile" />
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
