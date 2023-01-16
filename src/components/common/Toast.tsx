import { Snackbar } from '@mui/material'
import React from 'react'

type Props = {
    open: boolean,
    message: React.ReactNode,
    autoHideDuration?: number,
    onClose?: () => void
}
export const Toast = ({
    open,
    message,
    autoHideDuration,
    onClose
}: Props) => {
    return (
        <Snackbar
            open={open}
            message={message}
            autoHideDuration={autoHideDuration ?? 3000}
            onClose={() => onClose && onClose()}
            sx={overrideStyles.snackbar}
        />
    )
}

const overrideStyles = {
    snackbar: {
        '&.MuiSnackbar-root': {
            top: 24,
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%, 0)'
        }
    }
}