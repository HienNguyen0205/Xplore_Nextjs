import React from "react";
import Image from "next/image";
import { statisticProps } from "@/utils/types";
import { statisticData } from "@/utils/data";
import { useInView, animated } from "@react-spring/web";

const Statistic = (props: statisticProps) => {
  const { data } = props;

  const [ref, style] = useInView(() => ({
    from: {
      opacity: 0,
      y: 100,
    },
    to: {
        opacity: 1,
        y: 0,
    }
  }), { rootMargin: '-12% 0%', once: true })

  return (
    <div className="container flex justify-around mt-10 mb-14">
      {statisticData.map((item, index) => {
        return (
          <animated.div ref={ref} style={style} key={index} className="flex flex-col align-middle text-center">
            <Image
              className="m-auto"
              src={item.iconSrc}
              alt={item.alt}
              height={64}
              width={64}
            />
            <div className="text-black text-center text-5xl font-bold">
              {data[item.data as keyof typeof data]}
            </div>
            <p className="text-red-500 text-center text-xl">{item.name}</p>
          </animated.div>
        );
      })}
    </div>
  );
};

export default Statistic;
