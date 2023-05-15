import React, { useRef, ReactNode } from 'react';
import { MetaProps } from "@/utils/types";
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';
import Meta from './meta'
import Toast from './toast'
import Loading from './loading';

interface layoutProps {
    meta: MetaProps,
    children: ReactNode
}

const Layout = ({
    meta, children
} : layoutProps) => {

    const outterRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    if (router.isFallback) {
        return (
          <div className="h-screen w-screen flex justify-center items-center bg-black">
            <Loading />
          </div>
        );
    }

    return (
        <div ref={outterRef} className="relative">
            <Meta props={meta} />
            <Toast/>
            <Header outterRef={outterRef}/>
            <div className="w-full">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout