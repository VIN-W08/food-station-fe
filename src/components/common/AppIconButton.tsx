/** @jsxImportSource @emotion/react */
import { Button, IconButton } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { Icon } from './Icon'

type Props = {
    name: string,
    className?: string | undefined,
    onClick: () => void,
    disableFocusRipple?: boolean
}
export const AppIconButton = ({ name, className, onClick, disableFocusRipple = false }: Props) => {
    return (
        <IconButton onClick={onClick} name={`${name}-icon`} className={className} disableFocusRipple={disableFocusRipple}>
            <Icon name={name} />
        </IconButton>
    )
}

const styles = createStyles({
    container: {
        fontSize: 24,
        minWidth: 0,
        borderRadius: '50%'
    },
    icon: {
        fontSize: 'inherit',
        color: Colors.OuterSpace
    }
})



