import * as path from 'path';
import { Menu, Tray, nativeImage, app } from 'electron';
import * as mgrok from './../mgrok';

export function createTray(win: Electron.BrowserWindow) {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Options', type: 'normal', icon: nativeImage.createEmpty(),
            click() {

            }
        },
        { type: 'separator' },
        {
            label: 'Show', type: 'normal', icon: nativeImage.createEmpty(),
            click() {
                win.show()
            }
        },
        {
            label: 'Restart', type: 'normal', icon: nativeImage.createEmpty(),
            click() {
                mgrok.restart()
            }
        },
        {
            label: 'Exits', type: 'normal', icon: nativeImage.createEmpty(),
            click() {
                win.close()
            }
        },
    ])


    let image_path = path.join(__dirname, "content/image/app_icon.png")
    let icon = nativeImage.createFromPath(image_path)
    icon = (icon as any).resize({ width: 16, height: 16 })
    let tray = new Tray(icon)
    tray.setToolTip('This is my application.')
    tray.on('click', function () {
        if (win.isVisible()) {
            win.hide()
        } else {
            win.show()
        }
    })

    win.on('close', () => tray.destroy())

    if (process.platform == 'darwin') {
        app.dock.setMenu(contextMenu)
        app.dock.setIcon(image_path)
        app.on('activate', function (event, hasVisibleWindows) {
            if (hasVisibleWindows)
                win.hide()
            else
                win.show();
        })
        app.on('continue-activity', function () {
        })
        app.on("browser-window-focus", function () {

        })
        win.on('close', function () {
            app.dock.hide()
        })
    }
    else {
        tray.setContextMenu(contextMenu)
    }



}

