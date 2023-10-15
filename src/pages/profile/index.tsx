import React, { useState, useRef } from "react";
import Meta from "@/components/Layout/meta";
import db from "@/utils/database";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { days, months, years } from "@/utils/data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSideProps } from "next";
import { user } from "@/models";
import { profilePageProps, pageNotFound } from "@/utils/types";
import { changeUserInfo, handleUpdateAvatar } from "@/utils/function";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { changeAvatar } from "@/utils/query";

const Profile = (props: profilePageProps) => {
  const { userDetails } = props;

  const [day, setDay] = useState<string>(
    userDetails.day ? userDetails.day : ""
  );
  const [month, setMonth] = useState<string>(
    userDetails.month ? userDetails.month : ""
  );
  const [year, setYear] = useState<string>(
    userDetails.year ? userDetails.year : ""
  );
  const [avatar, setAvatar] = useState<string | undefined>(userDetails.avatar)

  const updateAvatar = useMutation({
    mutationFn: (avatar: string) => changeAvatar(avatar),
    onSuccess: (data) => {
      if(data.code === 0){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }
  })

  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-slate-100 flex justify-center h-screen">
      <Meta
        props={{
          title: "Xplore | Profile",
        }}
      />
      <div className="container mt-[112px] grid grid-cols-4 gap-8">
        <div
          className="flex flex-col items-center"
          style={{ gridArea: "1 / 1 / 2 / 2" }}
        >
          <CldImage
              className="border-4 border-blue-400 rounded-full aspect-square"
              src={avatar ? avatar : 'User/zz1jef0uotz2qjpelgbh'}
              alt="avatar"
              width={200}
              height={200}
              priority
          />
          <CldUploadWidget
            uploadPreset="ffyupzl6"
            onSuccess={result => handleUpdateAvatar(result, updateAvatar, setAvatar)}
          >
            {({ open }) => {
              const handleOnClick = (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
                open();
              };
              return (
                <Button
                  sx={{ marginTop: "24px" }}
                  color="success"
                  variant="outlined"
                  onClick={handleOnClick}
                >
                  Upload Avatar
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <div style={{ gridArea: "1 / 2 / 2 / 5" }}>
          <h1 className="text-2xl font-semibold">Profile Details</h1>
          <hr className="border-gray-400 mb-6"></hr>
          <div className="grid grid-cols-2 gap-x-8 mb-6">
            <TextField
              variant="outlined"
              label="Fullname"
              value={userDetails.fullName}
              inputRef={nameRef}
            />
          </div>
          <h1 className="text-2xl font-semibold">Contact Details</h1>
          <hr className="border-gray-400 mb-6"></hr>
          <div className="grid grid-cols-2 gap-x-8 mb-6">
            <TextField
              sx={{
                ".Mui-disabled": {
                  color: "black",
                  WebkitTextFillColor: "black !important",
                },
              }}
              variant="outlined"
              label="Email"
              type="email"
              value={userDetails.email}
              disabled
            />
            <TextField
              variant="outlined"
              label="Phone Number"
              type="phone"
              value={userDetails.tel}
              inputRef={telRef}
            />
          </div>
          <h1 className="text-2xl font-semibold">Date of birth</h1>
          <hr className="border-gray-400 mb-6"></hr>
          <div className="grid grid-cols-3 gap-x-8 mb-6">
            <FormControl fullWidth>
              <InputLabel id="day-label">Day</InputLabel>
              <Select
                labelId="day-label"
                label="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {days.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                label="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            sx={{ minWidth: "120px" }}
            variant="contained"
            onClick={() =>
              changeUserInfo({ nameRef, telRef, day, month, year })
            }
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps<
  profilePageProps | pageNotFound
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    await db();
    const userDetails = await user.findOne(
      {
        email: session?.user?.email,
      },
      "-password"
    );
    return {
      props: {
        userDetails: JSON.parse(JSON.stringify(userDetails)),
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
