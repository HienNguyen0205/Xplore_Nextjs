import React, { useState, useEffect } from "react";
import Meta from "@/components/Layout/meta";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DatePicker } from "@mui/x-date-pickers";
import { useTrail, animated, config } from "@react-spring/web"
import { history } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/utils/query";
const HistoryDetail = dynamic(() => import('@/components/HistoryDetail'))

const History = () => {

    const [from, setFrom] = useState<Dayjs>(dayjs(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    const [to, setTo] = useState<Dayjs>(dayjs(new Date()))
    const [open, setOpen] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)
    const [history, setHistory] = useState<history[]>()

    const { data, isSuccess } = useQuery({
        queryKey: ['history', from, to],
        queryFn: () => getHistory(from.toISOString(), to.toISOString())
    })

    useEffect(() => {
        if(isSuccess){
            setHistory(data.history)
        }
    }, [isSuccess, data?.history])

    const historyItemStyle = useTrail(history ? history?.length : 10, {
        from: {
            opacity: 0.5,
            y: 25
        },
        to: {
            opacity: 1,
            y: 0
        },
        config: config.molasses,
    })

    const handleClick = (item: number) => {
        setIndex(item)
        setOpen(true)
    }

    return (
        <div className="bg-slate-100 flex justify-center relative h-screen">
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
                        <DatePicker label='From' value={from} onChange={(value) => setFrom(value as Dayjs)}/>
                        <p className="text-3xl font-medium mx-3">-</p>
                        <DatePicker label='To' value={to} onChange={(value) => setTo(value as Dayjs)}/>
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
                    {history && history.length > 0 ? history.map((item, index) => {
                        return (
                            <animated.div key={index} style={historyItemStyle[index]} className="flex items-center py-1 px-6 my-1 rounded-md bg-slate-300 text-lg cursor-pointer" onClick={() => handleClick(index)}>
                                <p className="flex-[2]">{item.tour.destination} | {item.tour.route}</p>
                                <p className="flex-1">{dayjs(item.time).format('DD/MM/YYYY')}</p>
                                <p className="flex-1">{item.paymentMethod}</p>
                                <p className="flex items-center flex-1" style={item.status === 'Success' ? {color: '#21BF73'} : {color: '#1A5D1A'}}>
                                    <Image className="mr-1" src={require(`@/assets/images/Icon/${item.status === 'Success' ? 'tick' : 'cross'}.svg`)} alt='status_icon' width={24} height={24}/>
                                    {item.status}
                                </p>
                                <p className="flex-1">${item.total}</p>
                            </animated.div>
                        )
                    }) : <p className="text-2xl font-semibold text-red-400 my-6 text-center">History is empty</p>}
                </div>
            </div>
            {open && <>
                <div className="absolute inset-0 z-10 bg-[rgba(148,163,184,0.5)]" onClick={() => setOpen(false)}></div>
                {history && <HistoryDetail setOpen={setOpen} history={history[index]}/>}
            </>}
        </div>
    )
}

export default History