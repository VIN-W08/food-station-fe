/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login, userActions } from '../../../features/userSlice'
import { createStyles } from '../../../hooks/createStyles'
import { AppButton } from '../../common/AppButton'
import { TextInput } from '../../common/TextInput'
import { View } from '../../common/View'
import { IUserInput } from '../../../interfaces/IUser'
import { routes } from '../../../router/Routes'
import { theme } from '../../../design/Theme'
import { Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
    className?: string | undefined
}

export const LoginForm = ({ className }: Props) => {
    const userState = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [passwordVisible, setPasswordVisible] = useState(false)

    const onChangeUser = (value: string, name: string) => {
        dispatch(userActions.setUserByAttribute({
            key: name as keyof IUserInput, value: value
        }))
    }

    const loginUser = async () => {
        const res = await dispatch(login())
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(userActions.initUserInput())
            navigateToProductListPage()
        }
    }

    const navigateToProductListPage = () => navigate(routes.productList)
    const navigateToRegisterPage = () => navigate(routes.register)

    return (
        <View css={styles.container} className={className}>
            <h2 css={styles.loginTitle}>Login</h2>
            <View css={styles.formContainer}>
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
                    css={styles.loginButton}
                    onClick={loginUser}>
                    Login
                </AppButton>
                <Typography css={styles.registerGuide}>Don't have an account?&nbsp;
                    <Link
                        onClick={navigateToRegisterPage}
                        css={styles.registerLink}>
                        Register here
                    </Link>
                </Typography>
            </View>
        </View>
    )
}

const styles = createStyles({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    loginTitle: {
        margin: '85px 0 60px 0'
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
    loginButton: {
        width: 320,
        marginTop: 30,
        marginBottom: 15
    },
    registerGuide: {
        fontSize: 14
    },
    registerLink: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        cursor: 'pointer'
    }
})