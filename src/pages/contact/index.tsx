import React from "react";
import Meta from "@/components/Layout/meta";
import dynamic from 'next/dynamic'
import { CldImage } from "next-cloudinary";
const FeedbackMessage = dynamic(() => import('@/components/FeedbackMessage'), { ssr: false })
const InfoCard = dynamic(() => import('@/components/InfoCard'))

const Contact = () => {
  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <Meta
        props={{
          title: "Xplore | Contact",
        }}
      />
      <div className="relative overflow-hidden">
        <CldImage
          className="h-screen bg-cover"
          width={1800}
          height={500}
          src="Background/husbetx1d0ipqosvnksy"
          alt="galleryBg"
        />
        <p className="absolute bottom-[40%] left-1/4 text-white font-bold w-full text-8xl">
          Contact us
        </p>
        <p className="absolute bottom-[30%] left-1/4 text-white font-semibold w-full text-4xl italic">
          Get intouch
        </p>
      </div>
      <div className="grid grid-cols-4 h-[60vh]">
        <InfoCard
          title="Ho Chi Minh City"
          address="2 Hai Trieu, Ben Nghe, Q.1, Tp.Ho Chi Minh"
          tel="+84-123456789"
          email="Xplore_HCM@gmail.com"
          imageSrc="Background/jhkdkhnfelytpcbytjli"
        />
        <iframe
          className="h-full w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5463.568666582782!2d106.70265287461328!3d10.771445139650224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3acf87eaeb%3A0xc969a1975f3be32a!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1693228631032!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <InfoCard
          title="Ha Noi"
          address="36 Hoang Cau, Cho Dua, Cau Giay, Ha Noi"
          tel="+84-987654321"
          email="Xplore_HN@gmail.com"
          imageSrc="Background/rodmcumhbilc1k22idre"
        />
        <iframe
          className="h-full w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.1680165364087!2d105.82271773347567!3d21.019236380028982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb4623fb1d3%3A0x10291e8bc5361d64!2sPeakview%20Tower!5e0!3m2!1sen!2s!4v1693133718443!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="container mx-auto">
        <FeedbackMessage/>
      </div>
    </div>
  );
};

export default Contact;