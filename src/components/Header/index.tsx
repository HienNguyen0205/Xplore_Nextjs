'use client'
import React from 'react'
import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import { History, Settings, Logout, Person } from '@mui/icons-material'

const Header = (): JSX.Element => {

    const router = useRouter()
    const { data: session, status } = useSession()

    const returnHome = () => {
        router.push("/");
    };

    return (
        <header className='flex justify-center fixed top-0 left-0 w-full h-20 z-10 opacity-[.85]' 
            style={{backgroundColor: 'black'}}>
            <div className='container flex items-center justify-between'>
                <Image className='h-full py-5 object-contain flex-1 basis-1/5' alt='logo'
                            src={require('../../assets/images/Logo/XPLORE_logo.png')} priority onClick={returnHome}/>
                <ul className='flex justify-center items-center grow-[2]' style={{color: 'white'}}>
                    <li className='nav_link' style={router.pathname === '/' ? {color: '#ff4dd8'} : {}}>
                        <Link href='/'>HOME</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/service' ? {color: '#ff4dd8'} : {}}>
                        <Link  href='/service'>SERVICE</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/discover' ? {color: '#ff4dd8'} : {}}>
                        <Link  href='/discover'>DISCOVER</Link>
                    </li>
                    <li className='nav_link' style={router.pathname === '/contact' ? {color: '#ff4dd8'} : {}}>
                        <Link href='/contact'>CONTACT</Link>
                    </li>
                </ul>
                {status === 'authenticated' ? <div className={styles.avatar_container}>
                    <Image className={styles.avatar} src={require('@/assets/images/User/unknowUser.jpg')} alt='user-img'/>
                    <div className={styles.avatar_dropdown}>
                        <div className={styles.dropdown_item}>
                            <Person/>
                            <span className={styles.dropdown_text}>Profile</span>
                        </div>
                        <div className={styles.dropdown_item}>
                            <History/>
                            <span className={styles.dropdown_text}>History</span>
                        </div>
                        <div className={styles.dropdown_item}>
                            <Settings/>
                            <span className={styles.dropdown_text}>Setting</span>
                        </div>
                        <div className={styles.dropdown_item} onClick={() => signOut()}>
                            <Logout/>
                            <span className={styles.dropdown_text}>Log out</span>
                        </div>
                    </div>
                </div> : <div className='flex-1'>
                    <Button
                        content='Sign In'
                        bgColor='#5a66ff'
                        onClick={() => signIn()}
                    />
                    <Button
                        content='Sign Up'
                        bgColor='#008000'
                        onClick={() => router.push('/sign-up')}
                    />
                </div>}
            </div>
        </header>
    )
}

export default Header