import React from "react";
import db from "@/utils/database";
import Meta from "@/components/Layout/meta";
import { tourSchedule } from "@/models";
import { serviceProps } from "@/utils/types";
import { TourList, FindTour } from "@/components";
import { CldImage } from "next-cloudinary";

const Services = (props: serviceProps) => {

  const { tourData } = props;

  return (
    <div className="bg-slate-200">
      <Meta
        props={{
          title: "Xplore | Services",
        }}
      />
      <div className='h-screen flex justify-center relative'>
        <CldImage
          className="h-full w-full bg-cover"
          width={1800}
          height={500}
          src="Background/jdb1mtfxticuf3nrbixt"
          alt="Search_bg"
          priority
        />
        <div className="container flex flex-col justify-center absolute top-1/3">
          <h1 className="text-shadow mb-12 text-5xl font-bold text-white">
            Discover and Enjoy Your New Places and Exprience.
          </h1>
          <FindTour bg="light" />
        </div>
      </div>
      <div className="w-full flex-col flex items-center pb-5 pt-10">
        {tourData.map((tours, index) => <TourList key={index} tour={tours.tourList} pagination title titleContent={tours._id + ' Tour'} />)}
      </div>
    </div>
  );
};

export default Services;

export const getServerSideProps = async () => {
  try {
    await db();
    const tourData = await tourSchedule.aggregate([
      {
        $group: {
          _id: '$region',
          tourList: {
            $push: '$$ROOT'
          }
        }
      }
    ]);
    return {
      props: {
        tourData: JSON.parse(JSON.stringify(tourData)),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        notFound: true,
      },
    };
  }
};