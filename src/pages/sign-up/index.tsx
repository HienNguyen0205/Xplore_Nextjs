/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from "react";
import Image from "next/image";
import Meta from "@/components/Layout/meta";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { emailRegex, nameRegex, passwordRegex } from "@/utils/data";
import { useToast } from "@/components/Toast";
import { UserDef } from "@/utils/types";

const SignUp = (): JSX.Element => {

  const [errorMess, setErrorMess] = useState({
    nameMess: '',
    emailMess: '',
    passMess: '',
    confirmPassMess: '',
  })

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const toast = useToast()

  const signUp = (props: UserDef) => {
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

  const returnHome = () => {
    router.push("/");
  };

  const resetErrMes = () => {
    setErrorMess({
      nameMess: '',
      emailMess: '',
      passMess: '',
      confirmPassMess: '',
    })
  };

  const handleErrMess = (field: string, content: string) => {
    setErrorMess(prev => ({
      ...prev,
      [field]: content,
    }))
  }

  const validate = () => {
    const fullName = nameRef.current?.value.trim() as string;
    const email = emailRef.current?.value.trim().toLowerCase() as string;
    const password = passRef.current?.value.trim() as string;
    const confirmPass = confirmPassRef.current?.value.trim();
    let flag = true;
    resetErrMes();
    if (fullName === "") {
      flag = false;
      handleErrMess('nameMess', "Please enter your name")
    } else if (fullName.length > 32) {
      flag = false;
      handleErrMess('nameMess', "Invalid name")
    }
    if (email === "") {
      flag = false;
      handleErrMess('emailMess', "Please enter your email")
    } else if (!emailRegex.test(email as string)) {
      flag = false;
      handleErrMess('emailMess', "Invalid email")
    }
    if (password === "") {
      flag = false;
      handleErrMess('passMess', "Please enter your password")
    } else if (!passwordRegex.test(password as string)) {
      flag = false;
      handleErrMess('passMess', "Minimum eight characters, at least 1 letter and 1 number")
    }
    if (confirmPass === "") {
      flag = false;
      handleErrMess('confirmPassMess', "Please enter confirm password")
    } else if (confirmPass !== password) {
      flag = false;
      handleErrMess('confirmPassMess', "Wrong confirm password")
    }
    if (flag) {
      signUp({fullName, email, password})
    }
  };

  return (
    <>
      <Meta
        props={{
          title: "Xplore | Sign up",
          robots: "noindex",
        }}
      />
      <div className="w-100 h-screen flex flex-col justify-around items-center relative overflow-hidden">
      <div className="night_bg">
          <div className="night">
            {Array.from({length: 20}, (val,index) => index).map(item => <div key={item} className="shooting_star"></div>)}
          </div>
        </div>
        <Image
          className="w-[160px] cursor-pointer"
          src={require("@/assets/images/Logo/XPLORE_logo.png")}
          alt=""
          priority
          onClick={returnHome}
        />
        <div className="p-5 bg-gray-50 opacity-90 w-[440px] rounded-md">
          <h1 className="text-4xl font-bold text-center mb-5 mt-3">Register</h1>
          <TextField
            sx={{ margin: "8px 0" }}
            label="Full name"
            variant="outlined"
            fullWidth
            autoFocus
            placeholder="Enter your name"
            type="text"
            inputRef={nameRef}
            required
            error={errorMess.nameMess !== ""}
            helperText={errorMess.nameMess}
          />
          <TextField
            sx={{ margin: "8px 0" }}
            label="Email"
            variant="outlined"
            fullWidth
            autoFocus
            placeholder="Enter your email"
            type="email"
            inputRef={emailRef}
            required
            error={errorMess.emailMess !== ""}
            helperText={errorMess.emailMess}
          />
          <TextField
            sx={{ margin: "8px 0" }}
            label="Password"
            variant="outlined"
            fullWidth
            placeholder="Enter your password"
            type="password"
            inputRef={passRef}
            required
            error={errorMess.passMess !== ""}
            helperText={errorMess.passMess}
          />
          <TextField
            sx={{ margin: "8px 0" }}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            inputRef={confirmPassRef}
            required
            error={errorMess.confirmPassMess !== ""}
            helperText={errorMess.confirmPassMess}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ margin: "0.5rem 0" }}
            size="large"
            onClick={() => validate()}
          >
            Register
          </Button>
          <p className="mt-3 text-right">
            Already have an account?
            <span
              className="ml-1 text-sky-500 hover:text-sky-800 cursor-pointer"
              onClick={() => signIn()}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
