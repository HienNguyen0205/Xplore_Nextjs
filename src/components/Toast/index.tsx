import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { Snackbar, Slide, SlideProps, Alert } from '@mui/material';

type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = (props : TransitionProps) => {
    return <Slide {...props} direction="right" />;
}

const Toast = () => {

    const [ open, setOpen ] = useState<boolean>(false)
    const { message, status } = useAppSelector(state => state.toast)

    useEffect(() => {
        if(message !== ''){
            setOpen(true)
        }
    }, [message, status])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            autoHideDuration={5000}
            anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}
        >
            <Alert severity={status} sx={{maxWidth: '200px'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast