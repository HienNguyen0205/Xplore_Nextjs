import React, { ReactNode } from 'react';
import { MetaProps } from "@/utils/types";
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';
import Meta from './meta'
import Toast from './toast'
import LoadingSkeleton from './loading'

interface layoutProps {
    meta: MetaProps,
    children: ReactNode
}

const Layout = ({
    meta, children
} : layoutProps) => {

    const router = useRouter()

    if (router.isFallback) {
        return (
          <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
            <LoadingSkeleton />
          </div>
        );
    }

    return (
        <div className="relative">
            <Meta props={meta} />
            <Toast/>
            {router.pathname !== '/404' && <Header/>}
            <div className="w-full">
                {children}
            </div>
            {router.pathname !== '/404' && <Footer/>}
        </div>
    )
}

export default Layout