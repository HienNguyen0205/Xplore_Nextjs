import nodemailer from "nodemailer";
import db from "@/utils/database";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { visaRegex, cvvCodeRegex } from "@/utils/data";
import { tourSchedule, bookHistory } from "@/models";

const validateInput = (
  cardNumber: string,
  cvvCode: string,
  country: string,
  postalCode: string
) => {
  let flag = true;
  if (!visaRegex.test(cardNumber)) {
    flag = false;
  }
  if (!cvvCodeRegex.test(cvvCode)) {
    flag = false;
  }
  if (country === "") {
    flag = false;
  }
  if (postalCode === "") {
    flag = false;
  }
  return flag;
};

const Payment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const ObjectId = mongoose.Types.ObjectId

  const {
    cardNumber,
    cvvCode,
    country,
    postalCode,
    paymentMethod,
    email,
    quantity,
    _id,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  if (validateInput(cardNumber, cvvCode, country, postalCode)) {
    try {
      await db();
      const routeDetail = JSON.parse(
        JSON.stringify(await tourSchedule.findById({ _id }))
      );
      const booked = await bookHistory.countDocuments({ _id })
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `${routeDetail.destination} - ${routeDetail.route} - ${dayjs(
          routeDetail.date.from
        ).format("DD-MM-YYYY")}`,
        text: "Book tour successfully!!!",
      };
      const check = booked + quantity
      if (routeDetail.status && check <= routeDetail.slot) {
        await bookHistory.create({
          tourId: new ObjectId(_id),
          tourName: routeDetail.destination + '-' + routeDetail.route,
          email,
          quantity,
          paymentMethod,
          total: (routeDetail.price * quantity).toFixed(2),
          status: 'Success'
        })
        transporter.sendMail(mailOptions);
        res
          .status(200)
          .json({ status: "success", message: 'Purchase complete!' });
      } else {
        await bookHistory.create({
          tourId: new ObjectId(_id),
          tourName: routeDetail.destination + ' - ' + routeDetail.route,
          email,
          quantity,
          paymentMethod,
          total: (routeDetail.price * quantity).toFixed(2),
          status: 'Fail'
        })
        res.status(200).json({ status: "fail", message: "Purchase failed" });
      }
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
};

export default Payment;
