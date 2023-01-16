/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { AppImage } from './AppImage'
import { View } from './View'

type Props = {
    data: any
}

export const ProductCell = ({ data }: Props) => {
    return (
        <View css={styles.productContainer}>
            <AppImage src={data['image']} alt={data['name']} isBase64 css={styles.productImg} />
            <View css={styles.productInfoContainer}>
                <Typography css={styles.productId}>ID: {data['_id']}</Typography>
                <Typography css={styles.productName}>{data['name']}</Typography>
                <Typography css={styles.productNote}>{data['note']}</Typography>
            </View>
        </View>
    )
}

const styles = createStyles({
    productContainer: {
        flexDirection: 'row'
    },
    productInfoContainer: {
        marginLeft: 15,
        marginTop: 10
    },
    productId: {
        fontSize: 12
    },
    productImg: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        backgroundColor: 'black',
        borderRadius: 5,
    },
    productName: {
        width: 200,
        lineClamp: 2,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    productNote: {
        width: 200,
        fontSize: 13,
        lineClamp: 2,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 15,
        color: Colors.SpanishGray
    }
})