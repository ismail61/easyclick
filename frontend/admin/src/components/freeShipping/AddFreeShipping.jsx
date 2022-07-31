import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardHeader, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "components/Input/FormikInput";
import FormikSelect from "components/Input/FormikSelect";
import { useState } from "react";
import DateRangePicker from "components/Date/DateRangePicker";
import { SuccessToast, TryCatch } from "utils";
import { useNavigate } from "react-router-dom";
import { addFreeShipping } from "services/promotions/Promotion.Service";

export default function AddFreeShipping() {
  const [periodType, setPeriodType] = useState("");
  const [conditionType, setConditionType] = useState("");
  const history = useNavigate();
  const initialValues = {
    name: undefined,
    period_type: undefined,
    specific_period: {
      start_date: undefined,
      end_date: undefined,
    },
    condition_type: undefined,
    quantity: undefined,
    amount: undefined,
  };
  const onSubmit = (values) => {
    TryCatch(async () => {
        await addFreeShipping(values);
        SuccessToast("New Promotion Added");
        history('/')
    });
  };
  const StartDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("specific_period.start_date", dateString);
  };
  const EndDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("specific_period.end_date", dateString);
  };
  return (
    <Card>
      <CardHeader title="Free Shipping Promotion Details" />
      <CardContent item md={9} xs={12}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({ values, setFieldValue }) => (
            <Form>
              <Box
                sx={{
                  backgroundColor: "white",
                  boxShadow: 2,
                  p: 2,
                }}
              >
                <FormikInput id="name" name="name" label="Promotion Name"/>
                <span
                  onClick={(e) => setPeriodType(e.target.value || periodType)}
                >
                  <FormikSelect
                    id="period_type"
                    name="period_type"
                    label="Period Type"
                    options={[
                      { name: "LONG_TERM" },
                      { name: "SPECIFIC_PERIOD" },
                    ]}
                  />
                </span>
                {periodType && periodType === "SPECIFIC_PERIOD" ? (
                  <>
                    <DateRangePicker
                      id="specific_period.start_date"
                      name="specific_period.start_date"
                      label="Start Date"
                      placeholder="Start Date"
                      setFieldValue={setFieldValue}
                      StartDateHandler={StartDateHandler}
                    />
                    <DateRangePicker
                      id="specific_period.end_date"
                      name="specific_period.end_date"
                      label="End Date"
                      placeholder="End Date"
                      EndDateHandler={EndDateHandler}
                      setFieldValue={setFieldValue}
                    />
                  </>
                ) : null}
                <span
                  onClick={(e) =>
                    setConditionType(e.target.value || conditionType)
                  }
                >
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
                </span>

                {conditionType &&
                conditionType === "SHOP_ITEM_QUANTITY_ABOVE" ? (
                  <FormikInput
                    id="quantity"
                    name="quantity"
                    label="Item Quantity Above"
                    type="number"
                  />
                ) : null}
                {conditionType &&
                conditionType === "SHOP_ORDER_AMOUNT_ABOVE" ? (
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
      </CardContent>
    </Card>
  );
}
