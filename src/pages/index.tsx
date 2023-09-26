import React from "react";
import db from "@/utils/database";
import dynamic from "next/dynamic";
import Image from "next/image";
import { tourStatistic, tourSchedule } from "@/models";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { tourDef, tourStatisticDef } from "@/utils/types";
import { CldImage } from "next-cloudinary";
import { courouselData, hotelDescription } from "@/utils/data";
import { Carousel, TourList } from "@/components";
const Statistic = dynamic(() => import("@/components/Statistic"));
const FeatureItem = dynamic(() => import("@/components/FeatureItem"));

const Home = (props: {
  tourList: tourDef[];
  tourStatistic: tourStatisticDef;
}) => {
  const { tourList, tourStatistic } = props;

  return (
    <div className="bg-slate-200">
      <Carousel content={courouselData} />
      <div className="w-full flex-col flex items-center pb-5">
        <TourList data={tourList} titleContent="Destination" />
      </div>
      <ParallaxBanner className="aspect-[2/1]" style={{ height: "600px" }}>
        <ParallaxBannerLayer speed={-30}>
          <CldImage
            className="select-none"
            width={1920}
            height={1080}
            src="Background/jclfs1prsslvs3tbsqym"
            alt="bg"
          />
        </ParallaxBannerLayer>
      </ParallaxBanner>
      <div className="w-full flex justify-center">
        <div className="container flex justify-around mt-10 mb-14">
          <Statistic
            name="Happy customer"
            quantity={tourStatistic.customers}
            icon={
              <Image
                className="m-auto"
                src={require("@/assets/images/Icon/happy-face.svg")}
                alt="happy-face"
                height={64}
                width={64}
              />
            }
          />
          <Statistic
            name="Amazing tours"
            quantity={tourStatistic.tourNumber}
            icon={
              <Image
                className="m-auto"
                src={require("@/assets/images/Icon/bus.svg")}
                alt="bus"
                height={64}
                width={64}
              />
            }
          />
          <Statistic
            name="Success tours"
            quantity={tourStatistic.successTour}
            icon={
              <Image
                className="m-auto"
                src={require("@/assets/images/Icon/luggage.svg")}
                alt="luggage"
                height={64}
                width={64}
              />
            }
          />
          <Statistic
            name="Support case"
            quantity={tourStatistic.supportCases}
            icon={
              <Image
                className="m-auto"
                src={require("@/assets/images/Icon/message.svg")}
                alt="message"
                height={64}
                width={64}
              />
            }
          />
        </div>
      </div>
      <ParallaxBanner className="aspect-[2/1]" style={{ height: "600px" }}>
        <ParallaxBannerLayer speed={-30}>
          <CldImage
            className="select-none"
            width={1920}
            height={1080}
            src="Background/rhz30vbiznmght1vwrsg"
            alt="bg"
          />
        </ParallaxBannerLayer>
        <div className="w-full flex justify-center h-full">
          <div className="container grid grid-cols-3 gap-10 h-full items-center">
            <FeatureItem
              title="Handlepicked Hotels"
              description={hotelDescription[0]}
              icon={
                <Image
                  src={require("@/assets/images/Icon/bed.svg")}
                  alt="bed"
                  height={32}
                  width={32}
                />
              }
            />
            <FeatureItem
              title="World Class Service"
              description={hotelDescription[1]}
              icon={
                <Image
                  src={require("@/assets/images/Icon/earth.svg")}
                  alt="earth"
                  height={32}
                  width={32}
                />
              }
            />
            <FeatureItem
              title="Best Price Guarantee"
              description={hotelDescription[2]}
              icon={
                <Image
                  src={require("@/assets/images/Icon/dolar.svg")}
                  alt="dolar"
                  height={32}
                  width={32}
                />
              }
            />
          </div>
        </div>
      </ParallaxBanner>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    await db();
    let tourData = await tourSchedule.aggregate([
      {
        $match: {
          status: true,
        },
      },
      {
        $group: {
          _id: "$routeId",
          tourData: { $push: "$$ROOT" },
        },
      },
      {
        $limit: 8,
      },
    ]);
    tourData = tourData.map((tour) => tour.tourData[0]);
    const tourStatisticData = await tourStatistic.findOne();
    return {
      props: {
        tourList: JSON.parse(JSON.stringify(tourData)),
        tourStatistic: JSON.parse(JSON.stringify(tourStatisticData)),
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};