import axios from "axios";
import { visaRegex, cvvCodeRegex, nameRegex, telRegex } from "@/utils/data";
import {
  inputPaymentDef,
  purchaseTourDef,
  changeUserDef,
  UserDef,
} from "./types";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { CldUploadWidgetResults } from "next-cloudinary";

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
    tourData,
    quantity,
    setPaymentStep,
    setErrorMess,
  } = props;

  if (
    validateInput({
      cardNumberRef,
      cvvCodeRef,
      countryRef,
      postalCodeRef,
      setErrorMess,
    })
  ) {
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

export const ratingTag = (rating: number): string => {
  if (rating >= 4) return "Excellent";
  else if (rating >= 3) return "Great";
  else return "Good";
};

const checkUserInfo = (props: UserDef) => {
  const { fullName, tel } = props;
  if (!nameRegex.test(fullName) || !telRegex.test(tel as string)) {
    return false;
  } else {
    return true;
  }
};

export const changeUserInfo = (props: changeUserDef) => {
  const { nameRef, telRef, day, month, year } = props;
  const fullName = nameRef.current?.value?.trim() as string;
  const tel = telRef.current?.value?.trim() as string;
  if (checkUserInfo({ fullName, tel })) {
    axios
      .post("/api/user/change-user-info", {
        fullName,
        tel,
        day,
        month,
        year,
      })
      .then((res) => {
        if (res.data.code === 0) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  }
};

export const signUp = (props: UserDef) => {
  const { fullName, email, password } = props;
  axios
    .post("/api/signUp", {
      fullName,
      email,
      password,
    })
    .then((res) => {
      if (res.data.code === 0) {
        toast.success("Register successful!");
        signIn();
      } else {
        toast.error("Register fail!");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const handleUpdateAvatar = async (
  result: CldUploadWidgetResults,
  handleChange: any,
  reRender: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const avatarResult = result?.info as { public_id: string };
  handleChange.mutate({
    avatar: avatarResult.public_id
  });
  reRender(avatarResult.public_id);
};

export const generateRandomCode = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}