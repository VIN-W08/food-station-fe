/** @jsxImportSource @emotion/react */
import { Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStyles } from '../../hooks/createStyles'
import { Icon } from '../common/Icon'
import { View } from '../common/View'
import { IOrder, IOrderFood } from '../../interfaces/IOrder'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getOrderList } from '../../features/orderSlice'
import date from 'date-and-time'
import { OrderStatusLabel } from './OrderStatusLabel'
import { Colors } from '../../design/Colors'
import { routes } from '../../router/Routes'

const OrderListPage = () => {
    const navigate = useNavigate()

    return (
        <View css={styles.container}>
            <Icon
                name='arrow_back'
                css={styles.backButton}
                onClick={() => navigate(-1)}
            />
            <View css={styles.orderContainer}>
                <Typography variant='h5' css={styles.orderTitle}>Order</Typography>
                <View>
                    <OrderList />
                </View>
            </View>
        </View>
    )
}

const OrderList = () => {
    const dispatch = useAppDispatch()
    const { orderList } = useAppSelector(state => state.order)

    useEffect(() => {
        dispatch(getOrderList())
    }, [])

    return (
        <View>
            {orderList.map(order => (<OrderListItem order={order} />))}
        </View>
    )
}

const OrderListItem = ({ order }: { order: IOrder }) => {
    const navigate = useNavigate()
    const getFoodNameList = (foods: IOrderFood[]): string =>
        foods
            .map(food => `${food.qty} ${food.name}`)
            .join(', ')
            .trim()
    const currentDateTime = order.created_at && new Date(order.created_at)
    const currentDateTimeString = currentDateTime && date.format(currentDateTime, 'DD MMM YYYY, HH.mm')

    const onClickItem = () => navigate(routes.orderDetail(order._id))

    return (
        <Card css={styles.orderItemContainer} onClick={onClickItem}>
            <View css={styles.topContainer}>
                <Typography css={styles.timeStamp}>{order.created_at ? currentDateTimeString : ''}</Typography>
                <Typography css={styles.orderId}>{`ID: ${order._id}`}</Typography>
            </View>
            <View css={styles.bottomContainer}>
                <View>
                    <Typography css={styles.itemsTitle}>Items:</Typography>
                    <Typography>{getFoodNameList(order.foods)}</Typography>
                </View>
                <View css={styles.statusAndPriceContainer}>
                    {order.status !== null && <OrderStatusLabel css={styles.orderStatusLabel} status={order.status} />}
                    <Typography css={styles.totalPayable}>{`Rp ${order.totalPayable}`}</Typography>
                </View>
            </View>
        </Card>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
    backButton: {
        fontSize: 25,
        marginLeft: 15,
        marginTop: 23,
        cursor: 'pointer'
    },
    orderContainer: {
        width: '100%',
        margin: '0px 100px'
    },
    orderTitle: {
        fontWeight: 600,
        marginTop: 20,
        marginBottom: 15
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderItemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 15,
        height: 'fit-content',
        cursor: 'pointer',
        boxShadow: '0 8px 24px',
        color: Colors.Manatee_02,
        border: '1px solid',
        borderColor: Colors.ChineseWhite
    },
    totalPayable: {
        fontSize: 18
    },
    itemsTitle: {
        fontWeight: 600,
        fontSize: 15
    },
    statusAndPriceContainer: {
        justifyContent: 'center'
    },
    timeStamp: {
        fontSize: 14
    },
    orderId: {
        fontSize: 14
    },
    orderStatusLabel: {
        marginBottom: 15
    },
    orderItemSkeleton: {
        height: 140,
        borderRadius: 5,
        marginBottom: 15
    }
})

export default OrderListPage