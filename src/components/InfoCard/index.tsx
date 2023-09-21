import React from 'react';
import { infoCardProps } from '@/utils/types';
import { CldImage } from 'next-cloudinary';

const InfoCard = (props: infoCardProps) => {
  const { title, address, tel, email, imageSrc } = props;

  return (
    <div className="relative">
      <CldImage
        className="h-full"
        width={1800}
        height={855}
        src={imageSrc}
        alt="galleryBg"
      />
      <div className="absolute top-0 left-0 h-full w-full px-10 py-20 text-white">
        <h1 className="text-3xl font-bold underline mb-4">{title}</h1>
        <p className="text-lg my-8">{address}</p>
        <p className="text-lg my-2">Tel: {tel}</p>
        <p className="text-lg my-2">Email: {email}</p>
      </div>
    </div>
  );
};

export default InfoCard