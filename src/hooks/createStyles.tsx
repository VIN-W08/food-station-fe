import { Interpolation, Theme } from '@emotion/react'

export const createStyles =
    <T extends { [key: string]: Interpolation<Theme> }>(arg: T) => arg