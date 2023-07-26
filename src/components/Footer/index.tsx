'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Footer = (): JSX.Element => {

    const router = useRouter()

    return (
        <footer className='flex justify-center border-t-[1px] border-gray-600'>
            <div className='container p-4 bg-white md:px-6 md:py-8'>
                <div className="flex items-center justify-between">
                    <Link href='/' className="mb-4 sm:mb-0">
                        <Image src={require('../../assets/images/Logo/XPLORE_logo_dark.png')} className="h-12 mr-3 w-fit" alt="" />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li className='nav_link' style={router.pathname === '/' ? {color: '#ae3056'} : {}}>
                            <Link href='/'>HOME</Link>
                        </li>
                        <li className='nav_link' style={router.pathname === '/services' ? {color: '#ae3056'} : {}}>
                            <Link href='/services'>SERVICES</Link>
                        </li>
                        <li className='nav_link' style={router.pathname === '/discover' ? {color: '#ae3056'} : {}}>
                            <Link href=''>DISCOVER</Link>
                        </li>
                        <li className='nav_link' style={router.pathname === '/about' ? {color: '#ae3056'} : {}}>
                            <Link href=''>ABOUT US</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Xplore™. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer