# rFive

rFive is a [React](https://reactjs.org/) boilerplate for the popular Grand Theft Auto V mod called [FiveM](https://fivem.net/).

Traditionally you have to build your [React](https://reactjs.org/) app every time you wanted to test it in game. 

This boilerplate creates a seamless interaction layer between [FiveM](https://fivem.net/) and the [React](https://reactjs.org/) development environment to allow hot reloads.

# NUI

You can learn how to use the Lua functions and the React Hooks by clicking [here](https://github.com/Rakuncuk/rFive/tree/main/ui).

# How to use

Just start your [React](https://reactjs.org/) project like you normally would.
Join the game and start the script!

> You can use `start.bat` to start the project as well.


# Production

After you finish your project and build it, go in to the `fxmanifest.lua` file and change the `ui_page` variable.

> It should look like this
```lua
    --ui_page "ui/devUI.html"
    ui_page "ui/build/index.html"
```