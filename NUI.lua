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
    ready = true
    for i = 1, #uiReadyFuncs do
        uiReadyFuncs[i]()
    end
    uiReadyFuncs = {}
    return cb('ok')
end)

AddEventHandler('onResourceStop', function(r)
    if r == GetCurrentResourceName() then
        SetNuiFocus(false, false)
    end
end)
