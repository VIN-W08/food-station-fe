/** @jsxImportSource @emotion/react */
import { CircularProgress } from '@mui/material'
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { View } from './View'

export const ProgressIndicator = () => {
    return (
        <View css={styles.container}>
            <CircularProgress thickness={5} />
        </View>
    )
}

const styles = createStyles({
    container: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
})