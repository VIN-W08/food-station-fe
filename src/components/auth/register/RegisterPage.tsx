/** @jsxImportSource @emotion/react */
import React from 'react'
import { View } from '../../common/View'
import OfficeSnack from '../../../assets/images/office_snack.svg'
import { createStyles } from '../../../hooks/createStyles'
import { RegisterForm } from './RegisterForm'

const RegisterPage = (): JSX.Element => {
    return (
        <View css={styles.container}>
            <View css={styles.imgContainer}>
                <img src={OfficeSnack} alt='office_snack' css={styles.officeSnack} />
            </View>
            <RegisterForm />
        </View>
    )
}

const styles = createStyles({
    container: {
        flexDirection: 'row',
        minHeight: '100vh',
        marginTop: 70,
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
    },
    officeSnack: {
        width: 400,
        marginTop: 140
    }
})

export default RegisterPage