/** @jsxImportSource @emotion/react */
import { Icon } from '../common/Icon'
import React from 'react'
import { View } from './View'
import { OutlinedInput, SxProps } from '@mui/material'
import { Colors } from '../../design/Colors'
import { theme } from '../../design/Theme'
import { createStyles } from '../../hooks/createStyles'

type TextInputType = 'text' | 'password' | 'email'

type Props = {
    name: string
    type?: TextInputType
    value: string
    placeholder?: string
    labelOutside?: string
    isMultiline?: boolean
    maxRows?: number
    isRequired?: boolean
    iconLeft?: string
    iconRight?: string
    onClickIconLeft?: () => void
    onClickIconRight?: () => void
    onChange?: (value: string, name: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onEnter?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    className?: string | undefined,
    inputStyle?: React.CSSProperties,
    sx?: SxProps
}
export const TextInput = ({
    name,
    type = 'text',
    value,
    placeholder,
    labelOutside,
    isMultiline,
    maxRows,
    isRequired = false,
    iconLeft,
    iconRight,
    onClickIconLeft,
    onClickIconRight,
    onChange,
    onEnter,
    className,
    inputStyle,
    sx
}: Props) => {

    return (
        <View css={styles.container} className={className}>
            {labelOutside &&
                <div css={styles.labelContainer}>
                    <label>{labelOutside} </label>
                    {isRequired && <span css={styles.required}>*</span>}
                </div>}
            <OutlinedInput
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange && onChange(event.target.value, event.target.name, event)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        if (onEnter) {
                            onEnter(event)
                        }
                    }
                }}
                css={{
                    ...styles.input,
                    height: !isMultiline ? 45 : undefined,
                    alignItems: !isMultiline ? 'center' : 'flex-start'
                }}
                // className={className}
                style={inputStyle}
                sx={overrideStyles.input}
                startAdornment={iconLeft && <Icon name={iconLeft} css={styles.iconButton} onClick={() => onClickIconLeft && onClickIconLeft()} />}
                endAdornment={iconRight && <Icon name={iconRight} css={styles.iconButton} onClick={() => onClickIconRight && onClickIconRight()} />}
                multiline={isMultiline}
                maxRows={maxRows}
            />
        </View>
    )
}

const styles = createStyles({
    container: {
        width: 'fit-content',
        borderRadius: 10
    },
    input: {
        width: '100%',
        borderRadius: 'inherit',
        fontSize: 14,
        backgroundColor: Colors.White
    },
    labelContainer: {
        fontSize: 16,
        marginBottom: 5
    },
    required: {
        color: theme.palette.error.main
    },
    iconButton: {
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: 24
    }
})

const overrideStyles = {
    input: {
        '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.Gray,
            borderWidth: 1
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.Gray,
            borderWidth: 1.5
        }
    }
}