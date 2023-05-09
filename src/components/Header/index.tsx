import React, { useState, useEffect, RefObject } from 'react'
import Button from '../Button'
import styles from '../../styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'

interface headerProps {
    outterRef: RefObject<HTMLDivElement>
}

const Header = ({outterRef} : headerProps): JSX.Element => {

    const [isTop, setIsTop] = useState<boolean>(true)

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
        <div className='flex justify-center fixed top-0 left-0 w-full h-20 z-10 opacity-90' 
            style={isTop ? {backgroundColor: 'transparent'} : {backgroundColor: 'black'}}>
            <header className='container flex align-middle justify-between'>
                <Link className='flex' href='/'>
                    <Image className='py-4 w-fit' alt='' src={require('../../Assets/Images/Logo/XPLORE_logo.png')}/>
                </Link>
                <ul className='flex py-7' style={isTop ? {color: 'black'} : {color: 'white'}}>
                    <li className='px-4'>
                        <Link className={styles.nav_link} href='/'>HOME</Link>
                    </li>
                    <li className='px-4'>
                        <Link className={styles.nav_link} href='/Services'>SERVICES</Link>
                    </li>
                    <li className='px-4'>
                        <Link className={styles.nav_link} href=''>DISCOVER</Link>
                    </li>
                    <li className='px-4'>
                        <Link className={styles.nav_link} href=''>ABOUT US</Link>
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
            </header>
        </div>
    )
}

export default Header