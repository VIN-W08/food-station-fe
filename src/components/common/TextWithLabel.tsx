/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { View } from './View'

type Props = {
    label: string,
    value: string,
    className?: string
}

export const TextWithLabel = ({ label, value, className }: Props) => {
    return (
        <View className={className}>
            <Typography css={styles.label}>{label}</Typography>
            <Typography>{value}</Typography>
        </View>
    )
}

const styles = createStyles({
    label: {
        // fontWeight: 600,
        color: Colors.SpanishGray
    }
})