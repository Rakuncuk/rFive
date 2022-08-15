import React from 'react'
import useNUI from '../NUI'

export default function TestComponent() {
    useNUI((registerEvent) => {
        registerEvent('testEvent', (...vals) => {
            console.log('Event Received:', ...vals)
        })
    })
    return (
        <div>TestComponent</div>
    )
}
