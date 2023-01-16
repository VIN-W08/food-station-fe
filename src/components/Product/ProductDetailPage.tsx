/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import foodSlice, { foodActions, getFoodById } from '../../features/foodSlice'
import { createStyles } from '../../hooks/createStyles'
import { AppImage } from '../common/AppImage'
import { View } from '../common/View'
import Logo from '../../assets/images/logo.svg'
import { Skeleton, Typography } from '@mui/material'
import { AppButton } from '../common/AppButton'
import { Colors } from '../../design/Colors'
import { Icon } from '../common/Icon'
import { routes } from '../../router/Routes'
import { orderActions } from '../../features/orderSlice'
import { uiActions } from '../../features/uiSlice'
import { Counter } from '../common/Counter'
import { TextInput } from '../common/TextInput'
import { AppModal } from '../common/AppModal'
import { AppIconButton } from '../common/AppIconButton'

const ProductDetailPage = () => {
    const params = useParams()
    const { id } = params
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { selectedFood } = useAppSelector(state => state.food)
    const { selectedFoodNote } = useAppSelector(state => state.order)
    const [itemCount, setItemCount] = useState(1)
    const [showNoteModal, setShowNoteModal] = useState(false)

    useEffect(() => {
        if (id) dispatch(getFoodById(id))
        dispatch(orderActions.initSelectedFoodNoteInput())
        return () => {
            dispatch(foodActions.initSelectedFood(null))
        }
    }, [])

    const onClickBuyNow = () => {
        if (selectedFood) dispatch(orderActions.initOrder({
            userId: user._id,
            foods: Array(itemCount).fill(selectedFood)
        }))
        navigate(routes.checkout)
    }
    const onClickAddCartItem = () => {
        dispatch(orderActions.addCartItem(Array(itemCount).fill(selectedFood)))
        dispatch(uiActions.showToast(itemCount === 1 ? 'Item has added to cart' : 'Items has added to cart'))
    }

    return (
        <>
            {selectedFood ?
                <View css={styles.container}>
                    <Icon
                        name='arrow_back'
                        css={styles.backButton}
                        onClick={() => navigate(-1)}
                    />
                    <View css={styles.productContainer}>
                        <Typography variant='h5' css={styles.foodName}>{selectedFood.name}</Typography>
                        <AppImage
                            src={selectedFood.image ?? Logo}
                            alt={selectedFood.name}
                            isBase64
                            css={styles.foodImg}
                        />
                        <View css={styles.foodPriceAndActionButtonContainer}>
                            <Typography variant='h5' css={styles.foodPrice}>{`Rp ${selectedFood.price}`}</Typography>
                            <View css={styles.actionButtonContainer}>
                                <Counter
                                    value={itemCount}
                                    onClickIncreaseButton={() => setItemCount(itemCount + 1)}
                                    onClickDecreaseButton={() => itemCount > 1 && setItemCount(itemCount - 1)}
                                    css={styles.itemCounter}
                                />
                                <AppIconButton name='edit_note' onClick={() => setShowNoteModal(true)} css={styles.noteIconButton} />
                                <AppButton
                                    onClick={() => { if (selectedFood) onClickAddCartItem() }}
                                    css={styles.addCartButton}
                                    sx={overrideStyles.addCartButton}
                                ><Icon name='add_shopping_cart' css={styles.addCartIcon} />Cart</AppButton>
                                <AppButton
                                    onClick={onClickBuyNow}
                                    css={styles.orderNowButton}
                                    sx={overrideStyles.orderNowButton}
                                >Order Now</AppButton>
                            </View>
                        </View>
                        <View>
                            <Typography variant='body1' css={styles.descTitle}>Description</Typography>
                            <Typography variant='body1'>{selectedFood.description !== '' ? selectedFood.description : '-'}</Typography>
                        </View>
                        <View>
                            <Typography variant='body1' css={styles.noteTitle}>Note</Typography>
                            <Typography variant='body1'>{selectedFoodNote !== '' ? selectedFoodNote : '-'}</Typography>
                        </View>
                        <NoteModal open={showNoteModal} onClose={() => setShowNoteModal(false)} />
                    </View>
                </View> : <></>}
        </>
    )
}

const NoteModal = ({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) => {
    const dispatch = useAppDispatch()
    const [note, setNote] = useState('')

    const onClickSubmitNote = () => {
        dispatch(orderActions.setSelectedFoodNote(note))
        onClose()
    }

    return (
        <AppModal
            open={open}
            title='Note'
            onClose={onClose}
            css={styles.noteModal}
        >
            <View>
                <TextInput
                    name='note'
                    labelOutside='Note'
                    placeholder='Add note...'
                    value={note}
                    onChange={(value, name) => setNote(value)}
                    isMultiline
                    maxRows={3}
                    css={styles.noteInputContainer}
                    inputStyle={styles.noteInput}
                />
                <AppButton
                    onClick={onClickSubmitNote}
                    css={styles.submitNoteButton}
                >
                    Submit
                </AppButton>
            </View>
        </AppModal>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
    foodName: {
        fontWeight: 600,
        marginTop: 20
    },
    foodImg: {
        width: '100%',
        height: 300,
        objectFit: 'contain',
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 5
    },
    foodPrice: {
        display: 'flex',
        fontWeight: 300
    },
    descTitle: {
        fontWeight: 600,
        marginTop: 15
    },
    productContainer: {
        width: '100%',
        margin: '0px 100px',
        marginBottom: 15
    },
    foodPriceAndActionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    actionButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addCartButton: {
        width: 110,
        height: 42,
        marginRight: 10
    },
    orderNowButton: {
        width: 130,
        height: 42
    },
    backButton: {
        fontSize: 25,
        marginLeft: 15,
        marginTop: 23,
        cursor: 'pointer'
    },
    addCartIcon: {
        marginRight: 5
    },
    itemCounter: {
        marginRight: 5
    },
    noteInputContainer: {
        width: '100%',
    },
    noteInput: {
        height: 100,
        marginBottom: 10
    },
    noteTitle: {
        fontWeight: 600,
        marginTop: 15
    },
    noteIconButton: {
        marginRight: 15
    },
    noteModal: {
        width: 400
    },
    submitNoteButton: {
        marginTop: 25,
        height: 40
    }
})

const overrideStyles = {
    addCartButton: {
        '&.MuiButton-root': {
            backgroundColor: Colors.Mustard
        }
    },
    orderNowButton: {
        '&.MuiButton-root': {
            backgroundColor: Colors.Kiwi
        }
    }
}

export default ProductDetailPage