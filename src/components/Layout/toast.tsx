import React from "react";
import { Snackbar, Slide, SlideProps, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { removeToast } from '@/Redux/reducers/toast'

type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = (props : TransitionProps) => {
    return <Slide {...props} direction="right" />;
}

const Toast = () => {

    const { message, status } = useAppSelector(state => state.toast)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(removeToast())
    }

    return (
        <Snackbar
            open={message !== ''}
            onClose={handleClose}
            TransitionComponent={Transition}
            autoHideDuration={6000}
            anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}
        >
            <Alert severity={status} sx={{maxWidth: '200px'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast