import React from "react";
import dayjs from "dayjs";
import { tourOptionsProps, tourDetailDef } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setRouteSelected, setQuantity } from "@/redux/reducers/routeSelected";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";

const TourOptions = (props: tourOptionsProps) => {
  const { routeData } = props;

  const routeDetail = useAppSelector((state) => state.routeDetail.value);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const changeRouteDate = (_id: string) => {
    dispatch(
      setRouteSelected(
        routeData.find((route) => route._id == _id) as tourDetailDef
      )
    );
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuantity(Number(e.target.value)));
  };

  const handleBookBtn = () => {
    router.push("/tour-purchase");
  };

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
      <div className="my-6">
        <TextField
          type="number"
          fullWidth
          size="small"
          label="Quantity"
          InputProps={{
            startAdornment: <InputAdornment position="start">${routeDetail.price} ×</InputAdornment>
          }}
          inputProps={{ min: 1, max: 20 }}
          onChange={handleChangeQuantity}
          value={routeDetail.quantity}
        />
      </div>
      <div className="flex justify-between items-end my-6">
        <p className="text-xl">Total price</p>
        <p className="text-3xl font-semibold text-yellow-800">
          ${((routeDetail.quantity as number) * routeDetail.price).toFixed(2)}
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
