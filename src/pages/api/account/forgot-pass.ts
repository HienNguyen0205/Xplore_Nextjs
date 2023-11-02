import db from "@/utils/database";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { user, otp } from "@/models";

const forgotPass = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ code: 3, message: "Only POST requests are allowed" });
    return;
  }

  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const gfg = () => {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  };

  try {
    await db();
    const isExist = await user.exists({ email });
    if (!!isExist) {
      const code = gfg();
      const content = `Need to reset your password?\n\nUse your secret code!\n[${code}]\n\nIf you did not forget your password, you can ignore this email.`;
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Confirmation for change password",
        text: content as string,
      };
      transporter.sendMail(mailOptions);
      res.status(200).json({ code: 0 });
      await otp.create({
        code,
        email,
      });
    } else {
      res.status(200).json({ code: 1, message: "Email is not exist" });
    }
  } catch (e) {
    res.status(500).json({ code: 2, message: "Server error" });
  }
};

export default forgotPass;
