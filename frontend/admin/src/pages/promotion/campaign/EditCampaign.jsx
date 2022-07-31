/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast, SuccessToast, TryCatch } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import DateRangePicker from "components/Date/DateRangePicker";
import {
  editCampaign,
  getSingleCampaign,
} from "services/promotions/Promotion.Service";
import FormikRichText from "components/Input/FormikRichText";
import Loader from "layouts/loader/loader";
import { ImageInput } from "components";

export default function EditCampaign() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const onSubmit = async (values) => {
    values.description = value;
    try {
      setLoader(true);
      await editCampaign(id, values);
      SuccessToast("Campaign Updated Successful");
      history("/campaign/list");
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    }
    finally {
      setLoader(false);
    }
  };
  const CampaignIdCheck = async () => {
    try {
      const res = await getSingleCampaign(id);
      setCampaign(res?.data);
      setValue(res?.data?.description);
    } catch (error) {
      ErrorToast("Campaign Not Found");
      history("/campaign/list");
    }
  };
  const StartDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("campaign_start_time", dateString);
  };
  const EndDateAndTimeHandler = (date, dateString, setFieldValue) => {
    setFieldValue("campaign_end_time", dateString);
  };
  const EndDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("registration_end_time", dateString);
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0])
  }
  useEffect(() => {
    CampaignIdCheck();
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
              initialValues={{
                name: campaign?.name || undefined,
                title: campaign?.title || undefined,
                campaign_start_time: campaign?.campaign_start_time || undefined,
                campaign_end_time: campaign?.campaign_end_time || undefined,
                registration_end_time:
                  campaign?.registration_end_time || undefined,
                discount: campaign?.discount || undefined,
                description: campaign?.description || undefined,
              }}
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
                      label="Campaign Name"
                      placeholder="Use letters and numbers. e.g. EID2022"
                    />
                    <FormikInput
                      id="title"
                      name="title"
                      label="Campaign Title"
                      placeholder="Campaign Title Here"
                    />
                    <ImageInput
                      id="image"
                      name="image"
                      label="Cheque Copy"
                      ImageHandler={ImageHandler}
                    />
                    <img height="50px" width="50px" className="img-fluid ml-5" src={campaign?.image?.url ? campaign?.image?.url  : ''} alt="Campaign Image" />
                    <DateRangePicker
                      id="campaign_start_time"
                      name="campaign_start_time"
                      label="Campaign Start Time"
                      placeholder="Start Date"
                      edit={true}
                      defaultValue={values?.campaign_start_time}
                      time={true}
                      setFieldValue={setFieldValue}
                      StartDateHandler={StartDateHandler}
                    />
                    <DateRangePicker
                      id="campaign_end_time"
                      name="campaign_end_time"
                      label="Campaign End Time"
                      placeholder="End Date"
                      edit={true}
                      defaultValue={values?.campaign_end_time}
                      time={true}
                      EndDateAndTimeHandler={EndDateAndTimeHandler}
                      setFieldValue={setFieldValue}
                    />
                    
                    <DateRangePicker
                      id="registration_end_time"
                      name="registration_end_time"
                      label="Registration End Time"
                      edit={true}
                      defaultValue={values?.registration_end_time}
                      placeholder="End Date"
                      EndDateHandler={EndDateHandler}
                      setFieldValue={setFieldValue}
                    />
                    <FormikInput
                      id="discount"
                      name="discount"
                      label="Discount(%)"
                      placeholder="Discount Percentage"
                      type="number"
                    />
                    <FormikRichText
                      id="description"
                      name="description"
                      label="Description"
                      value={value}
                      setValue={setValue}
                    />
                  </Box>
                  <Grid item sm={6} sx={{ my: 2 }}>
                    {loader ? (
                      <Loader />
                    ) : (
                      <Box display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
