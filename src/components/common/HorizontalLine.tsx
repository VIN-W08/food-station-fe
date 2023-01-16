/** @jsxImportSource @emotion/react */
import React from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'

type Props = {
    className?: string
}

export const HorizontalLine = ({ className }: Props) => {
    return (
        <hr css={styles.line} className={className} />
    )
}

const styles = createStyles({
    line: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: Colors.ChineseWhite
    }
})