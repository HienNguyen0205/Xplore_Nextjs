import React, { useState, useRef } from "react";
import Meta from "@/components/Layout/meta";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { TextField, Button } from "@mui/material";
import { passwordRegex } from "@/utils/data";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [passMess, setPassMess] = useState<string>("");
  const [confirmPassMess, setConfirmPassMess] = useState<string>("");

  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  const checkInput = () => {
    let flag = true;
    const password = passRef.current?.value.trim();
    const confirmPass = confirmPassRef.current?.value.trim();
    if (!passwordRegex.test(password as string)) {
      setPassMess("Minimum eight characters, at least 1 letter and 1 number");
      flag = false;
    } else {
      setPassMess("");
    }
    if (password !== confirmPass) {
      setConfirmPassMess("Wrong confirm password");
      flag = false;
    } else {
      setConfirmPassMess("");
    }
    return flag;
  };

  const setPass = () => {
    if(checkInput()){
      const password = passRef.current?.value.trim()
      axios.post('/api/account/change-password', {
        password,
      })
      .then(res => {
        if(res.data.code === 0){
          router.push('/')
          toast.success(res.data.message)
        }
        if(res.data.code === 1){
          toast.error(res.data.message)
        }
      })
    }
  }

  return (
    <>
      <Meta
        props={{
          title: "Xplore | Sign in",
          robots: "noindex",
        }}
      />
      <div className="w-100 h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="night_bg">
          <div className="night">
            {Array.from({ length: 20 }, (val, index) => index).map((item) => (
              <div key={item} className="shooting_star"></div>
            ))}
          </div>
        </div>
        <Image
          className="w-[160px] cursor-pointer mb-6"
          src={require("@/assets/images/Logo/XPLORE_logo.png")}
          alt=""
          priority
          onClick={returnHome}
        />
        <div className="p-5 bg-gray-50 opacity-90 w-[440px] rounded-md mt-6">
          <h1 className="text-4xl font-bold text-center mt-3">
            Change Password
          </h1>
          <TextField
            sx={{ margin: "8px 0" }}
            label="Password"
            variant="outlined"
            fullWidth
            autoFocus
            type="password"
            inputRef={passRef}
            required
            error={passMess !== ""}
            helperText={passMess}
          />
          <TextField
            sx={{ margin: "8px 0" }}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            inputRef={confirmPassRef}
            required
            error={confirmPassMess !== ""}
            helperText={confirmPassMess}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ margin: "0.5rem 0" }}
            size="large"
            onClick={setPass}
          >
            Confirm
          </Button>
          <p className="my-2 text-right">Return <Link
              href="/"
              className="text-red-500 hover:text-red-800"
            >
              Home
            </Link></p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
