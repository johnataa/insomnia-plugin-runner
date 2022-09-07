import React, { useMemo } from 'react'

export function Method({ children }) {
    if (!children)
        return null

    const color = useMemo(() => {
        switch (children){
            case 'POST':
                return 'var(--color-success)'
            case 'GET':
                return 'var(--color-surprise)'
            case 'PATCH':
                return 'var(--color-notice)'
            case 'DELETE':
                return 'var(--color-danger)'
            case 'PUT':
                return 'var(--color-warning)'
            default:
                return 'var(--color-info)'
        }
    }, children)

    return (
        <span style={{ color }}>[{children}]</span>
    )
}

export default Method