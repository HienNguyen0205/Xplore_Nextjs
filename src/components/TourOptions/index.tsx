import React, { useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { tourOptionsProps, tourDetailDef } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setRouteSelected,
  setQuantity,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/reducers/routeSelected";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { apiSlice } from "@/redux/reducers/apiSlice";
import TourDetail from "@/pages/tour-detail/64f4895bf88448793f4e6899";

const TourOptions = (props: tourOptionsProps) => {
  const { routeData } = props;

  const routeDetail = useAppSelector((state) => state.routeDetail.value);
  const [trigger, { data }] = apiSlice.endpoints.getTourSlot.useLazyQuery();

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!routeDetail._id) {
      dispatch(setQuantity(0));
      trigger(routeDetail._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDetail._id]);

  const changeRouteDate = (_id: string) => {
    trigger(_id);
    dispatch(
      setRouteSelected(
        routeData.find((route) => route._id == _id) as tourDetailDef
      )
    );
  };

  const handleBookBtn = () => {
    router.push("/tour-purchase");
  };

  const handleChangeQuantity = (type: string) => {
    if(Number(data?.avaiSlot) > Number(routeDetail.quantity)) {
      if(type === '+'){
        dispatch(increaseQuantity())
      }
      if(type === '-'){
        dispatch(decreaseQuantity())
      }
    }
  }

  return (
    <div className="sticky top-[100px] rounded-lg border-2 border-emerald-600 p-4">
      <h1 className="text-[28px] font-medium mb-1 text-blue-800">
        Departure schedule & prices
      </h1>
      <p className="text-xl mt-4 mb-2">Select departure date:</p>
      <div className="grid grid-cols-4 grid-rows-1 gap-2 my-4">
        {routeData.map((route, index) => {
          return (
            <div
              className="flex justify-center py-3 px-1 rounded-lg border-[2px] cursor-pointer"
              key={index}
              style={
                route._id == routeDetail._id
                  ? { borderColor: "rgb(37,99,235)" }
                  : { borderColor: "rgb(0,0,0)" }
              }
              onClick={() => changeRouteDate(route._id)}
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
            {routeDetail.quantity}
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
          ${routeDetail.price}
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
