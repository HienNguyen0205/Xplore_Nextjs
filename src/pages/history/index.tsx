import React, { useState } from "react";
import Meta from "@/components/Layout/meta";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { DatePicker } from "@mui/x-date-pickers";
import { useTrail, animated } from "@react-spring/web"
import { useGetHistoryQuery } from "@/redux/reducers/apiSlice";

const History = () => {

    const [from, setFrom] = useState<Dayjs | null>(dayjs(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    const [to, setTo] = useState<Dayjs | null>(dayjs(new Date()))

    const { data } = useGetHistoryQuery({from, to})

    const historyItemStyle = useTrail(data ? data.history.length : 10, {
        from: {
            opacity: 0.5,
            y: 25
        },
        to: {
            opacity: 1,
            y: 0
        },
        config: { mass: 5, tension: 2000, friction: 200 },
    })

    return (
        <div className="bg-slate-100 flex justify-center">
            <Meta
                props={{
                    title: "Xplore | History",
                    robots: 'none'
                }}
            />
            <div className="container mt-[92px]">
                <div className="flex justify-between items-center my-6">
                    <h1 className="text-4xl font-medium">Order History</h1>
                    <div className="flex items-center">
                        <DatePicker label='From' value={from} onChange={(value) => setFrom(value)}/>
                        <p className="text-3xl font-medium mx-3">-</p>
                        <DatePicker label='To' value={to} onChange={(value) => setTo(value)}/>
                    </div>
                </div>
                <div className="flex py-1 px-6 mt-6 rounded-md bg-slate-300 text-lg font-medium">
                    <p className="flex-[2]">Tour Name</p>
                    <p className="flex-1">Booking Date</p>
                    <p className="flex-1">Payment Method</p>
                    <p className="flex-1">Status</p>
                    <p className="flex-1">Total</p>
                </div>
                <div className="h-[65vh] py-3 overflow-y-auto">
                    {data ? data.history.map((item, index) => {
                        return (
                            <animated.div key={index} style={historyItemStyle[index]} className="flex py-1 px-6 my-1 rounded-md bg-slate-300 text-lg cursor-pointer">
                                <p className="flex-[2]">{item.tourName}</p>
                                <p className="flex-1">{dayjs(item.time).format('DD/MM/YYYY')}</p>
                                <p className="flex-1">{item.paymentMethod}</p>
                                <p className="flex items-center flex-1" style={item.status === 'Success' ? {color: '#21BF73'} : {color: '#1A5D1A'}}>
                                    <Image className="mr-1" src={require(`@/assets/images/Icon/${item.status === 'Success' ? 'tick' : 'cross'}.svg`)} alt='status_icon' width={24} height={24}/>
                                    {item.status}
                                </p>
                                <p className="flex-1">${item.total}</p>
                            </animated.div>
                        )
                    }) : <p></p>}
                </div>
            </div>
        </div>
    )
}

export default History