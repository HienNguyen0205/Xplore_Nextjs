import nodemailer from "nodemailer";
import db from "@/utils/database";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { visaRegex, cvvCodeRegex } from "@/utils/data";
import { schedule, bookHistory } from "@/models";

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
    res.status(405).json({code: 2, message: "Only POST requests allowed" });
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
    id,
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
      const routeDetail = await schedule.findById(new ObjectId(id), 'date slot tour status').populate({
        path: 'tour',
        select: '-rating -wishlist',
      })
      const bookList = await bookHistory.find({ schedule: new ObjectId(id) }, 'quantity')
      const bookedQuantity = bookList.reduce((prev, curr) => prev + curr.quantity, 0)
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `${routeDetail.tour.destination} - ${routeDetail.tour.route} - ${dayjs(
          routeDetail.date.from
        ).format("DD-MM-YYYY")}`,
        text: "Book tour successfully!!!",
      };
      const check = bookedQuantity + quantity
      if (routeDetail.status && check <= routeDetail.slot) {
        await bookHistory.create({
          schedule: new ObjectId(id),
          tour: new ObjectId(routeDetail.tour._id),
          email,
          quantity,
          paymentMethod,
          total: (routeDetail.tour.price * quantity).toFixed(2),
          slot: routeDetail.slot,
          status: 'Success'
        })
        transporter.sendMail(mailOptions);
        res
          .status(200)
          .json({code: 0, status: "success", message: 'Purchase complete!' });
      } else {
        await bookHistory.create({
          schedule: new ObjectId(id),
          tour: new ObjectId(routeDetail.tour._id),
          email,
          quantity,
          paymentMethod,
          total: (routeDetail.tour.price * quantity).toFixed(2),
          slot: routeDetail.slot,
          status: 'Fail'
        })
        res.status(200).json({code: 3, status: "fail", message: "Purchase failed" });
      }
    } catch (e) {
      res.status(500).json({code: 1, message: 'Server error' });
    }
  }
};

export default Payment;
