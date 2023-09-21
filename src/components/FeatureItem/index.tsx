import React from "react";
import { featureItem } from "@/utils/types";

const FeatureItem = (props: featureItem) => {
  return (
    <div className="relative bg-white rounded-md h-[300px] transition-all hover:translate-y-[-1rem]">
      <div className="absolute w-[5rem] h-[5rem] top-[-2.5rem] right-[calc(50%-2.5rem)] bg-[rgb(220,38,38)] rounded-full flex justify-center items-center">
        {props.icon}
      </div>
      <h1 className="pt-16 font-bold text-2xl text-center">{props.title}</h1>
      <p className="py-4 text-center text-xl">{props.description}</p>
    </div>
  );
};

export default FeatureItem;
