'use client'
import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@/components";

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

const FindTour = (): JSX.Element => {
  const [destination, setDestination] = useState<string | null>(null);
  const [departure, setDeparture] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(null);

  return (
    <div className="bg-white rounded-2xl w-full h-32 flex justify-around items-center mb-16">
      <Autocomplete
        disablePortal
        options={desOptions}
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          label="Select check-in day"
          value={checkIn}
          onChange={(date) => {
            setCheckIn(date);
          }}
        />
      </LocalizationProvider>
      <Button
        content="Search"
        bgColor="#1a1aff"
        width="136px"
        height="56px"
        textColor="white"
      />
    </div>
  );
};

export default FindTour;