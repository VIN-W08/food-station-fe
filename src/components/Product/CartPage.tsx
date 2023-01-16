/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Colors } from '../../design/Colors'
import { orderActions } from '../../features/orderSlice'
import { createStyles } from '../../hooks/createStyles'
import { AppButton } from '../common/AppButton'
import { AppTable, TableLayout } from '../common/AppTable'
import { Icon } from '../common/Icon'
import { ManageCellLayout } from '../common/ManageCell'
import { View } from '../common/View'
import EmptyCart from '../../assets/images/empty_cart.svg'
import { routes } from '../../router/Routes'
import { AppImage } from '../common/AppImage'

const cartTableLayout: TableLayout = [
    {
        label: 'Product',
        prop: 'product',
        type: 'product',
        align: 'left'
    },
    {
        label: 'Qty',
        prop: 'qty',
        type: 'counter',
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
    },
    {
        label: '',
        prop: 'remove',
        type: 'manage',
        align: 'center'
    }
]

const manageCellStructure: ManageCellLayout[] = [
    {
        key: 'remove',
        layout: [
            {
                icon: 'cancel',
                label: 'Remove',
                manageType: 'remove',
                iconColor: Colors.MaximumRed
            }
        ]
    }
]

const CartPage = () => {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { cart } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch()

    const getTotalPayable = () => {
        return cart.reduce((sum, current) => sum + current.subtotal, 0)
    }

    const onClickCheckoutButton = () => {
        navigate(routes.checkout)
        dispatch(orderActions.initOrderFromCart(user._id))
    }

    return (
        <View css={styles.container}>
            <Icon
                name='arrow_back'
                css={styles.backButton}
                onClick={() => navigate(-1)}
            />
            <View css={styles.cartContainer}>
                <Typography variant='h5' css={styles.cartTitle}>Cart</Typography>
                {cart.length !== 0 ?
                    <View>
                        <View>
                            <AppTable
                                layout={cartTableLayout}
                                data={cart}
                                keyProp='_id'
                                manageCellStructure={manageCellStructure}
                                onManage={(type, id) => {
                                    if (type === 'increase-qty') {
                                        dispatch(orderActions.increaseItemCount(id))
                                    } else if (type === 'decrease-qty') {
                                        dispatch(orderActions.decreaseItemCount(id))
                                    } else if (type === 'remove') {
                                        dispatch(orderActions.removeCartItem(id))
                                    }
                                }}
                            />
                            <View css={styles.totalPayableContainer}>
                                <Typography css={styles.totalPayableTitle}>Total Payable</Typography>
                                <Typography css={styles.totalPayablePrice}>{`Rp ${getTotalPayable()}`}</Typography>
                            </View>
                        </View>
                        <View css={styles.checkoutButtonContainer}>
                            <AppButton
                                onClick={onClickCheckoutButton}
                                css={styles.checkoutButton}
                            >
                                <View css={styles.checkoutButtonContentContainer}>
                                    <Icon name='shopping_cart_checkout' css={styles.checkoutIcon} />
                                    <Typography css={styles.checkoutText}>Checkout</Typography>
                                </View>
                            </AppButton>
                        </View>
                    </View> :
                    <EmptyCartContent />}
            </View>
        </View>
    )
}

const EmptyCartContent = () => {
    return (
        <View css={styles.emptyCartContainer}>
            <AppImage src={EmptyCart} alt='empty_cart' css={styles.emtpyCartImg} />
            <Typography css={styles.emptyCartText}>Cart is empty</Typography>
        </View>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
    cartContainer: {
        width: '100%',
        margin: '0px 100px',
    },
    cartTitle: {
        fontWeight: 600,
        marginTop: 20
    },
    backButton: {
        fontSize: 25,
        marginLeft: 15,
        marginTop: 23,
        cursor: 'pointer'
    },
    checkoutButton: {
        width: 150,
        height: 45,
        backgroundColor: Colors.SunGlow,
        '&:hover': {
            backgroundColor: Colors.SunGlow
        }
    },
    checkoutIcon: {
        marginRight: 8
    },
    checkoutText: {
        color: Colors.White
    },
    checkoutButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        marginTop: 60,
        marginRight: 110
    },
    checkoutButtonContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalPayableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    totalPayableTitle: {
        fontWeight: 600
    },
    totalPayablePrice: {
        marginRight: 115
    },
    emptyCartContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 22,
    },
    emtpyCartImg: {
        width: 250,
        marginBottom: 15
    }
})

export default CartPage