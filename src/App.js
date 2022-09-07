import React, { useState } from 'react'
import { DelayInput, ListItem } from './components'

const styles = {
    modalContent: {
        margin: '20px'
    },
    actionBar: {
        marginBottom: '20px',
        float: 'right'
    },
    requestButton: {
        padding: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
        cursor: 'pointer',
        marginLeft: '5px'
    }
}

export default function App({ context, data }) {
    const [selectedRequests, setSelectedRequests] = useState([])
    const [statusRequest, setStatusRequest] = useState({})
    const [delay, setDelay] = useState(200)

    const handleRequest = id => setSelectedRequests(reqs =>
        reqs.includes(id)
            ? reqs.filter(rId => rId !== id)
            : [...reqs, id]
    )

    const selectAllRequests = () => setSelectedRequests(reqs =>
        reqs.length != data.requests.length
            ? data.requests.map(r => r._id)
            : []
    )

    const runRequests = async () => {
        if (selectedRequests.length === 0)
            return

        setStatusRequest({})
        const reqs = data.requests.filter(r => selectedRequests.includes(r._id))
        for (const req of reqs) {
            const response = await context.network.sendRequest(req);
            setStatusRequest(status => ({
                ...status,
                [req._id]: response.statusCode
            }))

            if (delay)
                await new Promise(r => setTimeout(r, parseInt(delay)))
        }
    }

    return (
        <div style={styles.modalContent}>
            <ul>
                <ListItem 
                    onClick={selectAllRequests}
                    isChecked={data.requests.length === selectedRequests.length}
                    name="Select All"
                />

                <br style={{ marginBottom: '15px' }} />

                {data.requests.map(r =>
                    <ListItem
                        method={r.method}
                        name={r.name}
                        onClick={_ => handleRequest(r._id)}
                        isChecked={selectedRequests.includes(r._id)}
                        status={statusRequest[r._id]}
                    />
                )}
            </ul>

            <hr />

            <div style={styles.actionBar}>
                <DelayInput value={delay} onChange={setDelay} />

                <button className='bg-success' style={styles.requestButton} onClick={runRequests}>
                    Run Requests
                </button>
            </div>
        </div>
    )
}