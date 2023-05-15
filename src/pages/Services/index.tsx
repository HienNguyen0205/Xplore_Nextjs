import React from "react";
import { TourList, FindTour } from "@/components";
import { tour } from '@/models'
import { tourDef } from '@/utils/types'
import db from '@/utils/database'
import styles from '@/styles/Sevices.module.scss'
import 'dayjs/locale/en-gb';

const Services = (props : {tourList: tourDef[]}): JSX.Element => {

  const { tourList } = props

  return (
    <>
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