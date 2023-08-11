import React from "react";
import Meta from "@/components/Layout/meta";
import db from '@/utils/database'
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { tourSchedule } from '@/models';
import { tourPageProps , tourDef } from '@/utils/types';
import { FindTour, TourList } from "@/components";

const Tour = (props : tourPageProps) => {

  const router = useRouter()

  const { tourList, defaultValue } = props

  return (
    <div className='bg-slate-200'>
      <Meta
        props={{
          title: `Xplore | Tour`,
          description:
            "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure.",
        }}
      />
      <div className="flex justify-center">
        <div className='container mt-24'>
          <FindTour bg='dark' defaultValue={defaultValue}/>
          <TourList data={tourList} pagination tourHeader={false} sortBar isLimit={false} showDate/>
        </div>
      </div>
    </div>
  );
};

export default Tour;

export const getServerSideProps : GetServerSideProps<tourPageProps | { notFound : boolean }> = async (context) => {
  
  const { destination, departure, checkIn } = context.query

  try{
    await db()
    const tourScheduleList : tourDef[] = await tourSchedule.find({
      destination,
      departure,
      'date.from' : { $gte: new Date(checkIn as string) }
    }, '-userRegisterId')
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