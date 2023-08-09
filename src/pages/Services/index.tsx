import React from "react";
import db from "@/utils/database";
import { TourList, FindTour } from "@/components";
import { tourSchedule } from "@/models";
import { tourDef } from "@/utils/types";
import styles from "@/styles/Sevices.module.scss";
import Meta from "@/components/Layout/meta";
import "dayjs/locale/en-gb";

const Services = (props: { tourList: tourDef[] }): JSX.Element => {
  
  const { tourList } = props;

  return (
    <div className="bg-slate-200">
      <Meta
        props={{
          title: "Xplore | Services",
          description:
            "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure.",
        }}
      />
      <div className={styles.search_container}>
        <div className="container flex flex-col justify-center">
          <h1 className="text-shadow mb-12">
            Discover and Enjoy Your New Places and Exprience.
          </h1>
          <FindTour bg="light" />
        </div>
      </div>
      <div className="w-full flex-col flex items-center pb-5 pt-10">
        <TourList data={tourList} pagination option />
      </div>
    </div>
  );
};

export default Services;

export const getStaticProps = async () => {
  try {
    await db();
    const tourData = await tourSchedule.find();
    return {
      props: {
        tourList: JSON.parse(JSON.stringify(tourData)),
      },
      revalidate: 10,
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
