import { createTheme } from '@mui/material'
import { Colors } from './Colors'

export const theme = createTheme({
    palette: {
        primary: {
            main: Colors.SunGlow,
            light: Colors.Blond
        },
        secondary: {
            main: Colors.OuterSpace
        }
    },
    typography: {
        allVariants: {
            color: Colors.OuterSpace,
            userSelect: 'none'
        },
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true
            }
        }
    }
})

// declare module '@mui/material/styles' {
//     interface Theme {
//         primary: string,
//         primaryVariant: string,
//         secondary: string,
//         background: string,
//         onSuccess: string
//     }
//     interface ThemeOptions {
//         primary?: string,
//         primaryVariant?: string,
//         secondary?: string,
//         background: string,
//         onSuccess: string
//     }
// }

// export const theme = createTheme({
//     primary: Colors.SunGlow,
//     primaryVariant: Colors.Mustard,
//     secondary: Colors.OuterSpace,
//     background: Colors.AntiFlashWhite,
//     onSuccess: Colors.Kiwi
// })