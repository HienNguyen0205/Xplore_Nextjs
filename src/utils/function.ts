import axios from "axios";
import { visaRegex, cvvCodeRegex } from "@/utils/data";
import { inputPaymentDef, purchaseTourDef } from "./types";
import { toast } from "react-toastify";

const validateInput = (props: inputPaymentDef) => {
  const { cardNumberRef, cvvCodeRef, countryRef, postalCodeRef, setErrorMess } =
    props;
  let flag = true;
  const cardNumber = cardNumberRef.current?.value.trim();
  const cvvCode = cvvCodeRef.current?.value.trim();
  const country = countryRef.current?.value.trim();
  const postalCode = postalCodeRef.current?.value.trim();
  if (!visaRegex.test(cardNumber as string)) {
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
  if (!cvvCodeRegex.test(cvvCode as string)) {
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
  return flag;
};

export const purchaseTour = (props: purchaseTourDef) => {
  const {
    cardNumberRef,
    cvvCodeRef,
    countryRef,
    postalCodeRef,
    paymentMethod,
    userData,
    tourDetail,
    setPaymentStep,
    setErrorMess,
    handleReset
  } = props;

  if (validateInput({cardNumberRef, cvvCodeRef, countryRef, postalCodeRef, setErrorMess})) {
    axios
      .post("/api/payment", {
        cardNumber: cardNumberRef.current?.value.trim(),
        cvvCode: cvvCodeRef.current?.value.trim(),
        country: countryRef.current?.value.trim(),
        postalCode: postalCodeRef.current?.value.trim(),
        paymentMethod: paymentMethod,
        email: userData.email,
        quantity: tourDetail.quantity,
        _id: tourDetail._id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setPaymentStep(2);
          handleReset()
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  }
};