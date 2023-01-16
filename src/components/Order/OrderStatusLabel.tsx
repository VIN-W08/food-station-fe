/** @jsxImportSource @emotion/react */
import { Chip, Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { orderStatusCodeToTextMap } from '../../features/orderSlice'
import { View } from '../common/View'

type Props = {
    status: number,
    className?: string
}

const orderStatusCodeToBackgroundColorMap = new Map<number, string>([
    [0, Colors.LightGoldenrodYellow],
    [1, Colors.LightGoldenrodYellow],
    [2, Colors.LightGoldenrodYellow],
    [3, Colors.SpanishViridian]
])

const orderStatusCodeToTextColorMap = new Map<number, string>([
    [0, Colors.DeepLemon],
    [1, Colors.DeepLemon],
    [2, Colors.DeepLemon],
    [3, Colors.TeaGreen]
])

export const OrderStatusLabel = ({ status, className }: Props) => {
    return (
        <Chip
            label={<OrderStatusText status={status} />}
            css={{
                border: '1px solid',
                borderColor: orderStatusCodeToTextColorMap.get(status),
                backgroundColor: orderStatusCodeToBackgroundColorMap.get(status)
            }}
            variant='filled'
            className={className}
        />
    )
}

const OrderStatusText = ({ status }: Props) => {
    const statusText = orderStatusCodeToTextMap.get(status)
    return (
        <View>
            {statusText &&
                <Typography css={{
                    ...styles.statusText,
                    color: orderStatusCodeToTextColorMap.get(status)

                }}>
                    {`${statusText[0].toUpperCase()}${statusText.slice(1)}`}
                </Typography>}
        </View>
    )
}

const styles = {
    statusText: {
        fontSize: 13
    }
}