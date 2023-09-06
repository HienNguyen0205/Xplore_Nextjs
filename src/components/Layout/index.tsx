import React, { ReactNode, useState, useEffect } from 'react';
import { MetaProps } from "@/utils/types";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '../Header';
import Footer from '../Footer';
import Meta from './meta'
import LoadingSkeleton from './loading'

interface layoutProps {
    meta: MetaProps,
    children: ReactNode
}

const nonHeaderRoute = ['/_error','/sign-in','/sign-up']

const Layout = ({
    meta, children
} : layoutProps) => {

    const router = useRouter()
    const { status } = useSession()

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);
        
        if(status === 'loading') {
            handleStart()
        }else{
            handleComplete()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError',  handleComplete)
  
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }

    }, [router, status])

    if (loading || router.isFallback) {
        return (
          <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-400">
            <LoadingSkeleton />
          </div>
        );
    }

    return (
        <div className="relative">
            <Meta props={meta} />
            {!nonHeaderRoute.includes(router.pathname) && <Header/>}
            <div className="w-full">
                {children}
            </div>
            {!nonHeaderRoute.includes(router.pathname) && <Footer/>}
        </div>
    )
}

export default Layout