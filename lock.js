const electron = require('electron')
const { app, BrowserWindow }= electron;
// Module to control application life.
const globalShortcut = electron.globalShortcut

let win

app.on('activate', () => {
    if (win === null) {
        win.open("https://www.github.com", "github", "resizable,scrollbars,status");
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    win = new BrowserWindow({ width: 800, height: 600 })

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
        keyCodes.forEach(function (element) {
            // Register shortcut listener
            const ret = globalShortcut.register(element, () => {
                console.log(element)
                win.open("https://www.github.com", "github", "resizable,scrollbars,status");
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
            globalShortcut.unregister(element)
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
