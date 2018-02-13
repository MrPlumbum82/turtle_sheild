const { app, globalShortcut, BrowserWindow } = require('electron')

let netWidth = 0
let netHeight = 0
let picWidth = 500
let picHeight = 575

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {

    const { screen } = require('electron')
    var allScreens = screen.getAllDisplays();

    allScreens.forEach(element => {
        netWidth = element.size.width + netWidth
        netHeight = element.size.height
    })

    netHeight = netHeight - picHeight
    netWidth = netWidth - picWidth

    // Open the DevTools.
    // win.webContents.openDevTools()

    // NOTE: Add keys that you want to make unresponsive
    // TODO: Add more key codes
    const keyCodes = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',

        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z',

        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
        'F9', 'F10', 'F11',

        'Plus', 'Space', 'Tab', 'Backspace', 'Delete', 'Insert', 'Return',
        'Up', 'Down', 'Left', 'Right', 'Home', 'End', 'PageUp', 'PageDown', 'Escape',
        'VolumeUp', 'VolumeDown', 'VolumeMute', 'MediaNextTrack',
        'MediaPreviousTrack', 'MediaStop', 'MediaPlayPause', 'PrintScreen',
    ];

    const registerKeyCodes = (keyCodes) => {
        keyCodes.forEach((element) => {
            // Register shortcut listener
            const ret = globalShortcut.register(element, () => {
                let win = new BrowserWindow({
                    width: picWidth,
                    height: picHeight,
                    x: getRandomInt(0, netWidth),
                    y: getRandomInt(0, netHeight),
                    frame: false,
                    show: true,
                })

                win.on('closed', () => {
                    win = null
                })

                // and load the index.html of the app.
                win.loadURL("https://i.imgflip.com/24giss.jpg")

            })

            // When the accelerator is already taken by other applications, 
            // this call will silently fail. This behavior is intended by operating systems, 
            // since they don't want applications to fight for global shortcuts
            if (!ret) {
                console.log('Failed to register key code: ' + element)
            }
        })
    }

    const unRegisterKeyCodes = (keyCodes) => {
        keyCodes.forEach(function (element) {
            // unRegister shortcut listener
            const ret = globalShortcut.unregister(element, () => { })
        })
        console.log("TURTLE SHEILD OFFLINE!")
    }

    globalShortcut.register("CommandOrControl+Q", () => {
        // Unregisters all of the global shortcuts making the keys responsive again
        unRegisterKeyCodes(keyCodes)
    })

    globalShortcut.register("CommandOrControl+A", () => {
        registerKeyCodes(keyCodes)
        console.log("TURTLE SHEILD ONLINE! Wait for John.B to attempt turtle...");
    })
})

// Helper
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
