# Custom Hooks

### useNUI

useNUI makes registering NUI events very convenient.

The hook returns a function called `registerEvent` and it can be used for (as the name suggests) registering NUI events.

Here is an example:

> First, let's import the useNUI hook.

```jsx
    import useNUI from './NUI'
```

> And register an event called 'testEvent'

```jsx
    useNUI(registerEvent => {
        registerEvent('testEvent', (arg1, arg2, arg3) => {
            console.log('testEvent Received:', arg1, arg2, arg3)
        })
    })
```

> You can call this event by using the `_NUI` function from the Lua client.
> Here is an example:

```lua
    _NUI('testEvent', 'testArg1', 2, {testArg = '3'})
```

> The useNUI hook automatically removes the registered events if the component gets unmounted.

# Functions

### sendMessage

Since NUI is a two way street you need to be able to send messages to the Lua client as well.

You can use the sendMessage accomplish this.

> Let's import the function

```jsx
    import { sendMessage } from './NUI'
```

> And send a message

```jsx
    sendMessage('greetGrievous', { val: 'Hello there' })
        .then(response => console.log(response))
```

> Here is how you can listen and send a response back from the Lua client

```lua
    RegisterNUICallback('greetGrievous', function(data, response)
        print('Message from General Kenobi:', data.val)
        response('General Kenobi, you are a bold one!')
    end)
```


onUIReady

If you need to know exactly when the UI starts (for example to send a config data) then you can use onUIReady on the Lua client.

```lua
    onUIReady(function()
        _NUI('setPlayerData', {...})
    end)
```