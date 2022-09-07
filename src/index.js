import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

export const requestGroupActions = [
    {
        label: 'Runner',
        action: async (context, data) => {
            const props = { context, data }
            const root = document.createElement('div')

            ReactDOM.render(<App {...props} />, root)

            context.app.dialog(`Runner (${data.requestGroup.name})`, root, {
                onHide() {
                    ReactDOM.unmountComponentAtNode(root)
                }
            })
        }
    }
]