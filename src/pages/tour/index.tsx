import React from "react";
import Meta from "@/components/Layout/meta";
import db from '@/utils/database'
import type { GetServerSideProps } from "next";
import { schedule } from '@/models';
import { tourPageProps , pageNotFound } from '@/utils/types';
import { FindTour, TourList } from "@/components";

const Tour = (props : tourPageProps) => {

  const { tourList, defaultValue } = props

  console.log(tourList)

  return (
    <div className='bg-slate-200'>
      <Meta
        props={{
          title: `Xplore | Tour`,
        }}
      />
      <div className="flex justify-center">
        <div className='container mt-24'>
          <FindTour bg='dark' defaultValue={defaultValue}/>
          <TourList tour={tourList} pagination tourHeader={false} sortBar isLimit={false}/>
        </div>
      </div>
    </div>
  );
};

export default Tour;

export const getServerSideProps : GetServerSideProps<tourPageProps | pageNotFound> = async (context) => {
  
  const { destination, departure, checkIn } = context.query

  try{
    await db()
    let tourScheduleList = await schedule.find({
      'date.from' : { $gte: new Date(checkIn as string) }
    }).populate({
      path: 'tour',
      match: {
        departure,
        destination,
      }
    })
    tourScheduleList = tourScheduleList.map(item => item.tour)
    return {
      props: {
        tourList: JSON.parse(JSON.stringify(tourScheduleList)),
        defaultValue: JSON.parse(JSON.stringify({
          destination: destination as string,
          departure: departure as string,
          checkIn: checkIn,
        }))
      }
    }
  }catch(e) {
    return {
      props: {
          notFound: true
      }
    }
  }
}