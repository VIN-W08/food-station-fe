/** @jsxImportSource @emotion/react */
import { Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getOrderById, orderActions } from '../../features/orderSlice'
import { createStyles } from '../../hooks/createStyles'
import { Icon } from '../common/Icon'
import { View } from '../common/View'
import date from 'date-and-time'
import { Colors } from '../../design/Colors'
import { TextWithLabel } from '../common/TextWithLabel'
import { OrderStatusLabel } from './OrderStatusLabel'
import { AppTable, TableLayout } from '../common/AppTable'
import { HorizontalLine } from '../common/HorizontalLine'

const productsTableLayout: TableLayout = [
    {
        label: 'Product',
        prop: 'product',
        type: 'product',
        align: 'left'
    },
    {
        label: 'Qty',
        prop: 'qty',
        type: 'number',
        align: 'center'
    },
    {
        label: 'Price',
        prop: 'price',
        type: 'currency',
        align: 'center'
    },
    {
        label: 'Subtotal',
        prop: 'subtotal',
        type: 'currency',
        align: 'center'
    }
]

const OrderDetailPage = () => {
    const params = useParams()
    const { id } = params
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { selectedOrder } = useAppSelector(state => state.order)

    useEffect(() => {
        if (id) dispatch(getOrderById(id))
        return () => {
            dispatch(orderActions.initSelectedOrder())
        }
    }, [])

    const currentDateTime = selectedOrder?.created_at && new Date(selectedOrder.created_at)
    const currentDateTimeString = currentDateTime && date.format(currentDateTime, 'DD MMMM YYYY, HH.mm')

    return (
        <View css={styles.container}>
            <Icon
                name='arrow_back'
                css={styles.backButton}
                onClick={() => navigate(-1)}
            />
            {selectedOrder ?
                <View css={styles.orderDetailContainer}>
                    <View css={styles.topContainer}>
                        <View css={styles.orderIdTitleContainer}>
                            <Typography variant='h1' css={styles.orderIdTitle}>Order ID:</Typography>
                            <Typography variant='h1' css={styles.orderIdValue}>{`${selectedOrder._id}`}</Typography>
                        </View>
                        <Typography variant='body1'>{currentDateTimeString}</Typography>
                    </View>
                    {selectedOrder.status !== null &&
                        <View css={styles.statusRow}>
                            <View css={styles.statusContainer}>
                                <Typography css={styles.statusTitle}>Status:</Typography>
                                <OrderStatusLabel status={selectedOrder.status} />
                            </View>
                        </View>}
                    <View css={styles.productsAndRecipientProfileContainer}>
                        <Card css={styles.productContainer}>
                            <AppTable
                                layout={productsTableLayout}
                                data={selectedOrder.foods}
                                keyProp='_id'
                                css={styles.productsTable}
                            />
                            <View css={styles.totalPayableContainer}>
                                <Typography css={styles.totalPayableText}>Total Payable</Typography>
                                <Typography>{`Rp ${selectedOrder.totalPayable}`}</Typography>
                            </View>
                        </Card>
                        <Card css={styles.recipientProfileContainer}>
                            <Typography css={styles.recipientProfileTitle}>Recipient Profile</Typography>
                            <HorizontalLine css={styles.recipientProfileTitleBreakLine} />
                            <TextWithLabel
                                label='Delivery Address'
                                value={selectedOrder.recipient.address}
                                css={styles.recipientProfileField}
                            />
                            <TextWithLabel
                                label='Contact Person'
                                value={selectedOrder.recipient.recipientName}
                                css={styles.recipientProfileField}
                            />
                            <TextWithLabel
                                label='Contact Number'
                                value={selectedOrder.recipient.contactNumber}
                                css={styles.recipientProfileField}
                            />
                        </Card>
                    </View>
                </View> :
                <View></View>
            }
        </View>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70
    },
    backButton: {
        fontSize: 25,
        marginLeft: 15,
        marginTop: 23,
        cursor: 'pointer'
    },
    orderDetailContainer: {
        width: '100%',
        margin: '0px 100px'
    },
    orderIdTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderIdTitle: {
        fontSize: 20,
        marginRight: 5
    },
    orderIdValue: {
        fontSize: 17,
        marginLeft: 5
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusTitle: {
        marginRight: 10
    },
    topContainer: {
        marginTop: 23,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'fit-content',
        marginBottom: 15
    },
    recipientProfileContainer: {
        width: 320,
        height: 'fit-content',
        padding: '16px 15px 0 15px',
        boxShadow: '0 8px 24px',
        color: Colors.Manatee_02,
        boxSizing: 'border-box',
        border: '1px solid',
        borderColor: Colors.ChineseWhite
    },
    productContainer: {
        height: 'fit-content',
        padding: '0 15px 15px 15px',
        marginRight: 15,
        boxShadow: '0 8px 24px',
        color: Colors.Manatee_02,
        border: '1px solid',
        borderColor: Colors.ChineseWhite
    },
    recipientProfileTitle: {
        fontSize: 15,
        marginBottom: 16
    },
    recipientProfileTitleBreakLine: {
        marginBottom: 5,
        borderBottom: 'none',
        borderColor: Colors.ChineseWhite
    },
    recipientProfileField: {
        marginBottom: 15
    },
    productsTable: {
        marginBottom: 25
    },
    productsAndRecipientProfileContainer: {
        flexDirection: 'row',
    },
    totalPayableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 8px 0 8px'
    },
    totalPayableText: {
        marginBottom: 10
    }
})

export default OrderDetailPage