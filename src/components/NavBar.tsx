/** @jsxImportSource @emotion/react */
import { Chip, Link, List, ListItem, ListItemText, Popover, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Colors } from '../design/Colors'
import { theme } from '../design/Theme'
import { Menu, menuConfig } from '../helper/LayoutHelper'
import { View } from './common/View'
import Logo from '../assets/images/logo.svg'
import { createStyles } from '../hooks/createStyles'
import { Icon } from './common/Icon'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/userSlice'

export const NavBar = () => {
    const { isLoggedIn } = useAppSelector(state => state.user)
    return (
        <View css={styles.container}>
            <MenuList position='start' />
            <img src={Logo} alt='logo' css={styles.logo} />
            <View css={styles.navEndContainer}>
                <MenuList position='end' />
                {isLoggedIn && <UserChip />}
            </View>
        </View>
    )
}

const UserChip = () => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const userChipRef = useRef<HTMLDivElement>(null)

    const handlePopOpen = () => setAnchorEl(userChipRef.current)
    const handlePopClose = () => setAnchorEl(null)

    const onClickLogout = () => dispatch(logout())

    return (
        <Chip
            label={
                <View css={styles.userChipLabelContainer}>
                    <span css={styles.userName}>{user.name}</span>
                    <Icon
                        name='keyboard_arrow_down'
                        onClick={handlePopOpen}
                    />
                    <Popover
                        open={Boolean(anchorEl)}
                        onClose={handlePopClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}
                        transformOrigin={{
                            horizontal: 'center',
                            vertical: 'top'
                        }}>
                        <View css={styles.userMenu} onClick={onClickLogout}>
                            <Typography>Logout</Typography>
                        </View>
                    </Popover>
                </View>
            }
            css={styles.userChip}
            ref={userChipRef}
            variant="filled"
        />
    )
}

const MenuList = ({ position }: { position: 'start' | 'end' }) => {
    const { isLoggedIn } = useAppSelector(state => state.user)
    return (
        <List style={{ ...styles.menuList, justifyContent: position }}>
            {menuConfig
                .filter(menu => menu.position === position && (isLoggedIn === menu.auth || isLoggedIn))
                .map(menu =>
                    <ListItem key={menu.key} style={styles.menuContainer}>
                        <ListItemText>
                            <MenuLink menu={menu} />
                        </ListItemText>
                    </ListItem>)}
        </List>
    )
}

const MenuLink = ({ menu }: { menu: Menu }) => {
    const navigate = useNavigate()
    return (
        <View onClick={() => navigate(menu.route)}>
            {menu.icon && <Icon name={menu.icon} css={styles.menuIcon} />}
            {menu.label && <Link href='' style={styles.menuLink}>
                {menu.label}
            </Link>}
        </View >
    )
}


const styles = createStyles({
    container: {
        position: 'fixed',
        width: '100vw',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        height: 70,
        zIndex: 1
    },
    menuList: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    menuContainer: {
        width: 'fit-content'
    },
    menuLink: {
        color: Colors.AntiFlashWhite,
        textDecoration: 'none'
    },
    menuIcon: {
        color: Colors.AntiFlashWhite,
        fontSize: 25,
        cursor: 'pointer'
    },
    logo: {
        width: 250
    },
    userChip: {
        display: 'flex',
        marginRight: 80,
        backgroundColor: Colors.AntiFlashWhite,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: Colors.AntiFlashWhite,
        boxSizing: 'border-box'
    },
    userChipPop: {
        width: 'inherit'
    },
    userMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Colors.AntiFlashWhite
        }
    },
    userChipLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    userName: {
        margin: '0 5px'
    },
    navEndContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    }
})