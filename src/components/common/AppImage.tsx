/** @jsxImportSource @emotion/react */
import React from 'react'

type Props = {
    src: string,
    isBase64?: boolean,
    alt: string,
    className?: string | undefined
}

export const AppImage = ({
    src,
    isBase64 = false,
    alt,
    className
}: Props) => {
    return (
        <img
            src={isBase64 ? `data:image/png;base64,${src}` : src}
            alt={alt}
            className={className}
        />
    )
}