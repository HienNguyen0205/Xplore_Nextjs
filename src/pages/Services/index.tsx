import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, TourList } from "../../components";
import { useAppSelector } from "../../hooks";
import MainLayout from "../../Layouts/MainLayout";
import styles from '../../styles/Sevices.module.scss'
import 'dayjs/locale/en-gb';

const desOptions = [
  "Austria",
  "Czech",
  "England",
  "Hungary",
  "Italy",
  "Wales",
  "Scotland",
  "Slovenia",
  "Switzerland",
  "Spain",
  "Turkey",
];
const numOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const SearchBar = (): JSX.Element => {
  const [destination, setDestination] = useState<string | null>(null);
  const [person, setPerson] = useState<string | null>(null);
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
        options={numOptions}
        sx={{ flex: 1, mx: 2 }}
        value={person}
        onChange={(e, value) => setPerson(value)}
        renderInput={(params) => <TextField {...params} label="Total Person" />}
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

const Services = (): JSX.Element => {
  const tourList = useAppSelector((state) => state.tour.value);

  return (
    <MainLayout>
      <div className={styles.search_container}>
        <div className="container flex flex-col justify-center">
          <h1 className="text-shadow mb-12">
            Discover and Enjoy Your New Places and Exprience.
          </h1>
          <SearchBar />
        </div>
      </div>
      <div
        className="w-full flex-col bg-white flex items-center pb-5 pt-10"
        style={{ backgroundColor: "#f7f3fb" }}
      >
        <TourList data={tourList} pagination option />
      </div>
    </MainLayout>
  );
};

export default Services;
