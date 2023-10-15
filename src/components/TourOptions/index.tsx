import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { tourOptionsProps } from "@/utils/types";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getTourSlot } from "@/utils/query";

const TourOptions = (props: tourOptionsProps) => {
  const { routeData } = props;

  const [schedule, setSchedule] = useState(routeData.schedule[0])
  const [quantity, setQuantity] = useState<number>(1)

  const { data } = useQuery({
    queryKey: ['slot', schedule._id],
    queryFn: () => getTourSlot(schedule._id)
  })

  const router = useRouter();

  const handleBookBtn = () => {
    router.push(`/tour-purchase?id=${schedule._id}&quantity=${quantity}`)
  };

  const handleChangeQuantity = (type: string) => {
    if(type === '+' && (data.avaiSlot > quantity)){
      setQuantity(prev => prev + 1)
    }
    if(type === '-'){
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="sticky top-[100px] rounded-lg border-2 border-emerald-600 p-4">
      <h1 className="text-[28px] font-medium mb-1 text-blue-800">
        Departure schedule & prices
      </h1>
      <p className="text-xl mt-4 mb-2">Select departure date:</p>
      <div className="grid grid-cols-4 grid-rows-1 gap-2 my-4">
        {routeData.schedule.map((route, index) => {
          return (
            <div
              className="flex justify-center py-3 px-1 rounded-lg border-[2px] cursor-pointer"
              key={index}
              style={
                route._id == schedule._id
                  ? { borderColor: "rgb(37,99,235)" }
                  : { borderColor: "rgb(0,0,0)" }
              }
              onClick={() => setSchedule(routeData.schedule[index])}
            >
              {dayjs(route.date.from).format("DD/MM")}
            </div>
          );
        })}
      </div>
      <div className="my-6 flex items-center">
        <p className="flex-1 text-xl">Quantity</p>
        <div className="flex justify-end items-center flex-1 my-3">
          <Image
            className="cursor-pointer"
            src={require("@/assets/images/Icon/minus.svg")}
            alt="minus"
            height={28}
            width={28}
            onClick={() => handleChangeQuantity('-')}
          />
          <div
            style={{ borderColor: "rgb(37,99,235)" }}
            className="flex justify-center items-center border-2 min-w-[40px] min-h-[48px] rounded text-lg mx-6"
          >
            {quantity}
          </div>
          <Image
            className="cursor-pointer"
            src={require("@/assets/images/Icon/plus.svg")}
            alt="plus"
            height={28}
            width={28}
            onClick={() => handleChangeQuantity('+')}
          />
        </div>
      </div>
      <div className="flex justify-between items-center my-6">
        <p className="text-xl">Tour price</p>
        <p className="text-3xl font-semibold text-yellow-800">
          ${routeData.price}
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          sx={{ width: "50%" }}
          variant="contained"
          onClick={handleBookBtn}
        >
          Book
        </Button>
      </div>
    </div>
  );
};

export default TourOptions;
