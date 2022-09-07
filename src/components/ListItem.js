import React from 'react'
import { Method } from './Method'
import { Status } from './Status'

export function ListItem({ method, name, status, isChecked, onClick }) {
    return (
        <li style={{ padding: '5px' }} onClick={onClick}>
            <input type="checkbox" checked={isChecked} />
            <span style={{ marginLeft: '5px' }}>
                <Method>{method}</Method> {name} <Status>{status}</Status>
            </span>
        </li>
    )
}

export default ListItem