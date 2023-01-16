/** @jsxImportSource @emotion/react */
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { View } from '../common/View'
import Done from '../../assets/images/done.svg'
import { AppImage } from '../common/AppImage'
import { Typography } from '@mui/material'
import { InitOrderStatus } from '../../interfaces/IOrder'
import { useNavigate, useParams } from 'react-router-dom'
import { AppButton } from '../common/AppButton'
import { routes } from '../../router/Routes'
import { Colors } from '../../design/Colors'

const OrderStatusPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { status } = params

    const statusToImageMap = new Map<InitOrderStatus, string>([
        ['successful', Done],
        ['failed', Done]
    ])
    const statusText = status ? status.charAt(0).toUpperCase() + status.slice(1) : null
    const actionText = status === 'successful' ? 'View Orders' : 'Go Back'
    const onClickAction = () => status === 'successful' ? navigate(routes.orderList, { replace: true }) : navigate(-1)

    return (
        <View css={styles.container}>
            {statusText &&
                <>
                    <View css={styles.statusContainer}>
                        <Typography variant='h5' css={styles.statusText}>{`Order ${statusText}`}</Typography>
                        <AppImage src={statusToImageMap.get(status as InitOrderStatus) as string} alt='done' css={styles.statusImg} />
                    </View>
                    <AppButton onClick={onClickAction} css={styles.actionButton}>
                        <Typography css={styles.actionText}>{actionText}</Typography>
                    </AppButton>
                </>
            }
        </View>
    )
}

const styles = createStyles({
    container: {
        minHeight: '100vh',
        marginTop: 70,
        alignItems: 'center'
    },
    statusContainer: {
        marginTop: 35,
        alignItems: 'center'
    },
    statusImg: {
        width: 350
    },
    statusText: {
        fontSize: 28,
        marginBottom: 50
    },
    actionButton: {
        width: 150,
        marginTop: 35
    },
    actionText: {
        color: Colors.White
    }
})

export default OrderStatusPage