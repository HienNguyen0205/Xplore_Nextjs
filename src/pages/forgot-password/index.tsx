import React, { useState } from "react";
import Meta from "@/components/Layout/meta";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { TextField, Button } from "@mui/material";
import { emailRegex } from "@/utils/data";
const OTPInput = dynamic(() => import('@/components/OTPInput'))
const ResetPass = dynamic(() => import('@/components/ResetPass'))

const ForgotPassWord = () => {
  
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('')
  const [emailMes, setEmailMes] = useState<string>("");

  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  const sendOTP = () => {
    if (emailRegex.test(email)) {
      axios
        .post("/api/account/forgot-pass", {
          email,
        })
        .then((res) => {
          if (res.data.code === 0) {
            setStep(2);
            setEmailMes("");
          } else {
            setEmailMes("Wrong email");
          }
        });
    } else {
      setEmailMes("Wrong email");
    }
  };

  return (
    <>
      <Meta
        props={{
          title: "Xplore | Forget Password",
          robots: "noindex",
        }}
      />
      <div className="w-100 h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="night_bg">
          <div className="night">
            {Array.from({length: 20}, (val,index) => index).map(item => <div key={item} className="shooting_star"></div>)}
          </div>
        </div>
        <Image
          className="w-[160px] cursor-pointer mb-6"
          src={require("@/assets/images/Logo/XPLORE_logo.png")}
          alt=""
          priority
          onClick={returnHome}
        />
        <div className="p-5 bg-gray-50 opacity-90 w-[440px] min-h-[320px] rounded-md mt-6">
          <h1 className="text-4xl font-bold text-center my-3">
            Forgot Password?
          </h1>
          <p className="text-center text-lg mb-3 opacity-80">
            We&apos;ll send you an email with code that allows you to set new
            password
          </p>
          {step === 1 && <>
            <TextField
              sx={{ margin: "8px 0" }}
              label="Email"
              variant="outlined"
              fullWidth
              autoFocus
              placeholder="Enter your email"
              type="email"
              required
              onChange={val => setEmail(val.target.value)}
              error={emailMes !== ""}
              helperText={emailMes}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ margin: "0.5rem 0" }}
              size="large"
              onClick={sendOTP}
            >
              Confirm
            </Button>
          </>}
          {step === 2 && <OTPInput step={step} setStep={setStep} email={email} sendOTP={sendOTP}/>}
          {step === 3 && <ResetPass email={email}/>}
          <p className="mt-3 text-right">
            Go back to
            <Link
              className="ml-1 text-sky-500 hover:text-sky-800"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassWord;
