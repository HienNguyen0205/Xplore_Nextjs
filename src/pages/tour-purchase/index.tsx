import React, { useState, useRef } from "react";
import Meta from "@/components/Layout/meta";
import dayjs, { Dayjs } from "dayjs";
import db from "@/utils/database";
import {
  Box,
  Stepper,
  StepLabel,
  Step,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useAppSelector } from "@/hooks";
import { user } from "@/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import {
  tourPurchaseProps,
  pageNotFound,
  purchaseMessDef,
} from "@/utils/types";
import { DatePicker } from "@mui/x-date-pickers";
import { steps, country_list, visaRegex, cvvCodeRegex } from "@/utils/data";

const TourPurchase = (props: tourPurchaseProps) => {
  const { userData } = props;

  const [paymentStep, setPaymentStep] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("visa");
  const [expireDate, setExpireDate] = useState<Dayjs | null>(dayjs());
  const [errorMess, setErrorMess] = useState<purchaseMessDef>({
    cardNumber: "",
    cvvCode: "",
    country: "",
    postalCode: "",
  });

  const tourDetail = useAppSelector((state) => state.routeDetail.value);

  const cardNumberRef = useRef<HTMLInputElement>();
  const cvvCodeRef = useRef<HTMLInputElement>();
  const countryRef = useRef<HTMLOptionElement>();
  const postalCodeRef = useRef<HTMLInputElement>();

  const validateInput = () => {
    let flag = true;
    if (
      cardNumberRef.current &&
      cvvCodeRef.current &&
      countryRef.current &&
      postalCodeRef.current
    ) {
      const cardNumber = cardNumberRef.current.value.trim();
      const cvvCode = cvvCodeRef.current.value.trim();
      const country = countryRef.current.value.trim();
      const postalCode = postalCodeRef.current.value.trim();
      if (!visaRegex.test(cardNumber)) {
        flag = false;
        setErrorMess((errorMess) => ({
          ...errorMess,
          cardNumber: "Please enter a valid card number",
        }));
      } else {
        setErrorMess((errorMess) => ({
          ...errorMess,
          cardNumber: "",
        }));
      }
      if (!cvvCodeRegex.test(cvvCode)) {
        flag = false;
        setErrorMess((errorMess) => ({
          ...errorMess,
          cvvCode: "Please enter a valid cvv code",
        }));
      } else {
        setErrorMess((errorMess) => ({
          ...errorMess,
          cvvCode: "",
        }));
      }
      if (country === "") {
        flag = false;
        setErrorMess((errorMess) => ({
          ...errorMess,
          country: "Please select a country",
        }));
      } else {
        setErrorMess((errorMess) => ({
          ...errorMess,
          country: "",
        }));
      }
      if (postalCode === "") {
        flag = false;
        setErrorMess((errorMess) => ({
          ...errorMess,
          postalCode: "Please enter a valid postal code",
        }));
      } else {
        setErrorMess((errorMess) => ({
          ...errorMess,
          postalCode: "",
        }));
      }
    }
    return flag;
  };

  return (
    <div className="bg-slate-200 flex justify-center">
      <Meta
        props={{
          title: "Xplore | Purchase",
          robots: "none",
        }}
      />
      <div className="container mt-[100px] mb-8">
        <div className="h-[80vh] min-h-[560px] border-2 rounded-lg border-blue-600 py-8 px-16">
          <Box sx={{ width: "100%", marginBottom: "32px" }}>
            <Stepper activeStep={paymentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {paymentStep === 0 && (
            <div
              className="grid grid-cols-2 gap-8"
              style={{ animation: "fadeIn .3s ease-in" }}
            >
              <div className="pl-16" style={{ gridArea: "1 / 1 / 2 / 2" }}>
                <h1 className="text-xl font-medium mb-3">
                  Contact information
                </h1>
                <TextField
                  sx={{
                    margin: "12px 0",
                    ".Mui-disabled": {
                      color: "black",
                      WebkitTextFillColor: "black",
                    },
                  }}
                  label="Full name"
                  fullWidth
                  size="small"
                  disabled
                  value={userData.fullName}
                />
                <TextField
                  sx={{
                    margin: "12px 0",
                    ".Mui-disabled": {
                      color: "black",
                      WebkitTextFillColor: "black",
                    },
                  }}
                  label="Email"
                  size="small"
                  fullWidth
                  disabled
                  value={userData.email}
                />
                <TextField
                  sx={{
                    margin: "12px 0",
                    ".Mui-disabled": {
                      color: "black",
                      WebkitTextFillColor: "black",
                    },
                  }}
                  label="Phone number"
                  size="small"
                  fullWidth
                  disabled
                  value={userData.tel}
                />
              </div>
              <div className="pr-16" style={{ gridArea: "1 / 2 / 2 / 3" }}>
                <h1 className="text-xl font-medium mb-3">Tour Information</h1>
                <div className="grid grid-cols-2 grid-rows-4 gap-x-2">
                  <TextField
                    sx={{
                      gridArea: "1 / 1 / 2 / 3",
                      margin: "12px 0",
                      ".Mui-disabled": {
                        color: "black",
                        WebkitTextFillColor: "black",
                      },
                    }}
                    label="Tour name"
                    fullWidth
                    size="small"
                    disabled
                    value={tourDetail.destination + " - " + tourDetail.route}
                  />
                  <TextField
                    sx={{
                      gridArea: "2 / 1 / 3 / 3",
                      margin: "12px 0",
                      ".Mui-disabled": {
                        color: "black",
                        WebkitTextFillColor: "black",
                      },
                    }}
                    label="Departure"
                    fullWidth
                    size="small"
                    disabled
                    value={tourDetail.departure}
                  />
                  <TextField
                    sx={{
                      gridArea: "3 / 1 / 4 / 3",
                      margin: "12px 0",
                      ".Mui-disabled": {
                        color: "black",
                        WebkitTextFillColor: "black",
                      },
                    }}
                    label="Departure date"
                    size="small"
                    fullWidth
                    disabled
                    value={dayjs(tourDetail.date.from).format("DD-MM-YYYY")}
                  />
                  <TextField
                    sx={{
                      gridArea: "4 / 1 / 5 / 2",
                      margin: "12px 0",
                      ".Mui-disabled": {
                        color: "black",
                        WebkitTextFillColor: "black",
                      },
                    }}
                    label="Quantity"
                    size="small"
                    fullWidth
                    disabled
                    value={tourDetail.quantity}
                  />
                  <TextField
                    sx={{
                      gridArea: "4 / 2 / 5 / 3",
                      margin: "12px 0",
                      ".Mui-disabled": {
                        color: "black",
                        WebkitTextFillColor: "black",
                      },
                    }}
                    label="Tour price"
                    size="small"
                    fullWidth
                    disabled
                    value={"$" + tourDetail.price}
                  />
                </div>
                <p className="text-2xl font-medium text-end my-2">
                  <span className="mr-3">Total price:</span>
                  <span className="text-blue-500">
                    $
                    {(
                      tourDetail.price * (tourDetail.quantity as number)
                    ).toFixed(2)}
                  </span>
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="contained"
                    sx={{ width: "48.5%" }}
                    onClick={() => setPaymentStep(1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {paymentStep === 1 && (
            <div
              className="grid grid-cols-2 gap-8"
              style={{ animation: "fadeIn .3s ease-in" }}
            >
              <div className="pl-16" style={{ gridArea: "1 / 1 / 2 / 2" }}>
                <h1 className="text-xl font-medium mb-3">Payment details</h1>
                <div className="flex justify-center items-center">
                  <div
                    className="min-w-[120px] flex flex-col items-center border-2 rounded-lg py-1 px-2 mx-3 cursor-pointer"
                    style={
                      paymentMethod === "visa"
                        ? { borderColor: "rgb(59 130 246)" }
                        : { borderColor: "rgb(107 114 128)" }
                    }
                    onClick={() => setPaymentMethod("visa")}
                  >
                    <svg
                      version="1.0"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="40px"
                      height="40px"
                      viewBox="0 0 64 64"
                      enable-background="new 0 0 64 64"
                      xmlSpace="preserve"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="2"
                            y="20"
                            fill="#506C7F"
                            width="60"
                            height="8"
                          ></rect>{" "}
                          <g>
                            {" "}
                            <path
                              fill="#B4CCB9"
                              d="M2,52c0,1.104,0.896,2,2,2h56c1.104,0,2-0.896,2-2V30H2V52z"
                            ></path>{" "}
                            <path
                              fill="#B4CCB9"
                              d="M60,10H4c-1.104,0-2,0.895-2,2v6h60v-6C62,10.895,61.104,10,60,10z"
                            ></path>{" "}
                          </g>{" "}
                          <path
                            fill="#394240"
                            d="M60,8H4c-2.211,0-4,1.789-4,4v40c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V12C64,9.789,62.211,8,60,8z M62,52c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V30h60V52z M62,28H2v-8h60V28z M62,18H2v-6c0-1.105,0.896-2,2-2h56 c1.104,0,2,0.895,2,2V18z"
                          ></path>{" "}
                          <path
                            fill="#394240"
                            d="M11,40h14c0.553,0,1-0.447,1-1s-0.447-1-1-1H11c-0.553,0-1,0.447-1,1S10.447,40,11,40z"
                          ></path>{" "}
                          <path
                            fill="#394240"
                            d="M29,40h6c0.553,0,1-0.447,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1S28.447,40,29,40z"
                          ></path>{" "}
                          <path
                            fill="#394240"
                            d="M11,46h10c0.553,0,1-0.447,1-1s-0.447-1-1-1H11c-0.553,0-1,0.447-1,1S10.447,46,11,46z"
                          ></path>{" "}
                          <path
                            fill="#394240"
                            d="M45,46h8c0.553,0,1-0.447,1-1v-6c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v6C44,45.553,44.447,46,45,46 z M46,40h6v4h-6V40z"
                          ></path>{" "}
                          <rect
                            x="46"
                            y="40"
                            fill="#F9EBB2"
                            width="6"
                            height="4"
                          ></rect>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <p className="text-center">Visa card</p>
                  </div>
                  <div
                    className="min-w-[120px] flex flex-col items-center border-2 rounded-lg py-1 px-2 mx-3 cursor-pointer"
                    style={
                      paymentMethod === "paypal"
                        ? { borderColor: "rgb(59 130 246)" }
                        : { borderColor: "rgb(107 114 128)" }
                    }
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="PayPal"
                      role="img"
                      viewBox="0 0 512 512"
                      width="40px"
                      height="40px"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <rect
                          width="512"
                          height="512"
                          rx="15%"
                          fill="#ffffff"
                        ></rect>
                        <path
                          fill="#002c8a"
                          d="M377 184.8L180.7 399h-72c-5 0-9-5-8-10l48-304c1-7 7-12 14-12h122c84 3 107 46 92 112z"
                        ></path>
                        <path
                          fill="#009be1"
                          d="M380.2 165c30 16 37 46 27 86-13 59-52 84-109 85l-16 1c-6 0-10 4-11 10l-13 79c-1 7-7 12-14 12h-60c-5 0-9-5-8-10l22-143c1-5 182-120 182-120z"
                        ></path>
                        <path
                          fill="#001f6b"
                          d="M197 292l20-127a14 14 0 0 1 13-11h96c23 0 40 4 54 11-5 44-26 115-128 117h-44c-5 0-10 4-11 10z"
                        ></path>
                      </g>
                    </svg>
                    <p className="text-center">Paypal</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-4 items-end">
                  <TextField
                    label="Card Number"
                    sx={{ gridArea: "1 / 1 / 2 / 4" }}
                    inputRef={cardNumberRef}
                    error={errorMess.cardNumber !== ""}
                    helperText={errorMess.cardNumber}
                  />
                  <DatePicker
                    label="Expiration Date"
                    sx={{ gridArea: "2 / 1 / 3 / 3" }}
                    value={expireDate}
                    onChange={(newValue) => setExpireDate(newValue)}
                  />
                  <TextField
                    label="CVV Code"
                    sx={{ gridArea: "2 / 3 / 3 / 4" }}
                    inputRef={cvvCodeRef}
                    error={errorMess.cvvCode !== ""}
                    helperText={errorMess.cvvCode}
                  />
                  <FormControl
                    sx={{ gridArea: "3 / 1 / 4 / 3" }}
                    error={errorMess.country !== ""}
                  >
                    <InputLabel id="country_label">Country</InputLabel>
                    <Select
                      labelId="country_label"
                      label="Country"
                      placeholder="Select a country"
                      inputRef={countryRef}
                    >
                      {country_list.map((country, index) => (
                        <MenuItem key={index} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errorMess.country}</FormHelperText>
                  </FormControl>
                  <TextField
                    label="Postal Code"
                    sx={{ gridArea: "3 / 3 / 4 / 4" }}
                    inputRef={postalCodeRef}
                    error={errorMess.postalCode !== ""}
                    helperText={errorMess.postalCode}
                  />
                </div>
              </div>
              <div
                className="flex flex-col justify-between items-center pr-16"
                style={{ gridArea: "1 / 2 / 2 / 3" }}
              >
                <div className="w-full">
                  <h1 className="text-xl font-medium mb-3">Order Summary</h1>
                  <TextField
                    sx={{ margin: "12px 0" }}
                    label="Subtotal"
                    value={(
                      tourDetail.price * (tourDetail.quantity as number)
                    ).toFixed(2)}
                    fullWidth
                  />
                  <TextField
                    label="Surcharge"
                    defaultValue={"$0"}
                    sx={{ margin: "12px 0" }}
                    fullWidth
                  />
                  <p className="text-2xl font-medium text-end my-2">
                    <span className="mr-3">Total price:</span>
                    <span className="text-blue-500">
                      $
                      {(
                        tourDetail.price * (tourDetail.quantity as number)
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outlined"
                    color='error'
                    sx={{ width: "48.5%" }}
                    onClick={() => setPaymentStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: "48.5%" }}
                    onClick={() => setPaymentStep(2)}
                  >
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPurchase;

export const getServerSideProps: GetServerSideProps<
  tourPurchaseProps | pageNotFound
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    await db();
    const userData = await user.findOne(
      { email: session?.user?.email },
      "email tel fullName"
    );
    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)),
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
