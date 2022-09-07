import React, { useMemo } from 'react'

const style = {
    marginLeft: '5px',
    padding: '1px',
    paddingLeft: '5px',
    paddingRight: '5px',
    fontWeight: 'bold'
}

export function Status({ children }) {
    if (!children)
        return null

    const className = useMemo(() => {
        if (children >= 100 && children < 200)
            return 'bg-info'
        if (children >= 200 && children < 300)
            return 'bg-success'
        if (children >= 300 && children < 400)
            return 'bg-surprise'
        if (children >= 400 && children < 500)
            return 'bg-warning'
        
        return 'bg-danger'
    }, children)

    return (
        <span className={className} style={style}>
            {children}
        </span>
    )
}

export default Status