/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { AppIconButton } from './AppIconButton'
import { View } from './View'

type Props = {
    value: number,
    onClickDecreaseButton: () => void,
    onClickIncreaseButton: () => void,
    className?: string
}

export const Counter = ({
    value,
    onClickDecreaseButton,
    onClickIncreaseButton,
    className
}: Props) => {
    return (
        <View css={styles.counterContainer} className={className}>
            <AppIconButton name='remove' css={styles.counterButton} onClick={onClickDecreaseButton} />
            <Typography>{value}</Typography>
            <AppIconButton name='add' css={styles.counterButton} onClick={onClickIncreaseButton} />
        </View>
    )
}

const styles = createStyles({
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterButton: {
        backgroundColor: Colors.OuterSpace,
        color: Colors.White,
        fontSize: 10,
        margin: '0px 10px',
        '&:hover': {
            backgroundColor: Colors.Gray
        }
    }
})

