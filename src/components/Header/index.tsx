import React, { useState, useEffect, RefObject } from 'react'
import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface headerProps {
    outterRef: RefObject<HTMLDivElement>
}

const Header = ({outterRef} : headerProps): JSX.Element => {

    const [isTop, setIsTop] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScroll = (e: Event) => {
        if (outterRef.current) {
            if(outterRef.current.getBoundingClientRect().y < -10){
                setIsTop(false)
            }else{
                setIsTop(true)
            }
        }
    }

    return (
        <header className='flex justify-center fixed top-0 left-0 w-full h-20 z-10 opacity-90' 
            style={isTop ? {backgroundColor: 'transparent'} : {backgroundColor: 'black'}}>
            <div className='container flex items-center justify-between'>
                <Link className='h-full' href='/'>
                    <Image className='h-full py-5 object-contain' alt='' src={require('../../assets/images/Logo/XPLORE_logo.png')}/>
                </Link>
                <ul className='flex justify-center items-center' style={isTop ? {color: 'black'} : {color: 'white'}}>
                    <li className='nav_link' style={router.pathname === '/' ? {color: '#ae3056'} : {}}>
                        <Link href='/'>HOME</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/services' ? {color: '#ae3056'} : {}}>
                        <Link  href='/services'>SERVICES</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/discover' ? {color: '#ae3056'} : {}}>
                        <Link  href=''>DISCOVER</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/about' ? {color: '#ae3056'} : {}}>
                        <Link href=''>ABOUT US</Link>
                    </li>
                </ul>
                <div>
                    <Button
                        content='Sign In'
                        bgColor='#5a66ff'
                    />
                    <Button
                        content='Sign Up'
                        bgColor='#008000'
                    />
                </div>
            </div>
        </header>
    )
}

export default Header