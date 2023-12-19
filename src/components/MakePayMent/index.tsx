import React, { useState, useRef } from "react";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  purchaseMessDef,
  makePaymentProps,
  tourDetailDef,
} from "@/utils/types";
import { country_list, visaRegex, cvvCodeRegex } from "@/utils/data";
import { useToast } from "@/components/Toast";

const MakePayment = (props: makePaymentProps) => {
  const { setPaymentStep, userData, tourData, quantity } = props;

  const tour = tourData.tour as tourDetailDef;

  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState<string>("visa");
  const [expireDate, setExpireDate] = useState<Dayjs | null>(dayjs());
  const [errorMess, setErrorMess] = useState<purchaseMessDef>({
    cardNumber: "",
    cvvCode: "",
    country: "",
    postalCode: "",
  });

  const cardNumberRef = useRef<HTMLInputElement>(null);
  const cvvCodeRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLOptionElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const setErrorMessage = (field: string, message: string) => {
    setErrorMess((errorMess) => ({
      ...errorMess,
      [field]: message,
    }));
  };

  const validateInput = () => {
    let flag = true;
    const cardNumber = cardNumberRef.current?.value.trim();
    const cvvCode = cvvCodeRef.current?.value.trim();
    const country = countryRef.current?.value.trim();
    const postalCode = postalCodeRef.current?.value.trim();
    if (!visaRegex.test(cardNumber as string)) {
      flag = false;
      setErrorMessage('cardNumber', "Please enter a valid card number")
    } else {
      setErrorMessage('cardNumber', "")
    }
    if (!cvvCodeRegex.test(cvvCode as string)) {
      flag = false;
      setErrorMessage('cvvCode', "Please enter a valid cvv code")
    } else {
      setErrorMessage('cvvCode', "")
    }
    if (country === "") {
      flag = false;
      setErrorMessage('country', "Please select a country")
    } else {
      setErrorMessage('country', "")
    }
    if (postalCode === "") {
      flag = false;
      setErrorMessage('postalCode', "Please enter a valid postal code")
    } else {
      setErrorMessage('postalCode', "")
    }
    return flag;
  };

  const purchaseTour = () => {
    if (validateInput()) {
      axios
        .post("/api/payment", {
          cardNumber: cardNumberRef.current?.value.trim(),
          cvvCode: cvvCodeRef.current?.value.trim(),
          country: countryRef.current?.value.trim(),
          postalCode: postalCodeRef.current?.value.trim(),
          paymentMethod: paymentMethod,
          email: userData.email,
          quantity,
          id: tourData._id,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setPaymentStep(2);
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };

  return (
    <div
      className="grid grid-cols-2 gap-8 items-start"
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
            <Image
              src={require("@/assets/images/Icon/visa.svg")}
              alt="visa"
              height={40}
              width={40}
              priority
            />
            <p className="text-center select-none">Visa card</p>
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
            <Image
              src={require("@/assets/images/Icon/paypal.svg")}
              alt="visa"
              height={40}
              width={40}
              priority
            />
            <p className="text-center select-none">Paypal</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-2 mt-4 items-end">
          <TextField
            label="Card Number"
            sx={{ gridArea: "1 / 1 / 2 / 3" }}
            inputRef={cardNumberRef}
            error={errorMess.cardNumber !== ""}
            helperText={errorMess.cardNumber}
          />
          <DatePicker
            label="Expiration Date"
            sx={{ gridArea: "2 / 1 / 3 / 2" }}
            value={expireDate}
            onChange={(newValue) => setExpireDate(newValue)}
          />
          <TextField
            label="CVV Code"
            sx={{ gridArea: "2 / 2 / 3 / 3" }}
            inputRef={cvvCodeRef}
            error={errorMess.cvvCode !== ""}
            helperText={errorMess.cvvCode}
          />
          <FormControl
            sx={{ gridArea: "3 / 1 / 4 / 2" }}
            error={errorMess.country !== ""}
          >
            <InputLabel id="country_label">Country</InputLabel>
            <Select
              labelId="country_label"
              label="Country"
              placeholder="Select a country"
              inputRef={countryRef}
              defaultValue=""
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
            sx={{ gridArea: "3 / 2 / 4 / 3" }}
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
            sx={{
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black !important",
              },
            }}
            label="Subtotal"
            value={(tour.price * quantity).toFixed(2)}
            fullWidth
            disabled
          />
          <TextField
            label="Surcharge"
            defaultValue={"$0"}
            sx={{
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black !important",
              },
            }}
            fullWidth
            disabled
          />
          <p className="text-2xl font-medium text-end my-2">
            <span className="mr-3">Total price:</span>
            <span className="text-blue-500">
              ${((tour.price * quantity) as number).toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "48.5%" }}
            onClick={() => setPaymentStep(0)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ width: "48.5%" }}
            onClick={purchaseTour}
          >
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
