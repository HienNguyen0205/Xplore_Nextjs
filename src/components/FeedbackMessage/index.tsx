import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { TextField, TextareaAutosize, Button } from '@mui/material';

const FeedbackMessage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const resetFeedbackField = () => {
    if (nameRef.current && emailRef.current && contentRef.current) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      contentRef.current.value = "";
    }
  };

  const sendFeedback = () => {
    if (nameRef.current && emailRef.current && contentRef.current) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const content = contentRef.current.value;
      if (name === "" || email === "" || content === "") {
        toast.error("Please fill all fields");
      } else {
        axios
          .post("/api/mail/mail-service", {
            name: name,
            email: email,
            content: content,
          })
          .then((res) => {
            if (res.data.status === "success") {
              resetFeedbackField();
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
          });
      }
    }
  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-center">Leave us your info</h1>
        <h5 className="text-xl text-center my-3">
          and we will get back to you.
        </h5>
      </div>
      <div className="p-4 rounded-xl border-2 border-violet-700 bg-white">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-2">
          <TextField
            sx={{ margin: "4px 0", gridArea: "1 / 1 / 2 / 2" }}
            label="Full name"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            type="text"
            inputRef={nameRef}
            required
          />
          <TextField
            sx={{ margin: "4px 0", gridArea: "1 / 2 / 2 / 3" }}
            label="Email"
            variant="outlined"
            fullWidth
            placeholder="Enter your email"
            type="email"
            inputRef={emailRef}
            required
          />
          <TextareaAutosize
            className="w-full p-2 rounded border-black"
            style={{ gridArea: "2 / 1 / 3 / 3", borderWidth: "1px" }}
            placeholder="Enter message"
            minRows={3}
            ref={contentRef}
          />
        </div>
        <Button
          sx={{ marginTop: "24px" }}
          variant="contained"
          fullWidth
          onClick={sendFeedback}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FeedbackMessage
