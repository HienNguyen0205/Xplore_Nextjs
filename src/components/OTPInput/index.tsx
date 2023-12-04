import React, { useRef } from "react";
import axios from "axios";
import { animated, useTrail } from "@react-spring/web";
import { TextField } from "@mui/material";
import { OTPInputProps } from "@/utils/types";
import { useToast } from "@/components/Toast";

const AnimatedInput = animated(TextField);

const OTPInput = (props: OTPInputProps) => {
  const { step, setStep, email, sendOTP } = props;
  const otpRef = useRef<Array<HTMLInputElement>>([]);

  const toast = useToast()

  const otpInputAnimate = useTrail(6, {
    from: {
      opacity: 0,
      scale: 0.75,
    },
    opacity: step === 2 ? 1 : 0,
    scale: step === 2 ? 1 : 0.75,
  });

  const handleOTPInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (index < 5 && e.target.value !== '') {
      otpRef.current[index + 1]?.focus();
    }
    if (index === 5) {
      const code = otpRef.current.reduce(
        (prev, curr) => prev + curr?.value,
        ""
      );
      axios
        .post("/api/account/check-otp", {
          email,
          code,
        })
        .then((res) => {
          if (res.data.code === 0) {
            setStep(3);
          } else {
            otpRef.current.forEach((item) => {
              if (item) item.value = "";
            });
            otpRef.current[0]?.focus()
            toast.error("Wrong code");
          }
        });
    }
  };

  const handleDelete = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.code === "Backspace") {
      if(index !== 0){
        otpRef.current[index].value = ''
        otpRef.current[index - 1]?.focus()
      }
    }
  };

  return (
    <div>
      <div className="flex justify-around items-center my-2 gap-x-2">
        {otpInputAnimate.map((item, index) => (
          <AnimatedInput
            key={index}
            style={item}
            inputRef={(ref) => (otpRef.current[index] = ref)}
            variant="outlined"
            inputMode="numeric"
            onChange={(e) => handleOTPInput(e, index)}
            onKeyDown={(e) => handleDelete(e, index)}
            autoFocus={index === 0}
            inputProps={{
              maxLength: 1,
              style: { paddingRight: "25px", paddingLeft: "25px" },
            }}
          />
        ))}
      </div>
      <p className="text-lg text-end mt-4">
        If you didn&apos;t receive a code
        <span className="text-orange-500 cursor-pointer" onClick={sendOTP}>
          {" "}
          Resend
        </span>
      </p>
    </div>
  );
};

export default OTPInput;
