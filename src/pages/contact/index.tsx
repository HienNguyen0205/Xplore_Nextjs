import React, { useRef } from "react";
import Meta from "@/components/Layout/meta";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { infoCardProps } from "@/utils/types";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import { toast } from "react-toastify";

const FeedbackMessage = () => {

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const resetFeedbackField = () => {
    if(nameRef.current && emailRef.current && contentRef.current){
      nameRef.current.value = ''
      emailRef.current.value = ''
      contentRef.current.value = ''
    }
  }

  const sendFeedback = () => {
    if(nameRef.current && emailRef.current && contentRef.current){
      const name = nameRef.current.value
      const email = emailRef.current.value
      const content = contentRef.current.value
      if(name === '' || email === '' || content === ''){
        toast.error('Please fill all fields')
      }else{
        axios.post('/api/mail/mail-service', {
          name: name,
          email: email,
          content: content,
        }).then(res => {
          if(res.data.status === 'success'){
            resetFeedbackField()
            toast.success(res.data.message)
          }else{
            toast.error(res.data.message)
          }
        })
      }
    }
  }

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
            sx={{ margin: "4px 0", gridArea: '1 / 1 / 2 / 2' }}
            label="Full name"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            type="text"
            inputRef={nameRef}
            required
          />
          <TextField
            sx={{ margin: "4px 0", gridArea: '1 / 2 / 2 / 3' }}
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
            style={{ gridArea: '2 / 1 / 3 / 3', borderWidth: '1px' }}
            placeholder="Enter message"
            minRows={3}
            ref={contentRef}
          />
        </div>
        <Button sx={{ marginTop: '24px' }} variant="contained" fullWidth onClick={sendFeedback}>Submit</Button>
      </div>
    </div>
  );
};

const InfoCard = (props: infoCardProps) => {
  const { title, address, tel, email, imageSrc } = props;

  return (
    <div className="relative">
      <CldImage
        className="h-full"
        width={1800}
        height={855}
        src={imageSrc}
        alt="galleryBg"
      />
      <div className="absolute top-0 left-0 h-full w-full px-10 py-20 text-white">
        <h1 className="text-3xl font-bold underline mb-4">{title}</h1>
        <p className="text-lg my-8">{address}</p>
        <p className="text-lg my-2">Tel: {tel}</p>
        <p className="text-lg my-2">Email: {email}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <Meta
        props={{
          title: "Xplore | Contact",
        }}
      />
      <div className="relative overflow-hidden">
        <CldImage
          className="h-screen bg-cover"
          width={1800}
          height={500}
          src="Background/husbetx1d0ipqosvnksy"
          alt="galleryBg"
        />
        <p className="absolute bottom-[40%] left-1/4 text-white font-bold w-full text-8xl">
          Contact us
        </p>
        <p className="absolute bottom-[30%] left-1/4 text-white font-semibold w-full text-4xl italic">
          Get intouch
        </p>
      </div>
      <div className="grid grid-cols-4 h-[60vh]">
        <InfoCard
          title="Ho Chi Minh City"
          address="2 Hai Trieu, Ben Nghe, Q.1, Tp.Ho Chi Minh"
          tel="+84-123456789"
          email="Xplore_HCM@gmail.com"
          imageSrc="Background/jhkdkhnfelytpcbytjli"
        />
        <iframe
          className="h-full w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5463.568666582782!2d106.70265287461328!3d10.771445139650224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3acf87eaeb%3A0xc969a1975f3be32a!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1693228631032!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <InfoCard
          title="Ha Noi"
          address="36 Hoang Cau, Cho Dua, Cau Giay, Ha Noi"
          tel="+84-987654321"
          email="Xplore_HN@gmail.com"
          imageSrc="Background/rodmcumhbilc1k22idre"
        />
        <iframe
          className="h-full w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.1680165364087!2d105.82271773347567!3d21.019236380028982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb4623fb1d3%3A0x10291e8bc5361d64!2sPeakview%20Tower!5e0!3m2!1sen!2s!4v1693133718443!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="container mx-auto">
        <FeedbackMessage/>
      </div>
    </div>
  );
};

export default Contact;