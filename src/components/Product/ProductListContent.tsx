/** @jsxImportSource @emotion/react */
import { Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Colors } from '../../design/Colors'
import { createStyles } from '../../hooks/createStyles'
import { IFood } from '../../interfaces/IFood'
import { routes } from '../../router/Routes'
import { AppImage } from '../common/AppImage'
import { TextInput } from '../common/TextInput'
import { View } from '../common/View'
import Logo from '../../assets/images/logo.svg'
import { foodActions, getFoodList } from '../../features/foodSlice'


interface State {
    imageLoaded: boolean
}

export const ProductListContent = () => {
    const dispatch = useAppDispatch()
    const { foodSearchValue } = useAppSelector(state => state.food)
    return (
        <View css={styles.container}>
            <TextInput
                value={foodSearchValue}
                name='food-name'
                placeholder='Search Food'
                onChange={(value, name) => dispatch(foodActions.setFoodSearchValue(value))}
                iconRight='search'
                onEnter={() => dispatch(getFoodList())}
                onClickIconRight={() => dispatch(getFoodList())}
                css={styles.foodSearchField}
            />
            <ProductList />
        </View>
    )
}

const ProductList = () => {
    const { foodList } = useAppSelector(state => state.food)

    return (
        <View css={styles.productListContainer}>
            {foodList.length !== 0 ?
                <Grid container spacing={4} sx={overrideStyles.listGridContainer}>
                    {foodList.map((food, idx) => (
                        <Grid item xs='auto'>
                            <ProductListItem product={food} />
                        </Grid>
                    ))
                    }
                </Grid> :
                <Typography>Food not found.</Typography>}
        </View>
    )
}

const ProductListItem = ({ product }: { product: IFood }) => {
    const navigate = useNavigate()
    const [state, setState] = useState<State>({ imageLoaded: false })
    const onClickProduct = () => navigate(routes.productDetail(product._id))

    useEffect(() => {
        checkImageLoaded()
    }, [product.image])

    const checkImageLoaded = () => {
        const img = new Image()
        img.src = `data:image/png;base64,${product.image}` ?? Logo
        img.onload = () => setState({ ...state, imageLoaded: true })

    }

    return (
        <>
            {state.imageLoaded ?
                <View
                    css={styles.itemContainer}
                    onClick={onClickProduct}>
                    <AppImage
                        src={product.image ?? ''}
                        alt={product.name}
                        isBase64
                        css={styles.foodImg}
                    />
                    <Typography css={styles.foodName}>{product.name}</Typography>
                    <Typography css={styles.foodPrice}>{`Rp ${product.price}`}</Typography>
                </View > :
                <View css={styles.itemContainer}>
                    <Skeleton variant='rectangular' css={styles.foodImgSkeleton} />
                    <Skeleton variant='text' css={styles.foodNameSkeleton} />
                    <Skeleton variant='text' css={styles.foodPriceSkeleton} />
                </View>
            }
        </>
    )
}

const styles = createStyles({
    container: {
        flex: 3,
        alignItems: 'center',
        padding: 15
    },
    productListContainer: {
        width: '100%',
        alignItems: 'center',
        margin: 15
    },
    itemContainer: {
        alignItems: 'center',
        cursor: 'pointer'
    },
    foodImg: {
        objectFit: 'contain',
        borderRadius: 5,
        width: 180,
        height: 180,
        backgroundColor: 'black'
    },
    foodName: {
        fontWeight: 600,
        marginTop: 8
    },
    foodPrice: {
        fontWeight: 300
    },
    foodSearchField: {
        width: 320,
        height: 45,
        backgroundColor: Colors.White
    },
    foodImgSkeleton: {
        width: 180,
        height: 180,
        borderRadius: 5
    },
    foodNameSkeleton: {
        width: 120,
        height: 30,
        marginTop: 8
    },
    foodPriceSkeleton: {
        width: 120,
        height: 25
    }
})

const overrideStyles = {
    listGridContainer: {
        '&.MuiGrid-root': {
            margin: 0,
            cursor: 'auto'
        }
    }
}