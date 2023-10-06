import db from "@/utils/database";
import axios from "axios";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { user } from "@/models";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const handleDeleteImage = async (publicId: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const signature = generateSHA1(
    generateSignature(publicId, apiSecret as string)
  );
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
  } catch (e) {
    // console.error(e);
  }
};

const changeAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ code: 2, message: "Only POST requests allowed" });
    return;
  }

  const { avatar } = req.body;
  const session = await getServerSession(req, res, authOptions);

  try {
    await db();
    const oldAvatar = await user.findOne({
        email: session?.user?.email,
    }, 'avatar')
    if(!!oldAvatar.avatar){
        handleDeleteImage(oldAvatar.avatar);
    }
    await user.findOneAndUpdate(
      {
        email: session?.user?.email,
      },
      { avatar }
    );
    res.status(200).json({ code: 0, message: "Update avatar successful" });
  } catch (e) {
    res.status(500).json({ code: 1, message: "Server error" });
  }
};

export default changeAvatar;
