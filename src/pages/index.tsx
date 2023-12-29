import React from "react";
import db from "@/utils/database";
import dynamic from "next/dynamic";
import { tourStatistic, tourSchedule } from "@/models";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { tourDef, tourStatisticDef } from "@/utils/types";
import { CldImage } from "next-cloudinary";
import { courouselData } from "@/utils/data";
import { Carousel, TourFeature, TourList } from "@/components";
const Statistic = dynamic(() => import("@/components/Statistic"));
const FeatureItem = dynamic(() => import("@/components/TourFeature"));

const Home = (props: {
  tourList: tourDef[];
  tourStatistic: tourStatisticDef;
}) => {
  const { tourList, tourStatistic } = props;

  console.log(tourList)

  return (
    <div className="bg-slate-200">
      <Carousel content={courouselData} />
      <div className="w-full flex-col flex items-center pb-5">
        <TourList tour={tourList} titleContent="Destination" />
      </div>
      <ParallaxBanner className="aspect-[2/1]" style={{ height: "600px" }}>
        <ParallaxBannerLayer speed={-30}>
          <CldImage
            className="select-none"
            fill
            src="Background/jclfs1prsslvs3tbsqym"
            alt="bg"
          />
        </ParallaxBannerLayer>
      </ParallaxBanner>
      <div className="w-full flex justify-center">
        <Statistic data={tourStatistic}/>
      </div>
      <ParallaxBanner className="aspect-[2/1]" style={{ height: "600px" }}>
        <ParallaxBannerLayer speed={-30}>
          <CldImage
            className="select-none"
            fill
            src="Background/rhz30vbiznmght1vwrsg"
            alt="bg"
          />
        </ParallaxBannerLayer>
        <div className="w-full flex justify-center h-full">
          <TourFeature/>
        </div>
      </ParallaxBanner>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    await db();
    let tourData = await tourSchedule.find().populate('rating').limit(8)
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