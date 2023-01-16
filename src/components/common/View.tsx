/** @jsxImportSource @emotion/react */
import React from 'react'
import { createStyles } from '../../hooks/createStyles'

type Props = {
    children?: React.ReactNode,
    onClick?: () => void,
    className?: string | undefined,
    ref?: React.LegacyRef<HTMLDivElement> | undefined
}

export const View = ({ children, onClick, className, ref }: Props) => {
    return (
        <div
            onClick={onClick}
            css={styles.container}
            className={className}
            ref={ref}>
            {children}
        </div>
    )
}

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    }
})