/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Grid,
} from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast } from "utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "layouts/loader/loader";
import { createBrand } from "services/brand/BrandService";


export default function AddBrand() {
  const [loader, setLoader] = useState(false)
  const history = useNavigate();

  const initialValues = {
    name: undefined,
  };

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      await createBrand(values);
      history('/brand/list');
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    }
    finally {
      setLoader(false);
    }

  };
  return (
    <>
      {
        loader ? <Loader className="mt-5" />
          :
          <Box sx={{ p: { xs: 2 }, mt: 5, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* Formik Form handler */}
                <Formik
                  enableReinitialize={true}
                  onSubmit={onSubmit}
                  initialValues={initialValues}
                >
                  {() => (
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
                          label="Brand Name"
                          placeholder="Enter The Brand Name"
                        />
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          my: 3,
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
      }
    </>
  );
}
