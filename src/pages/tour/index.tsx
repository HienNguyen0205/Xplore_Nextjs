import React from "react";
import Meta from "@/components/Layout/meta";
import styles from '@/styles/Tour.module.scss'
import Image from "next/image";
import { useRouter } from "next/router";
import type { GetServerSideProps } from 'next'



const Tour = () => {

  const router = useRouter()

  return (
    <>
      <Meta
        props={{
          title: "Xplore | Tour",
          description:
            "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure.",
        }}
      />
      <div className={styles.tour_banner}>
        {/* <Image className="" src={} alt='tour_banner'/> */}
        <p></p>
      </div>
    </>
  );
};

export default Tour;

// export const getServerSideProps : GetServerSideProps<{}> = context => {


//   return {
//     props: {

//     }
//   }
// }