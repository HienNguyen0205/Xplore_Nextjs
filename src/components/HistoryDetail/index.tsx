import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import {
  animated,
  config,
  useSpring,
} from "@react-spring/web";
import { historyDetailProps } from "@/utils/types";
import { TextField } from "@mui/material";
import { useGetTourByIdQuery } from "@/redux/reducers/apiSlice";

const HistoryDetail = (props: historyDetailProps) => {
  const { open, setOpen, tour } = props;

  const { data } = useGetTourByIdQuery(tour?.tourId as string);

  const modelStyle = useSpring({
    from: {
      opacity: 0,
      width: "20%",
    },
    to: {
      opacity: 1,
      width: "40%",
    },
    config: config.molasses,
  });

  const inputStyle = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.molasses,
  });

  const TextFieldAnimate = animated(TextField);

  return (
    <animated.div
      style={modelStyle}
      className="absolute inset-0 m-auto z-20 h-fit bg-slate-300 rounded-lg shadow-1 p-3"
    >
      <div className="flex justify-end mb-3">
        <Image
          className="cursor-pointer"
          src={require("@/assets/images/Icon/cross.svg")}
          alt=""
          height={32}
          width={32}
          onClick={() => setOpen(false)}
        />
      </div>
      <h1 className="text-3xl font-bold text-center mt-3 mb-6">
        History Detail
      </h1>
      <div className="grid grid-cols-2 grid-rows-3 gap-2">
        <TextFieldAnimate
          style={inputStyle}
          sx={{
            gridArea: "1 / 1 / 2 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Tour name"
          value={tour?.tourName}
          disabled
        />
        <TextFieldAnimate
            style={inputStyle}
          sx={{
            gridArea: "2 / 1 / 3 / 2",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Departure date"
          value={dayjs(data?.tourDetail?.date.from).format("DD/MM/YYYY")}
          disabled
        />
        <TextFieldAnimate
        style={inputStyle}
          sx={{
            gridArea: "2 / 2 / 3 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Return date"
          value={dayjs(data?.tourDetail?.date.to).format("DD/MM/YYYY")}
          disabled
        />
        <TextFieldAnimate
        style={inputStyle}
          sx={{
            gridArea: "3 / 1 / 4 / 2",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Quantity"
          value={tour?.quantity}
          disabled
        />
        <TextFieldAnimate
        style={inputStyle}
          sx={{
            gridArea: "3 / 2 / 4 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Departure"
          value={data?.tourDetail?.departure}
          disabled
        />
      </div>
    </animated.div>
  );
};

export default HistoryDetail;
