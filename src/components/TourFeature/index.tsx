import React from "react";
import Image from "next/image";
import { hotelDescription } from "@/utils/data";
import { useInView, animated } from "@react-spring/web";

const TourFeature = () => {

  const [ref, style] = useInView(() => ({
    from: {
      opacity: 0,
      y: 100,
    },
    to: {
        opacity: 1,
        y: 0,
    }
  }), { once: true })

  return (
    <div className="container grid grid-cols-3 gap-10 h-full items-center">
      {hotelDescription.map((item, index) => {
        return (
          <animated.div key={index} ref={ref} style={style} className="relative bg-white rounded-md h-[300px] transition-all hover:translate-y-[-1rem]">
            <div className="absolute w-[5rem] h-[5rem] top-[-2.5rem] right-[calc(50%-2.5rem)] bg-[rgb(220,38,38)] rounded-full flex justify-center items-center">
              <Image
                src={item.icon}
                alt={item.alt}
                height={32}
                width={32}
              />
            </div>
            <h1 className="pt-16 font-bold text-2xl text-center">
              {item.title}
            </h1>
            <p className="py-4 text-center lg:text-xl md:text-base sm:text-sm">
              {item.description}
            </p>
          </animated.div>
        );
      })}
    </div>
  );
};

export default TourFeature;
