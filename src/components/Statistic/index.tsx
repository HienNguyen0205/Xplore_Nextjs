import React from "react"
import { statistic } from "@/utils/types"

const Statistic = (props: statistic) => {
    return (
        <div className='flex flex-col align-middle text-center'>
            {props.icon}
            <div className='text-black text-center text-5xl font-bold'>{props.quantity}</div>
            <p className='text-red-500 text-center text-xl'>{props.name}</p>
        </div>
    )
}

export default Statistic