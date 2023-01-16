/** @jsxImportSource @emotion/react */
import { Card, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Colors } from '../../design/Colors'
import { addOrder, orderActions } from '../../features/orderSlice'
import { createStyles } from '../../hooks/createStyles'
import { AppButton } from '../common/AppButton'
import { AppModal } from '../common/AppModal'
import { AppTable, TableLayout } from '../common/AppTable'
import { Icon } from '../common/Icon'
import { AppIconButton } from '../common/AppIconButton'
import { TextInput } from '../common/TextInput'
import { TextWithLabel } from '../common/TextWithLabel'
import { View } from '../common/View'
import { routes } from '../../router/Routes'
import { IOrderFood } from '../../interfaces/IOrder'
import { getSubtotal } from '../../helper/MathHelper'
import { HorizontalLine } from '../common/HorizontalLine'

const checkoutTableLayout: TableLayout = [
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

const CheckoutPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { order } = useAppSelector(state => state.order)

    const onClickConfirm = async () => {
        const res = await dispatch(addOrder())
        if (res.meta.requestStatus === 'fulfilled') navigate(routes.orderStatus('successful'), { replace: true })
        else if (!res.meta.rejectedWithValue) navigate(routes.orderStatus('failed'))
    }

    return (
        <View css={styles.container}>
            <Icon
                name='arrow_back'
                css={styles.backButton}
                onClick={() => navigate(-1)}
            />
            <View css={styles.checkoutContainer}>
                <View>
                    <Typography variant='h5' css={styles.checkoutTitle}>Checkout</Typography>
                    <View css={styles.checkoutContentContainer}>
                        <View css={styles.checkoutInfoContainer}>
                            <Card css={styles.productContainer}>
                                <AppTable
                                    layout={checkoutTableLayout}
                                    data={order.foods.map(food => ({ ...food, subtotal: getSubtotal(food.price, food.qty) }))}
                                    keyProp='_id'
                                    css={styles.productTable}
                                />
                                <View css={styles.totalPayableContainer}>
                                    <Typography css={styles.totalPayableText}>Total Payable</Typography>
                                    <Typography>{`Rp ${order.totalPayable}`}</Typography>
                                </View>
                            </Card>
                            <RecipientProfile />
                        </View>
                        <View css={styles.confirmButtonContainer}>
                            <AppButton
                                onClick={onClickConfirm}
                                css={styles.confirmButton}
                            >
                                <View css={styles.confirmButtonContentContainer}>
                                    <Icon name='check_circle' css={styles.confirmIcon} />
                                    <Typography css={styles.confirmText}>Confirm</Typography>
                                </View>
                            </AppButton>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const RecipientProfile = () => {
    const { order, recipientProfileInput } = useAppSelector(state => state.order)
    const { address, recipientName, contactNumber } = order.recipient
    const dispatch = useAppDispatch()
    const [recipientInfoModalOpen, setRecipientInfoModalOpen] = useState(false)

    const onSubmitRecipientProfile = () => {
        dispatch(orderActions.setRecipientProfile())
        setRecipientInfoModalOpen(false)
    }

    return (
        <Card css={styles.recipientProfileContainer}>
            <View css={styles.recipientProfileHeader}>
                <Typography css={styles.recipientProfileTitle}>Recipient Profile</Typography>
                <AppIconButton
                    name='edit_note'
                    css={styles.editRecipientProfileButton}
                    onClick={() => setRecipientInfoModalOpen(true)}
                />
            </View>
            <HorizontalLine css={styles.recipientProfileTitleBreakLine} />
            <View>
                <TextWithLabel
                    label='Delivery Address'
                    value={address !== '' ? address : '-'}
                    css={styles.recipientProfileField}
                />
                <TextWithLabel
                    label='Contact Person'
                    value={recipientName !== '' ? recipientName : '-'}
                    css={styles.recipientProfileField}
                />
                <TextWithLabel
                    label='Contact Number'
                    value={contactNumber !== '' ? contactNumber : '-'}
                    css={styles.recipientProfileField}
                />
            </View>
            <AppModal
                open={recipientInfoModalOpen}
                title='Edit Recipient Profile'
                onOpen={() => dispatch(orderActions.initRecipientProfileInput())}
                onClose={() => setRecipientInfoModalOpen(false)}
                css={styles.modal}
            >
                <View>
                    <TextInput
                        name='address'
                        labelOutside='Delivery Address'
                        value={recipientProfileInput.address}
                        onChange={(value, name) => dispatch(orderActions.setRecipientProfileInput({
                            key: 'address',
                            value: value
                        }))}
                        isRequired
                        css={styles.textInputContainer}
                        inputStyle={styles.multilineTextInput}
                        isMultiline
                        maxRows={3}
                    />
                    <TextInput
                        name='recipient'
                        labelOutside='Recipient Name'
                        value={recipientProfileInput.recipientName}
                        onChange={(value, name) => dispatch(orderActions.setRecipientProfileInput({
                            key: 'recipientName',
                            value: value
                        }))}
                        isRequired
                        css={styles.textInputContainer}
                        inputStyle={styles.textInput}
                    />
                    <TextInput
                        name='contact-number'
                        labelOutside='Contact Number'
                        value={recipientProfileInput.contactNumber}
                        onChange={(value, name) => dispatch(orderActions.setRecipientProfileInput({
                            key: 'contactNumber',
                            value: value
                        }))}
                        isRequired
                        css={styles.textInputContainer}
                        inputStyle={styles.textInput}
                    />
                    <AppButton
                        onClick={onSubmitRecipientProfile}
                        css={styles.submitRecipientProfileButton}>
                        Submit
                    </AppButton>
                </View>
            </AppModal>
        </Card>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
    checkoutContainer: {
        width: '100%',
        margin: '0px 50px',
        marginBottom: 15
    },
    checkoutTitle: {
        fontWeight: 600,
        marginTop: 20,
        marginBottom: 15
    },
    checkoutContentContainer: {
        width: 'fit-content'
    },
    checkoutInfoContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    backButton: {
        fontSize: 25,
        marginLeft: 15,
        marginTop: 23,
        cursor: 'pointer'
    },
    productTable: {
        marginBottom: 25
    },
    productContainer: {
        height: 'fit-content',
        padding: '0 15px 15px 15px',
        marginRight: 15,
        boxShadow: '0 8px 24px',
        color: Colors.Manatee_02,
        border: '1px solid',
        borderColor: Colors.ChineseWhite,
        boxSizing: 'border-box'
    },
    recipientProfileContainer: {
        width: 320,
        height: 'fit-content',
        borderRadius: 5,
        padding: '16px 15px 0 15px',
        boxSizing: 'border-box',
        backgroundColor: Colors.White,
        boxShadow: '0 8px 24px',
        color: Colors.Manatee_02,
        border: '1px solid',
        borderColor: Colors.ChineseWhite
    },
    recipientProfileTitle: {
        fontSize: 15
    },
    recipientProfileTitleBreakLine: {
        marginBottom: 5,
        borderBottom: 'none',
        borderColor: Colors.ChineseWhite
    },
    recipientProfileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    recipientProfileField: {
        marginBottom: 15
    },
    editRecipientProfileIcon: {
        fontSize: 24
    },
    editRecipientProfileButton: {
        fontSize: 25
    },
    modal: {
        width: 430
    },
    textInputContainer: {
        width: '100%'
    },
    textInput: {
        height: 40,
        marginBottom: 10
    },
    multilineTextInput: {
        height: 80,
        marginBottom: 10
    },
    submitRecipientProfileButton: {
        marginTop: 25,
        height: 40
    },
    confirmButton: {
        width: 150,
        height: 45,
        backgroundColor: Colors.Kiwi,
        '&:hover': {
            backgroundColor: Colors.Kiwi
        }
    },
    confirmIcon: {
        fontSize: 18,
        marginRight: 8
    },
    confirmText: {
        color: Colors.White
    },
    confirmButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        marginTop: 60
    },
    confirmButtonContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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

export default CheckoutPage