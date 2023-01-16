/** @jsxImportSource @emotion/react */
import { Checkbox, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Colors } from '../../design/Colors'
import { foodActions, getFoodCategoryList, getFoodList } from '../../features/foodSlice'
import { createStyles } from '../../hooks/createStyles'
import { IFoodCategory } from '../../interfaces/IFood'
import { View } from '../common/View'

export const FoodCategoryMenu = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFoodCategoryList())
    }, [])

    return (
        <View css={{ ...styles.container, borderColor: Colors.Gray }}>
            <Typography variant='h6' css={styles.title}>Categories</Typography>
            <FoodCategoryMenuList />
        </View>
    )
}

const FoodCategoryMenuList = () => {
    const { foodCategoryList } = useAppSelector(state => state.food)

    return (
        <List>
            {foodCategoryList.map(category => (
                <FoodCategoryMenuItem category={category} />
            ))}
        </List>
    )
}

const FoodCategoryMenuItem = ({ category }: { category: IFoodCategory }) => {
    const { selectedFoodCategoryIds } = useAppSelector(state => state.food)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFoodList())
    }, [selectedFoodCategoryIds])

    return (
        <ListItem css={styles.categoryItem}>
            <Checkbox
                checked={selectedFoodCategoryIds.includes(category._id)}
                onChange={(e, checked) => dispatch(foodActions.setSelectedFoodCategoryId({
                    type: checked ? 'add' : 'remove',
                    value: category._id
                }))}
            />
            <Typography>{category.label}</Typography>
        </ListItem>
    )
}


const styles = createStyles({
    container: {
        flex: 0.7,
        borderRight: '1px solid'
    },
    title: {
        fontWeight: 600,
        marginLeft: 28,
        marginTop: 20
    },
    categoryItem: {
        flexDirection: 'row'
    }
})