/** @jsxImportSource @emotion/react */
import React from 'react'
import { View } from '../../common/View'
import EatingTogether from '../../../assets/images/eating_together.svg'
import { createStyles } from '../../../hooks/createStyles'
import { LoginForm } from './LoginForm'

const LoginPage = (): JSX.Element => {
    return (
        <View css={styles.container}>
            <View css={styles.imgContainer}>
                <img src={EatingTogether} alt='eating_together' css={styles.eatingTogetherImg} />
            </View>
            <LoginForm />
        </View>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center'
    },
    eatingTogetherImg: {
        width: 400,
        marginTop: 85
    }
})

export default LoginPage