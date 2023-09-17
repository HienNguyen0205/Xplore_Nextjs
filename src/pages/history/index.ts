import React from "react";
import Meta from "@/components/Layout/meta";
import db from '@/utils/database'

const History = () => {
    return (
        <div className="bg-slate-100 flex justify-center">
            <Meta
                props={{
                    title: "Xplore | History",
                    robots: 'none'
                }}
            />
        </div>
    )
}

export default History

export const getServerSideProps = async () => {
    try{
        await db()
        
    }catch(e){
        console.error(e)
    }
}