/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Meta from '@/components/Layout/meta'
import { TextField, Button } from '@mui/material';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const SignIn  = () : JSX.Element => {

    const [emailMes, setEmailMes] = useState<String>('')
    const [passMes, setPassMes] = useState<String>('')
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const validate = () => {
        if(emailRef.current && passwordRef.current) {
            const email = emailRef.current.value.trim()
            const password = passwordRef.current.value.trim()
            let flag = true
            if(emailMes !== '') {
                setEmailMes('')
            }
            if(passMes !== ''){
                setPassMes('')
            }
            if(email === ''){
                flag = false
                setEmailMes('Please enter your email')
            }else if(!emailRegex.test(email)){
                flag = false
                setEmailMes('Please enter a valid email')
            }
            if(password === ''){
                flag = false
                setPassMes('Please enter your password')
            }else if(!passwordRegex.test(password)){
                flag = false
                setPassMes('Wrong password')
            }
            if(flag){
                signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false,
                }).then(res => {
                    if(res?.ok){
                        toast.success('Log in successful!', {delay: 2000})
                        router.push('/')
                    }else{
                        toast.error('Log in failed!', {delay: 2000})
                    }
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }

    return (
        <>
            <Meta props={{
                title: 'Xplore | Sign in',
                description: "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure."
            }}/>
            <div className='w-100 h-screen flex flex-col justify-around items-center relative'>
                <Image className='absolute h-[100%] object-cover z-[-1]' src={require('@/assets/images/Background/logbg.webp')} alt='' priority/>
                <Image className='w-[160px]' src={require('@/assets/images/Logo/XPLORE_logo.png')} alt='' priority/>
                <div className='p-5 bg-gray-50 opacity-90 w-[440px] rounded-md'>
                    <h1 className='text-4xl font-bold text-center mb-5 mt-3'>Login</h1>
                    <TextField sx={{margin: '8px 0'}} label="Email" variant="outlined" fullWidth autoFocus 
                        placeholder='Enter your email' type='email' inputRef={emailRef} required
                        error={emailMes !== ''} helperText={emailMes}/>
                    <TextField sx={{margin: '8px 0'}} label="Password" variant="outlined" fullWidth 
                        placeholder='Enter your password' type='password' inputRef={passwordRef} required
                        error={passMes !== ''} helperText={passMes}/>
                    <p className='my-2 text-right'>
                        <Link href='/forgot-password' className='text-red-500 hover:text-red-800'>Forgot your password?</Link>
                    </p>
                    <Button fullWidth variant="contained" sx={{margin: '0.5rem 0'}} size='large'
                        onClick={() => validate()}
                    >Log In</Button>
                    <div className='mt-4 mb-5  flex items-center'>
                        <hr className='flex-1 border-t-2 border-gray-800'></hr>
                        <p className='text-black mx-2 text-lg'>Or</p>
                        <hr className='flex-1 border-t-2 border-gray-800'></hr>
                    </div>
                    <div className='flex justify-between content-center'>
                        <Button sx={{width: '26%', padding: '.5rem 0', borderColor: '#888'}} variant='outlined'>
                            <svg width="32px" height="32px" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
                        </Button>
                        <Button sx={{width: '26%', padding: '.5rem 0', borderColor: '#888'}} variant='outlined' onClick={() => signIn('facebook')}>
                            <svg width="32px" height="32px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Facebook-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"> <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"> </path> </g> </g> </g></svg>
                        </Button>
                        <Button sx={{width: '26%', padding: '.5rem 0', borderColor: '#888'}} variant='outlined'>
                            <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="7935ec95c421cee6d86eb22ecd114eed"> <path style={{display: 'inline'}} d="M248.644,123.476c-5.45-29.71,8.598-60.285,25.516-80.89 c18.645-22.735,50.642-40.17,77.986-42.086c4.619,31.149-8.093,61.498-24.826,82.965 C309.37,106.527,278.508,124.411,248.644,123.476z M409.034,231.131c8.461-23.606,25.223-44.845,51.227-59.175 c-26.278-32.792-63.173-51.83-97.99-51.83c-46.065,0-65.542,21.947-97.538,21.947c-32.96,0-57.965-21.947-97.866-21.947 c-39.127,0-80.776,23.848-107.19,64.577c-9.712,15.055-16.291,33.758-19.879,54.59c-9.956,58.439,4.916,134.557,49.279,202.144 c21.57,32.796,50.321,69.737,87.881,70.059c33.459,0.327,42.951-21.392,88.246-21.616c45.362-0.258,53.959,21.841,87.372,21.522 c37.571-0.317,67.906-41.199,89.476-73.991c15.359-23.532,21.167-35.418,33.11-62.023 C414.435,352.487,389.459,285.571,409.034,231.131z"> </path> </g> </g></svg>
                        </Button>
                    </div>
                    <p className='mt-3 text-right'>Don't have an account?
                        <Link className='ml-1 text-sky-500 hover:text-sky-800' href='/sign-up'>Sign up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignIn