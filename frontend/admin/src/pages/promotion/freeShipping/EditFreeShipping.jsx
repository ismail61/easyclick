/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikSelect from "components/Input/FormikSelect";
import { Button } from "@mui/material";
import { ErrorToast, SuccessToast, TryCatch } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import DateRangePicker from "components/Date/DateRangePicker";
import { editFreeShipping, getSingleFreeShipping } from "services/promotions/Promotion.Service";

export default function EditFreeShipping() {
  const { id } = useParams();
  const [freeShipping, setFreeShipping] = useState("");
  const history = useNavigate();

  const onSubmit = (values) => {
    TryCatch(async () => {
      await editFreeShipping(id, values);
      SuccessToast("Promotion Updated Successful");
      history('/voucher/list')
    });
  };
  const FreeShippingIdCheck = async () => {
    try {
      const res = await getSingleFreeShipping(id);
      setFreeShipping(res?.data);
    } catch (error) {
      ErrorToast("Voucher Not Found");
      history("/free-shipping/list");
    }
  };
  const StartDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("start_from", dateString);
  };
  const EndDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("end_time", dateString);
  };

  useEffect(() => {
    FreeShippingIdCheck();
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
                name: freeShipping?.name || undefined,
                period_type: freeShipping?.period_type || undefined,
                specific_period: {
                  start_date: freeShipping?.specific_period?.start_date || undefined,
                  end_date: freeShipping?.specific_period?.end_date || undefined,
                },
                condition_type: freeShipping?.condition_type || undefined,
                quantity: freeShipping?.quantity || undefined,
                amount: freeShipping?.amount || undefined,
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
                    <FormikInput id="name" name="name" label="Promotion Name" fixed={values.name} />
                    <FormikSelect
                      id="period_type"
                      name="period_type"
                      label="Period Type"
                      options={[
                        { name: "LONG_TERM" },
                        { name: "SPECIFIC_PERIOD" },
                      ]}
                    />
                    {freeShipping.period_type && freeShipping.period_type === "SPECIFIC_PERIOD" ? (
                      <>
                        <DateRangePicker
                          id="specific_period.start_date"
                          name="specific_period.start_date"
                          label="Start Date"
                          edit={true}
                          defaultValue={values?.specific_period?.start_date?.slice(0, 10)}
                          placeholder="Start Date"
                          setFieldValue={setFieldValue}
                          StartDateHandler={StartDateHandler}
                        />
                        <DateRangePicker
                          id="specific_period.end_date"
                          name="specific_period.end_date"
                          label="End Date"
                          placeholder="End Date"
                          edit={true}
                          defaultValue={values?.specific_period?.end_date?.slice(0, 10)}
                          EndDateHandler={EndDateHandler}
                          setFieldValue={setFieldValue}
                        />
                      </>
                    ) : null}
                    <FormikSelect
                      id="condition_type"
                      name="condition_type"
                      label="Condition Type"
                      options={[
                        { name: "NO_CONDITION" },
                        { name: "SHOP_ITEM_QUANTITY_ABOVE" },
                        { name: "SHOP_ORDER_AMOUNT_ABOVE" },
                      ]}
                    />

                    {freeShipping?.condition_type &&
                      freeShipping?.condition_type === "SHOP_ITEM_QUANTITY_ABOVE" ? (
                      <FormikInput
                        id="quantity"
                        name="quantity"
                        label="Item Quantity Above"
                        type="number"
                      />
                    ) : null}
                    {freeShipping?.condition_type &&
                      freeShipping?.condition_type === "SHOP_ORDER_AMOUNT_ABOVE" ? (
                      <FormikInput
                        id="amount"
                        name="amount"
                        label="Order Amount above"
                        type="number"
                        placeholder="BDT"
                      />
                    ) : null}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
