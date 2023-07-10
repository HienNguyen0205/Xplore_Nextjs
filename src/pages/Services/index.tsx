import React from "react";
import db from '@/utils/database'
import { TourList, FindTour } from "@/components";
import { tour } from '@/models'
import { tourDef } from '@/utils/types'
import styles from '@/styles/Sevices.module.scss'
import Meta from '@/components/Layout/meta'
import 'dayjs/locale/en-gb';

const Services = (props : {tourList: tourDef[]}): JSX.Element => {

  const { tourList } = props

  return (
    <>
      <Meta props={{
        title: 'Xplore | Services',
        description: "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure."
      }}/>
      <div className={styles.search_container}>
        <div className="container flex flex-col justify-center">
          <h1 className="text-shadow mb-12">
            Discover and Enjoy Your New Places and Exprience.
          </h1>
          <FindTour />
        </div>
      </div>
      <div
        className="w-full flex-col bg-white flex items-center pb-5 pt-10"
        style={{ backgroundColor: "#f7f3fb" }}
      >
        <TourList data={tourList} pagination option />
      </div>
    </>
  );
};

export default Services;

export const getStaticProps = async () => {
  try{
      await db()
      const tourData = await tour.find()
      return {
          props: {
              tourList: JSON.parse(JSON.stringify(tourData)),
          },
          revalidate: 10,
      };
  }catch(err){
      console.error(err)
      return {
          props: {
              notFound: true
          }
      }
  }
}