/** @jsxImportSource @emotion/react */
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { View } from './View'

type Props = {
    name: string,
    className?: string | undefined,
    onClick?: () => void,
}

export const Icon = ({ name, className, onClick }: Props) => {
    return (
        <View css={styles.container} className={className}>
            <span className='material-icons' onClick={onClick} style={styles.icon}>
                {name}
            </span>
        </View >
    )
}

const styles = createStyles({
    container: {
        width: 'fit-content',
        height: 'fit-content'
    },
    icon: {
        fontSize: 'inherit',
    }
})