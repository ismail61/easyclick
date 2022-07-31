/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardHeader, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "components/Input/FormikInput";
import FormikSelect from "components/Input/FormikSelect";
import { legal_form_options } from "constants/index";
import { ImageInput } from "components";
import { ErrorToast, SetAllDistricts, SetAllPostCodes, SuccessToast, TryCatch } from "utils";
import { getBusinessInfo, updateBusinessInfo } from "services/account/AcountInformation";
import { DocumentUpload, RemoveImage } from "services/image/ImageUpload";
import Loader from "layouts/loader/loader";
import * as address from '@bangladeshi/bangladesh-address';

export default function BusinessInfoCard() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postCodes, setPostCodes] = useState([]);
  const [loader, setLoader] = useState(false);
  const onSubmit = (values) => {
    TryCatch(async () => {
      values.documents = images;
      await updateBusinessInfo(values);
      SuccessToast('Business Account Updated Successful')
    });

  };
  const ImageHandler = async (e, index) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      setLoader(true);
      const res = await DocumentUpload(formData);
      const tmp = {
        url: res?.data?.url,
        public_id: res?.data?.public_id
      }
      setImages([...images, tmp])
      SuccessToast("Image Uploaded");
    } catch (error) {
      ErrorToast("Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };
  const RemoveImageHandle = async (public_id, index) => {
    try {
      setLoader(true);
      await RemoveImage(public_id);
      images?.splice(index, 1);
      SuccessToast("Image Removed");
    } catch (error) {
      ErrorToast("Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };
  const getSellerBusinessInfo = () => {
    TryCatch(async () => {
      const response = await getBusinessInfo();
      setUser(response?.data);
    });
  };
  const setAllDivisions = () => {
    const allDivision = address.allDivision();
    const tmp = [];
    allDivision?.forEach(division => {
      tmp.push({name : division})
    })
    setDivisions(tmp);
  };
  const divisionHandler = (e, setFieldValue) => {
    setDistricts([]);
    setPostCodes([]);
    setFieldValue('city', undefined);
    setFieldValue('post_code', undefined);
    const {value} = e.target;
    const allDis = address?.districtsOf(value?.toLowerCase()); // allDis means All Districts
    const setAllDis = SetAllDistricts(allDis);
    setDistricts(setAllDis);
    setFieldValue('division', value);
  }
  const districtHandler = (e, setFieldValue) => {
    setPostCodes([]);
    setFieldValue('post_code', undefined);
    const {value} = e.target;
    const allUpazila = address?.upazilasOf(value?.toLowerCase()); // allDis means All Upazila
    const setAllUpa = SetAllPostCodes(allUpazila);
    setPostCodes(setAllUpa);
    setFieldValue('city', value);
  }
  const postCodeHandler = (e, setFieldValue) => {
    const {value} = e.target;
    setFieldValue('post_code', value);
  }
  useEffect(() => {
    setAllDivisions();
    getSellerBusinessInfo();
  }, []);
  return (
    <Card>
      <CardHeader title="Business information" />
      <CardContent item md={9} xs={12}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            owner_name: user?.business_information?.owner_name || undefined,
            legal_form: user?.business_information?.legal_form || undefined,
            address1: user?.business_information?.address1 || undefined,
            address2: user?.business_information?.address2 || undefined,
            city_or_town: user?.business_information?.city_or_town || undefined,
            country: user?.business_information?.country || undefined,
            PCN: user?.business_information?.PCN || undefined,
            BRN: user?.business_information?.BRN || undefined,
            documents: user?.business_information?.documents || undefined,
            tin_number: user?.business_information?.tin_number || undefined,
            division: user?.business_information?.division || undefined,
            city: user?.business_information?.city || undefined,
            post_code: user?.business_information?.post_code || undefined,
          }}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form enctype="multipart/form-data">
              <Box
                sx={{
                  backgroundColor: "white",
                  boxShadow: 2,
                  p: 2,
                }}
              >
                <FormikInput
                  id="owner_name"
                  name="owner_name"
                  label="Owner Name"
                  value={values.owner_name}
                />
                <FormikSelect
                  id="legal_form"
                  name="legal_form"
                  label="Legal Name"
                  options={legal_form_options}
                  value={values.legal_form}
                />
                <FormikInput
                  id="address1"
                  name="address1"
                  label="Address1"
                  value={values.address1}
                />
                <FormikInput
                  id="address2"
                  name="address2"
                  label="Address 2"
                  value={values.address2}
                />
                <FormikInput
                  id="city_or_town"
                  name="city_or_town"
                  label="City/Town"
                  value={values.city_or_town}
                />
                <FormikSelect
                  id="country"
                  name="country"
                  label="Country"
                  options={[
                    { name: "Bangladesh" },
                  ]}
                  value={values.country}
                />
                <FormikInput
                  id="PCN"
                  name="PCN"
                  label="Person in Charge Name"
                  value={values.PCN}
                />
                <FormikInput
                  id="BRN"
                  name="BRN"
                  label="Business Registration Number"
                  type="number"
                  value={values.BRN}
                />
                <Typography sx={{ color: "red" }}>
                  Documents means (NID back & front side pic)/(Business Document
                  Pic)
                </Typography>
                {
                  loader ? < Loader /> : null
                }
                <ImageInput
                  ImageHandler={ImageHandler}
                  id="documents"
                  name="documents"
                  label="Documents"
                />
                {images?.slice(0, 5)?.map((image, imageIndex) => {
                  return (<div className="show-image">
                    <img height="80px"
                      key={imageIndex}
                      width="80px"
                      className="img-fluid ml-5 m-2"
                      src={image?.url} />
                    <input className=" delete btn btn-danger" type="button" value="Remove" onClick={() => RemoveImageHandle(image?.public_id, imageIndex)} />
                  </div>)
                })}
                <FormikInput
                  id="tin_number"
                  name="tin_number"
                  label="TIN Number"
                  type="number"
                  value={values.tin_number}
                />
                <FormikSelect
                  id="division"
                  name="division"
                  label="Division"
                  options={divisions}
                  value={values.division}
                  onChange={(e)=> divisionHandler(e,setFieldValue)}
                />
                <FormikSelect
                  id="city"
                  name="city"
                  label="City"
                  options={districts}
                  value={values.city}
                  onChange={(e)=> districtHandler(e,setFieldValue)}
                />
                <FormikSelect
                  id="post_code"
                  name="post_code"
                  label="Post Code"
                  options={postCodes}
                  value={values.post_code}
                  onChange={(e)=> postCodeHandler(e,setFieldValue)}
                />
              </Box>
              <Grid item sm={6} sx={{ my: 2 }}>
                <Box display="flex" justifyContent="flex-end">
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
