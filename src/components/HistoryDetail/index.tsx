import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { animated, config, useSpring } from "@react-spring/web";
import { historyDetailProps } from "@/utils/types";
import { TextField } from "@mui/material";

const HistoryDetail = (props: historyDetailProps) => {
  const { setOpen, history } = props;

  const modelStyle = useSpring({
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
      className="absolute inset-0 m-auto w-[clamp(40%,360px,60%)] z-20 h-fit bg-slate-300 rounded-lg shadow-1 p-3"
    >
      <div className="flex justify-end mb-3">
        <Image
          className="cursor-pointer"
          src={require("@/assets/images/Icon/cross.svg")}
          alt="close-btn"
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
          style={modelStyle}
          sx={{
            gridArea: "1 / 1 / 2 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black !important",
            },
          }}
          label="Tour name"
          value={history?.tour.destination + ' | ' + history?.tour.route}
          disabled
        />
        <TextFieldAnimate
          style={modelStyle}
          sx={{
            gridArea: "2 / 1 / 3 / 2",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Departure date"
          value={dayjs(history?.schedule.date.from).format("DD/MM/YYYY")}
          disabled
        />
        <TextFieldAnimate
          style={modelStyle}
          sx={{
            gridArea: "2 / 2 / 3 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Return date"
          value={dayjs(history?.schedule.date.to).format("DD/MM/YYYY")}
          disabled
        />
        <TextFieldAnimate
          style={modelStyle}
          sx={{
            gridArea: "3 / 1 / 4 / 2",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Quantity"
          value={history?.quantity}
          disabled
        />
        <TextFieldAnimate
          style={modelStyle}
          sx={{
            gridArea: "3 / 2 / 4 / 3",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black",
            },
          }}
          label="Departure"
          value={history?.tour.departure}
          disabled
        />
      </div>
    </animated.div>
  );
};

export default HistoryDetail;
