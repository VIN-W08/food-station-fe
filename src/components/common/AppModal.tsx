/** @jsxImportSource @emotion/react */
import { Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { AppIconButton } from './AppIconButton'
import { View } from './View'

type Props = {
    open: boolean,
    title: string,
    onOpen?: () => void,
    onClose: () => void,
    children: React.ReactNode,
    className?: string | undefined
}

export const AppModal = ({ open, title, onOpen, onClose, children, className }: Props) => {
    useEffect(() => {
        if (open) {
            onOpen && onOpen()
        }
    }, [open])

    return (
        <Modal
            open={open}>
            <View css={styles.modal} className={className}>
                <View css={styles.modalHeader}>
                    <Typography variant='h6' css={styles.modalTitle}>{title}</Typography>
                    <AppIconButton
                        name='close'
                        css={styles.closeButton}
                        onClick={onClose}
                        disableFocusRipple
                    />
                </View>
                <View css={styles.modalBody}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = createStyles({
    modal: {
        width: '50%',
        height: 'fit-content',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 5,
        backgroundColor: Colors.AntiFlashWhite
    },
    modalHeader: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.SunGlow,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '5px 5px 0px 0px'
    },
    modalTitle: {
        fontWeight: '600',
        color: Colors.White
    },
    closeButton: {
        fontSize: 24,
        position: 'absolute',
        top: 5,
        right: 15,
        color: Colors.White,
    },
    modalBody: {
        padding: 15
    }
})
