/** @jsxImportSource @emotion/react */
import React from 'react'
import { AppButton } from './AppButton'
import { ManageType } from './CellContent'
import { Icon } from './Icon'
import { AppIconButton } from './AppIconButton'
import { Tooltip } from '@mui/material'

export type ManageCellLayout = {
    key: string,
    layout: {
        icon?: string,
        label?: string,
        manageType: ManageType,
        iconColor?: string,
    }[]
}

type Props = {
    manageCellLayout: ManageCellLayout,
    onManage: (type: ManageType) => void
}

export const ManageCell = ({ manageCellLayout, onManage }: Props) => {

    return (
        <>
            {manageCellLayout.layout.map(cellPart => (
                <Tooltip title={cellPart.label}>
                    <>
                        {cellPart.manageType === 'button-label' ?
                            <AppButton
                                onClick={() => onManage(cellPart.manageType)}
                            >
                                {cellPart.icon && <Icon name={cellPart.icon} css={{ color: cellPart.iconColor }} />}
                                {cellPart.label}
                            </AppButton> :
                            cellPart.icon &&
                            <AppIconButton
                                name={cellPart.icon}
                                onClick={() => onManage(cellPart.manageType)}
                                css={{ color: cellPart.iconColor }}
                            />}
                    </>
                </Tooltip>
            ))}
        </>
    )
}