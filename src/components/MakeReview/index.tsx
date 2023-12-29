import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { animated, useSpring } from "@react-spring/web";
import { Rating, Button } from "@mui/material";
import { makeReviewProps } from "@/utils/types";
import { useToast } from "@/components/Toast";

const MakeReview = (props: makeReviewProps) => {
  const { setOpen, tourId } = props;

  const [rating, setRating] = useState<number | null>(1)
  const [comment, setComment] = useState<string>('')

  const toast = useToast()

  const modelStyle = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(18px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    config: {
      duration: 300
    },
  });

  const handleClose = () => {
    setOpen(false)
  }

  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    setRating(value)
  }

  const handleSubmit = () => {
    axios.post('/api/tour/rating-tour', {
      tourId,
      rating,
      comment,
    }).then(res => {
      if(res.data.code === 0){
        setOpen(false)
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    })
  }

  return (
    <animated.div
      style={modelStyle}
      className="absolute inset-0 m-auto w-[clamp(40%,360px,60%)] z-20 h-fit bg-white rounded-lg shadow-1 p-3"
    >
      <div className="flex justify-end mb-3">
        <Image
          className="cursor-pointer"
          src={require("@/assets/images/Icon/cross.svg")}
          alt="close-btn"
          height={32}
          width={32}
          onClick={handleClose}
        />
      </div>
      <h1 className="text-3xl font-bold text-center mt-3 mb-6">
        Write A Review
      </h1>
      <div className="flex flex-col items-center my-5">
        <h3 className="text-2xl font-medium mb-2">Rating</h3>
        <Rating value={rating} onChange={handleRatingChange} precision={1} size="large"/>
      </div>
      <textarea className="w-full p-2 rounded outline-2 outline" style={{ resize: 'none' }} rows={5} placeholder="Write your feeling about the tour" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
      <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
    </animated.div>
  );
}

export default MakeReview;