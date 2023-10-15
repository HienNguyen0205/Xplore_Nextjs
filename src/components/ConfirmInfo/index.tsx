import React from "react";
import dayjs from "dayjs";
import { TextField, Button } from "@mui/material";
import { confirmInfoProps, tourDetailDef } from "@/utils/types";

const ConfirmInfo = (props: confirmInfoProps) => {
  const { userData, tourData, quantity, setPaymentStep} = props;

  const tour = tourData.tour as tourDetailDef

  return (
    <div
      className="grid grid-cols-2 gap-8"
      style={{ animation: "fadeIn .3s ease-in" }}
    >
      <div className="pl-16" style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <h1 className="text-xl font-medium mb-3">Contact information</h1>
        <TextField
          sx={{
            margin: "12px 0",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black!important",
            },
          }}
          label="Full name"
          fullWidth
          size="small"
          disabled
          value={userData.fullName}
        />
        <TextField
          sx={{
            margin: "12px 0",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black!important",
            },
          }}
          label="Email"
          size="small"
          fullWidth
          disabled
          value={userData.email}
        />
        <TextField
          sx={{
            margin: "12px 0",
            ".Mui-disabled": {
              color: "black",
              WebkitTextFillColor: "black!important",
            },
          }}
          label="Phone number"
          size="small"
          fullWidth
          disabled
          value={userData.tel}
        />
      </div>
      <div className="pr-16" style={{ gridArea: "1 / 2 / 2 / 3" }}>
        <h1 className="text-xl font-medium mb-3">Tour Information</h1>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-2">
          <TextField
            sx={{
              gridArea: "1 / 1 / 2 / 3",
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
              },
            }}
            label="Tour name"
            fullWidth
            size="small"
            disabled
            value={tour.destination + " - " + tour.route}
          />
          <TextField
            sx={{
              gridArea: "2 / 1 / 3 / 3",
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
              },
            }}
            label="Departure"
            fullWidth
            size="small"
            disabled
            value={tour.departure}
          />
          <TextField
            sx={{
              gridArea: "3 / 1 / 4 / 3",
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
              },
            }}
            label="Departure date"
            size="small"
            fullWidth
            disabled
            value={dayjs(tourData.date.from).format("DD-MM-YYYY")}
          />
          <TextField
            sx={{
              gridArea: "4 / 1 / 5 / 2",
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
              },
            }}
            label="Quantity"
            size="small"
            fullWidth
            disabled
            value={quantity}
          />
          <TextField
            sx={{
              gridArea: "4 / 2 / 5 / 3",
              margin: "12px 0",
              ".Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
              },
            }}
            label="Tour price"
            size="small"
            fullWidth
            disabled
            value={"$" + tour.price}
          />
        </div>
        <p className="text-2xl font-medium text-end my-2">
          <span className="mr-3">Total price:</span>
          <span className="text-blue-500">
            ${(tour.price * quantity).toFixed(2)}
          </span>
        </p>
        <div className="flex justify-end">
          <Button
            variant="contained"
            sx={{ width: "48.5%" }}
            onClick={() => setPaymentStep(1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInfo;
