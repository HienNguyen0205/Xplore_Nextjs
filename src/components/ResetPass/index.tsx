import React, { useState, useRef } from "react";
import axios from "axios";
import { animated, useSpring } from "@react-spring/web";
import { TextField, Button } from "@mui/material";
import { passwordRegex } from "@/utils/data";
import { resetPassProps } from "@/utils/types";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";

const AnimatedInput = animated(TextField);

const ResetPass = (props: resetPassProps) => {
  const { email } = props

  const [passMes, setPassMes] = useState<string>("");
  const [confirmPassMes, setConfirmPassMes] = useState<string>("");

  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const toast = useToast()

  const router = useRouter()

  const passwordAnimate = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const checkInput = () => {
    let flag = true;
    const password = passRef.current?.value.trim()
    const confirmPass = confirmPassRef.current?.value.trim()
    if(!passwordRegex.test(password as string)) {
        setPassMes('Minimum eight characters, at least 1 letter and 1 number')
        flag = false
    }else{
        setPassMes('')
    }
    if(password !== confirmPass) {
        setConfirmPassMes('Wrong confirm password')
        flag = false
    }else{
        setConfirmPassMes('')
    }
    return flag
  }

  const setPass = () => {
    if(checkInput()){
      const password = passRef.current?.value.trim()
      axios.post('/api/account/set-password', {
        email,
        password,
      })
      .then(res => {
        if(res.data.code === 0){
          toast.success(res.data.message);
          router.push('/sign-in')
        }
      })
    }
  }

  return (
    <>
      <AnimatedInput
        style={passwordAnimate}
        sx={{ margin: "8px 0" }}
        label="New Password"
        variant="outlined"
        fullWidth
        autoFocus
        type="password"
        inputRef={passRef}
        required
        error={passMes !== ""}
        helperText={passMes}
      />
      <AnimatedInput
        style={passwordAnimate}
        sx={{ margin: "8px 0" }}
        label="Confirm New Password"
        variant="outlined"
        fullWidth
        type="password"
        inputRef={confirmPassRef}
        required
        error={confirmPassMes !== ""}
        helperText={confirmPassMes}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ margin: "0.5rem 0" }}
        size="large"
        onClick={setPass}
      >Confirm</Button>
    </>
  );
};

export default ResetPass;
