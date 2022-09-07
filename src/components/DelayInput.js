import React from 'react'

const style = {
    backgroundColor: 'white',
    color: 'black',
    width: '50px',
    marginLeft: '3px',
    paddingLeft: '3px'
}

export function DelayInput({ value, onChange }) {
    const handleDelay = ({ target }) => onChange(target.value.replace(/\D/g, ''))

    return (
        <label>
            Delay (ms):
            <input style={style} value={value} onChange={handleDelay} />
        </label>
    )
}

export default DelayInput