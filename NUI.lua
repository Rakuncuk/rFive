local uiReadyFuncs = {}
local ready = false
onUIReady = function(f)
    if ready then
        return f()
    else
        uiReadyFuncs[#uiReadyFuncs + 1] = f
        return
    end
end

_NUI = function(type, ...)
    SendNUIMessage({
        type = type,
        payload = {...}
    })
end

RegisterNUICallback('UIReady', function(data, cb)
    print('UI Ready baby')
    ready = true
    for i =1, #uiReadyFuncs do
        uiReadyFuncs[i]()
    end
    uiReadyFuncs = {}
    return cb('ok')
end)

RegisterNUICallback('testNUI', function(data, cb)
    _NUI('testEvent', 'val1')
    cb('Hi from client')
end)

RegisterCommand('t', function()
    _NUI('testEvent', 'val1')
end)

Citizen.CreateThread(function()
    Citizen.Wait(100)
    SetNuiFocus(true, true)

end)

AddEventHandler('onResourceStop', function(r)
    if r == GetCurrentResourceName() then
        SetNuiFocus(false, false)
    end
end)
