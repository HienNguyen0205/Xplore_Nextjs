'use client'
import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@/components";
import { useRouter } from "next/router";
import { findTourProps } from "@/utils/types";

const desOptions = [
  "Australia",
  "America",
  "China",
  "Japan",
  "Korean",
  "Thailand",
  "Cambodia",
  "Singapore",
  "United Arab Emirates",
].sort((a, b) => a.localeCompare(b));

const departureOptions = ["Ho Chi Minh"];

const FindTour = ({ bg, defaultValue }: findTourProps): JSX.Element => {

  console.log(defaultValue);

  const [destination, setDestination] = useState<string | null>(
    defaultValue ? defaultValue.destination : null
  );
  const [departure, setDeparture] = useState<string | null>(
    defaultValue ? defaultValue.departure : null
  );
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(
    defaultValue ? dayjs(defaultValue.checkIn) : null
  );

  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/tour?departure=${departure}&destination=${destination}&checkIn=${checkIn}`
    );
  };

  return (
    <div
      className={`${
        bg === "light" ? "bg-white" : "bg-slate-300"
      } rounded-2xl w-full h-32 flex justify-around items-center mb-3`}
    >
      <Autocomplete
        disablePortal
        options={desOptions}
        style={
          bg === "dark"
            ? {
                backgroundColor: "#ffffff14 !important",
                color: "white !important",
              }
            : {}
        }
        sx={{ flex: 1, mx: 2 }}
        value={destination}
        onChange={(e, value) => setDestination(value)}
        renderInput={(params) => <TextField {...params} label="Destination" />}
      />
      <Autocomplete
        disablePortal
        options={departureOptions}
        sx={{ flex: 1, mx: 2 }}
        value={departure}
        onChange={(e, value) => setDeparture(value)}
        renderInput={(params) => <TextField {...params} label="Departure" />}
      />
      <DatePicker
        label="Select check-in day"
        value={checkIn}
        onChange={(date) => {
          setCheckIn(date);
        }}
        disablePast
      />
      <Button
        content="Search"
        bgColor="#1a1aff"
        width="136px"
        height="56px"
        textColor="white"
        onClick={handleClick}
      />
    </div>
  );
};

export default FindTour;