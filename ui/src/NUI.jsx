import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const onBrowser = typeof GetParentResourceName === "undefined"

export const sendMessage = (event, data = {}) => new Promise(resolve => {
    if (onBrowser)
        return window.parent.sendMessage(event, data, resolve)

    fetch(`https://${GetParentResourceName()}/${event}`, { // eslint-disable-line no-undef
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
        .then(r => resolve(r))
        .catch(err => console.log('NUI Error:', err))
})

const Events = new Map()
const destroyEvents = namespace => {
    Events.forEach((cbs, ev) => {
        Events.set(ev, cbs.filter(c => c.namespace !== namespace))
        if (Events.get(ev).length === 0)
            Events.delete(ev)
    })
}

const registerEvent = (event, cb, namespace) => {
    if (!Events.has(event))
        Events.set(event, [])
    Events.get(event).push({ cb: cb, namespace: namespace })
}

const NUIContext = createContext()
const useNUI = (f) => useContext(NUIContext)(f)

export const NUIProvider = ({ children }) => {
    const randomNamespace = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    const useNUIHandler = (handler, namespace = randomNamespace()) => {
        useEffect(() => {
            handler((event, cb) => registerEvent(event, cb, namespace))
            return () => {
                destroyEvents(namespace)
            }
        }, [])
    }
    return (
        <NUIContext.Provider value={useNUIHandler}>
            {children}
        </NUIContext.Provider>
    )
}

window.addEventListener('message', ({ data }) => {
    const { type, payload = [] } = data
    if (Events.has(type))
        Events.get(type).forEach(({ cb }) => cb(...payload))
})

export default useNUI