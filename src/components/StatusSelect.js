import React from 'react'

const style = {
    backgroundColor: 'white',
    border: '1px solid black',
    marginLeft: '5px',
    color: 'black'
}

export function StatusSelect({ value, onChange }) {

    const handleChange = ({ target }) => onChange(target.value)
    
    return (
        <select value={value} onChange={handleChange} style={style}>
            <option value="0">---</option>
            <option value="400">4xx</option>
            <option value="500">5xx</option>
        </select>
    )
}

export default StatusSelect