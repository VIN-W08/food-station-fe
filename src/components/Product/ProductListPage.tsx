/** @jsxImportSource @emotion/react */
import React from 'react'
import { createStyles } from '../../hooks/createStyles'
import { View } from '../common/View'
import { ProductListContent } from './ProductListContent'
import { FoodCategoryMenu } from './FoodCategoryMenu'

const ProductListPage = () => {
    return (
        <View css={styles.container}>
            <FoodCategoryMenu />
            <ProductListContent />
        </View>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
})

export default ProductListPage