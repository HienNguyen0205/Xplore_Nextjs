import React from "react";
import db from "@/utils/database";
import { TourList, FindTour } from "@/components";
import { tourSchedule } from "@/models";
import { tourDef } from "@/utils/types";
import styles from "@/styles/Sevices.module.scss";
import Meta from "@/components/Layout/meta";
import "dayjs/locale/en-gb";

const Services = (props: { tourList: tourDef[][] }): JSX.Element => {

  const { tourList } = props;

  return (
    <div className="bg-slate-200">
      <Meta
        props={{
          title: "Xplore | Services",
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
        {tourList.map((tours, index) => <TourList key={index} data={tours} pagination title titleContent={tours[0].region + ' Tour'} />)}
      </div>
    </div>
  );
};

export default Services;

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
          tourId: { $first: "$_id" },
          image: { $first: "$image" },
          route: { $first: "$route" },
          comments: { $first: "$comments" },
          price: { $first: "$price" },
          rating: { $first: "$rating" },
          time: { $first: "$time" },
          destination: { $first: "$destination" },
          region: { $first: "$region" },
        },
      },
      {
        $group: {
          _id: '$region',
          tourRegion: { $push: '$$ROOT'}
        }
      }
    ]);
    tourData = tourData.map(tour => tour.tourRegion)
    tourData = tourData.map(tour => {
      tour.map((item: { routeId: any; _id: any; tourId: any; }) => {
        item.routeId = item._id
        delete item._id
        item._id = item.tourId
        delete item.tourId
        return item
      })
      return tour
    })
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