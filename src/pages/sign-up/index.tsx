/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Meta from '@/components/Layout/meta'
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify'

const nameRegex = /^[a-zA-Z]{4,30}(?: [a-zA-Z]+){0,5}$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const telRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/

const SignUp  = () : JSX.Element => {

    const [nameMes, setNameMes] = useState<String>('')
    const [emailMes, setEmailMes] = useState<String>('')
    const [passMes, setPassMes] = useState<String>('')
    const [confirmPassMes, setConfirmPassMes] = useState<String>('')
    const [telMes, setTelMes] = useState<String>('')
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)
    const telRef = useRef<HTMLInputElement>(null)

    const resetErrMes = () => {
        if(nameMes !== ''){
            setNameMes('')
        }
        if(emailMes !== ''){
            setEmailMes('')
        }
        if(passMes !== ''){
            setPassMes('')
        }
        if(confirmPassMes !== ''){
            setConfirmPassMes('')
        }
        if(telMes !== ''){
            setTelMes('')
        }
    }

    const validate = () => {
        if(nameRef.current && emailRef.current && passRef.current && confirmPassRef.current && telRef.current) {
            const name = nameRef.current.value.trim()
            const email = emailRef.current.value.trim()
            const password = passRef.current.value.trim()
            const confirmPass = confirmPassRef.current.value.trim()
            const tel = telRef.current.value.trim()
            let flag = true
            resetErrMes()
            if(name === ''){
                flag = false
                setNameMes('Please enter your name')
            }else if(!nameRegex.test(name)){
                flag = false
                setNameMes('Invalid name')
            }
            if(email === ''){
                flag = false
                setEmailMes('Please enter your email')
            }else if(!emailRegex.test(email)){
                flag = false
                setEmailMes('Invalid email')
            }
            if(password === ''){
                flag = false
                setPassMes('Please enter your password')
            }else if(!passwordRegex.test(password)){
                flag = false
                setPassMes('Invalid password')
            }
            if(confirmPass === ''){
                flag = false
                setConfirmPassMes('Please enter confirm password')
            }else if(confirmPass !== password){
                flag = false
                setConfirmPassMes('Wrong confirm password')
            }
            if(tel === ''){
                flag = false
                setTelMes('Please enter your phone number')
            }else if(!telRegex.test(tel)){
                flag = false
                setTelMes('Invalid phone number')
            }
            if(flag){
                axios.post('/api/signUp/sign-up', {
                    name: name,
                    email: email,
                    password: password,
                    tel: tel,
                }).then(res => {
                    if(res.data.status === 'success'){
                        toast.success('Register successful!')
                        signIn()
                    }else{
                        toast.success('Register fail!')
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
                title: 'Xplore | Sign up',
                description: "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure."
            }}/>
            <div id='log_bg' className='w-100 h-screen flex flex-col justify-around items-center'>
                <Image className='w-[160px]' src={require('@/assets/images/Logo/XPLORE_logo.png')} alt=''/>
                <div className='p-5 bg-gray-50 opacity-90 w-[440px] rounded-md'>
                    <h1 className='text-4xl font-bold text-center mb-5 mt-3'>Register</h1>
                    <TextField sx={{margin: '8px 0'}} label="Full name" variant="outlined" fullWidth autoFocus 
                        placeholder='Enter your name' type='text' inputRef={nameRef} required
                        error={nameMes !== ''} helperText={nameMes}/>
                    <TextField sx={{margin: '8px 0'}} label="Email" variant="outlined" fullWidth autoFocus 
                        placeholder='Enter your email' type='email' inputRef={emailRef} required
                        error={emailMes !== ''} helperText={emailMes}/>
                    <TextField sx={{margin: '8px 0'}} label="Password" variant="outlined" fullWidth 
                        placeholder='Enter your password' type='password' inputRef={passRef} required
                        error={passMes !== ''} helperText={passMes}/>
                    <TextField sx={{margin: '8px 0'}} label="Confirm Password" variant="outlined" fullWidth 
                        type='password' inputRef={confirmPassRef} required
                        error={confirmPassMes !== ''} helperText={confirmPassMes}/>
                    <TextField sx={{margin: '8px 0'}} label="Phone number" variant="outlined" fullWidth 
                        placeholder='Enter your phone number' type='tel' inputRef={telRef} required
                        error={telMes !== ''} helperText={telMes}/>
                    <Button fullWidth variant="contained" sx={{margin: '0.5rem 0'}} size='large'
                        onClick={() => validate()}
                    >Register</Button>
                    <p className='mt-3 text-right'>Already have an account?
                        <span className='ml-1 text-sky-500 hover:text-sky-800' onClick={() => signIn()}>Sign in</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignUp