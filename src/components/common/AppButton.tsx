/** @jsxImportSource @emotion/react */
import { Button, SxProps, Theme } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'

type Variant = 'outlined' | 'contained' | 'text'
type ColorType = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type Props = {
    children: React.ReactNode,
    variant?: Variant,
    colorType?: ColorType,
    className?: string | undefined,
    sx?: SxProps<Theme> | undefined,
    onClick: () => void
}
export const AppButton = ({
    children,
    variant = 'contained',
    colorType = 'secondary',
    className,
    sx,
    onClick
}: Props
) => {
    return (
        <Button
            variant={variant}
            css={styles.button}
            color={colorType}
            className={className}
            onClick={onClick}
            sx={sx}>
            {children}
        </Button >
    )
}

const styles = createStyles({
    button: {
        borderRadius: 50,
        boxShadow: 'none',
        color: Colors.White
    }
})