import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { layoutProps } from '@/utils/types';
import { Header } from '@/components'
import dynamic from 'next/dynamic';
import Meta from '@/components/Layout/meta'
const Footer = dynamic(() => import('@/components/Footer'))
const LoadingSkeleton = dynamic(() => import('@/components/Layout/loading'))

const nonHeaderRoute = ['/_error','/sign-in','/sign-up']
const nonFooterRoute = ['/_error','/sign-in','/sign-up','/history','/profile']

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
            <Meta props={{ title: 'Xplore | Loading...'}} />
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
            {!nonFooterRoute.includes(router.pathname) && <Footer/>}
        </div>
    )
}

export default Layout