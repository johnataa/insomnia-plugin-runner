import React, { useState } from 'react'
import { ActionBar, ListItem } from './components'

export default function App({ context, data }) {
    const [selectedRequests, setSelectedRequests] = useState([])
    const [statusRequest, setStatusRequest] = useState({})

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

    const runRequests = async (delay, statusToStop) => {
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

            if (statusToStop !== 0 && response.statusCode >= statusToStop)
                break

            if (delay)
                await new Promise(r => setTimeout(r, delay))
        }
    }

    return (
        <div style={{ margin: '20px' }}>
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

            <ActionBar onSubmit={runRequests} />
        </div>
    )
}