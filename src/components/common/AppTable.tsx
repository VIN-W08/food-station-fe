/** @jsxImportSource @emotion/react */
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow } from '@mui/material'
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { CellContent, CellType, ManageType } from './CellContent'
import { ManageCellLayout } from './ManageCell'

export type TableLayout = {
    label: string
    prop: string
    type: CellType
    align: 'left' | 'center' | 'right'
}[]

type Props = {
    layout: TableLayout,
    data: any[],
    className?: string | undefined,
    keyProp: string,
    manageCellStructure?: ManageCellLayout[],
    onManage?: (type: ManageType, id: any) => void,
}

export const AppTable = ({
    layout,
    data,
    className,
    keyProp,
    manageCellStructure,
    onManage
}: Props) => {
    console.log(data)
    const AppTableHeader = ({ layout }: { layout: TableLayout }) => {
        return (
            <TableHead>
                <TableRow>
                    {layout.map(col => (
                        <TableCell
                            align={col.align}>
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    const AppTableRow = ({ data }: { data: any }) => {
        return (
            <TableBody>
                <TableRow>
                    {layout.map(col => (
                        <TableCell
                            align={col.align}
                            css={styles.tableCell}>
                            <CellContent
                                data={data}
                                keyProp={keyProp}
                                prop={col.prop}
                                type={col.type}
                                manageCellLayout={manageCellStructure && manageCellStructure.find(cellLayout => cellLayout.key === col.prop)}
                                onManage={onManage}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            </TableBody>
        )
    }

    return (
        <TableContainer className={className}>
            <Table>
                <AppTableHeader layout={layout} />
                {data.map(el => (<AppTableRow data={el} />))}
            </Table>
        </TableContainer>
    )
}

const styles = createStyles({
    tableCell: {
        padding: 10
    }
})