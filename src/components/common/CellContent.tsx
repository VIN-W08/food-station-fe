/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { AppImage } from './AppImage'
import { Counter } from './Counter'
import { ManageCell, ManageCellLayout } from './ManageCell'
import { ProductCell } from './ProductCell'
import { View } from './View'

export type CellType = 'text' | 'number' | 'currency' | 'image-base64' | 'product' | 'counter' | 'manage'
export type ManageType = 'increase-qty' | 'decrease-qty' | 'remove' | 'button-label'
type Props = {
    data: any,
    keyProp: string,
    prop: string,
    type?: CellType,
    manageCellLayout?: ManageCellLayout,
    onManage?: (type: ManageType, id: any) => void,
    onClick?: (type: string) => void
}

export const CellContent = ({
    data,
    keyProp,
    prop,
    type = 'text',
    manageCellLayout,
    onManage,
    onClick
}: Props) => {
    if (type === 'currency') {
        return (
            <View>
                <Typography>{`Rp ${data[prop]}`}</Typography>
            </View>
        )
    }
    if (type === 'image-base64') {
        return (
            <AppImage
                src={data[prop]}
                alt=''
                isBase64
            />
        )
    }
    if (type === 'product') {
        return (
            <>
                {data && <ProductCell data={data} />}
            </>
        )
    }
    if (type === 'counter') {
        return (
            <Counter
                value={data[prop]}
                onClickIncreaseButton={() => onManage && onManage('increase-qty', data[keyProp])}
                onClickDecreaseButton={() => onManage && onManage('decrease-qty', data[keyProp])}
            />
        )
    }
    if (type === 'manage') {
        return (
            <>
                {manageCellLayout &&
                    <ManageCell
                        manageCellLayout={manageCellLayout}
                        onManage={(type) => onManage && onManage(type, data)}
                    />}
            </>
        )
    }

    return (
        <View>
            <Typography>{data[prop]}</Typography>
        </View>
    )
}