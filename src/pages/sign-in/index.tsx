/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Meta from "@/components/Layout/meta";
import { TextField, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "@/utils/data";

const SignIn = (): JSX.Element => {
  const [emailMes, setEmailMes] = useState<String>("");
  const [passMes, setPassMes] = useState<String>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  const validate = () => {
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      let flag = true;
      if (emailMes !== "") {
        setEmailMes("");
      }
      if (passMes !== "") {
        setPassMes("");
      }
      if (email === "") {
        flag = false;
        setEmailMes("Please enter your email");
      } else if (!emailRegex.test(email)) {
        flag = false;
        setEmailMes("Please enter a valid email");
      }
      if (password === "") {
        flag = false;
        setPassMes("Please enter your password");
      } else if (!passwordRegex.test(password)) {
        flag = false;
        setPassMes("Wrong password");
      }
      if (flag) {
        signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        })
          .then((res) => {
            if (res?.ok) {
              toast.success("Log in successful!", { delay: 2000 });
              router.push("/");
            } else {
              toast.error("Log in failed!", { delay: 2000 });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  return (
    <>
      <Meta
        props={{
          title: "Xplore | Sign in",
          robots: "noindex",
        }}
      />
      <div className="w-100 h-screen flex flex-col justify-around items-center relative">
        <div className="night_bg">
          <div className="night">
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
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
          <h1 className="text-4xl font-bold text-center mb-5 mt-3">Login</h1>
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
            error={emailMes !== ""}
            helperText={emailMes}
          />
          <TextField
            sx={{ margin: "8px 0" }}
            label="Password"
            variant="outlined"
            fullWidth
            placeholder="Enter your password"
            type="password"
            inputRef={passwordRef}
            required
            error={passMes !== ""}
            helperText={passMes}
          />
          <p className="my-2 text-right">
            <Link
              href="/forgot-password"
              className="text-red-500 hover:text-red-800"
            >
              Forgot your password?
            </Link>
          </p>
          <Button
            fullWidth
            variant="contained"
            sx={{ margin: "0.5rem 0" }}
            size="large"
            onClick={() => validate()}
          >
            Log In
          </Button>
          <div className="mt-4 mb-5  flex items-center">
            <hr className="flex-1 border-t-2 border-gray-800"></hr>
            <p className="text-black mx-2 text-lg">Or</p>
            <hr className="flex-1 border-t-2 border-gray-800"></hr>
          </div>
          <div className="flex justify-between content-center">
            <Button
              sx={{ width: "26%", padding: ".5rem 0", borderColor: "#888" }}
              variant="outlined"
            >
              <Image src={require('@/assets/images/Icon/google.svg')} alt="google" height={32} width={32} priority/>
            </Button>
            <Button
              sx={{ width: "26%", padding: ".5rem 0", borderColor: "#888" }}
              variant="outlined"
              onClick={() => signIn("facebook")}
            >
              <Image src={require('@/assets/images/Icon/facebook.svg')} alt="google" height={32} width={32} priority/>
            </Button>
            <Button
              sx={{ width: "26%", padding: ".5rem 0", borderColor: "#888" }}
              variant="outlined"
            >
              <Image src={require('@/assets/images/Icon/apple.svg')} alt="google" height={32} width={32} priority/>
            </Button>
          </div>
          <p className="mt-3 text-right">
            Don't have an account?
            <Link
              className="ml-1 text-sky-500 hover:text-sky-800"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
