import React from "react";
import styles from '@/styles/Button.module.scss'
import { Button } from '@mui/material'
import { buttonProps } from "@/utils/types";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/router";

const theme = createTheme({
    palette: {
        primary: {
            main: '#2979ff',
            light: '#448aff',
            dark: '#2962ff',
            contrastText: '#fff'
        },
        secondary: {
            main: '#1de9b6',
            light: '#64ffda',
            dark: '#00bfa5',
            contrastText: '#fff'
        },
    }
})

const ButtonCOM = (props: buttonProps) => {

    const { children, link, onClick, sx, variant = 'contained', color = 'primary' } = props

    const router = useRouter()

    return (
        <ThemeProvider theme={theme}>
            <Button sx={{ position: 'relative', ...sx }} onClick={link ? () => router.push(link) : onClick} variant={variant} color={color}>
                <div className={styles.custom_btn}>
                    {children}
                </div>
            </Button>
        </ThemeProvider>
    )
}

export default ButtonCOM