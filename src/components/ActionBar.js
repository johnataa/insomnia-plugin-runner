import React, { useState } from 'react'
import { DelayInput } from './DelayInput'
import { StatusSelect } from './StatusSelect'

const styles = {
    actionBar: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    requestButton: {
        padding: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
        cursor: 'pointer',
        marginLeft: '5px'
    }
}

export function ActionBar({ onSubmit }) {
    const [delay, setDelay] = useState(200)
    const [statusToStop, setStatusToStop] = useState(0)

    const handleSubmit = () => onSubmit(parseInt(delay), parseInt(statusToStop))

    return (
        <div style={styles.actionBar}>
            <div style={{ marginTop: '5px' }}>
                Stop on first status
                <StatusSelect value={statusToStop} onChange={setStatusToStop} />
            </div>

            <div>
                <DelayInput value={delay} onChange={setDelay} />

                <button className='bg-success' style={styles.requestButton} onClick={handleSubmit}>
                    Run Requests
                </button>
            </div>
        </div>
    )
}

export default ActionBar