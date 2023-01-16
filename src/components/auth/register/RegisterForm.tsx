/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { register, userActions } from '../../../features/userSlice'
import { createStyles } from '../../../hooks/createStyles'
import { AppButton } from '../../common/AppButton'
import { TextInput } from '../../common/TextInput'
import { View } from '../../common/View'
import { routes } from '../../../router/Routes'
import { theme } from '../../../design/Theme'
import { Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IUserInput } from '../../../interfaces/IUser'

type Props = {
    className?: string | undefined
}

export const RegisterForm = ({ className }: Props) => {
    const userState = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [passwordVisible, setPasswordVisible] = useState(false)

    const onChangeUser = (value: string, name: string) => {
        dispatch(userActions.setUserByAttribute({
            key: name as keyof IUserInput, value: value
        }))
    }

    const registerUser = async () => {
        const res = await dispatch(register())
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(userActions.initUserInput())
            navigateToProductListPage()
        }
    }

    const navigateToProductListPage = () => navigate(routes.productList)
    const navigateToLoginPage = () => navigate(routes.login)

    return (
        <View css={styles.container} className={className}>
            <h2 css={styles.registerTitle}>Register</h2>
            <View css={styles.formContainer}>
                <TextInput
                    name='name'
                    value={userState.userInput.name}
                    labelOutside='Name'
                    type='text'
                    isRequired
                    css={styles.formTextInputContainer}
                    inputStyle={styles.formTextInput}
                    onChange={onChangeUser}
                />
                <TextInput
                    name='email'
                    value={userState.userInput.email}
                    labelOutside='Email'
                    type='email'
                    isRequired
                    css={styles.formTextInputContainer}
                    inputStyle={styles.formTextInput}
                    onChange={onChangeUser}
                />
                <TextInput
                    name='password'
                    value={userState.userInput.password}
                    labelOutside='Password'
                    type={passwordVisible ? 'text' : 'password'}
                    isRequired
                    css={styles.formTextInputContainer}
                    inputStyle={styles.formTextInput}
                    onChange={onChangeUser}
                    iconRight={passwordVisible ? 'visibility' : 'visibility_off'}
                    onClickIconRight={() => setPasswordVisible(!passwordVisible)}
                />
                <AppButton
                    css={styles.registerButton}
                    onClick={registerUser}>
                    Register
                </AppButton>
                <Typography css={styles.loginGuide}>Already have an account?&nbsp;
                    <Link
                        onClick={navigateToLoginPage}
                        css={styles.loginLink}>
                        Login here
                    </Link>
                </Typography>
            </View>
        </View >
    )
}

const styles = createStyles({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    registerTitle: {
        margin: '55px 0 50px 0'
    },
    formContainer: {
        width: 'fit-content',
        alignItems: 'center'
    },
    formTextInputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    formTextInput: {
        height: 40
    },
    registerButton: {
        width: 320,
        marginTop: 25,
        marginBottom: 15
    },
    loginGuide: {
        fontSize: 14
    },
    loginLink: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        cursor: 'pointer'
    }
})