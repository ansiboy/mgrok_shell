"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const electron_1 = require("electron");
const mgrok = require("./../mgrok");
function createTray(win) {
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Options', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click() {
            }
        },
        { type: 'separator' },
        {
            label: 'Show', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click() {
                win.show();
            }
        },
        {
            label: 'Restart', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click() {
                mgrok.restart();
            }
        },
        {
            label: 'Exits', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click() {
                win.close();
            }
        },
    ]);
    let image_path = path.join(__dirname, "content/image/app_icon.png");
    let icon = electron_1.nativeImage.createFromPath(image_path);
    icon = icon.resize({ width: 16, height: 16 });
    let tray = new electron_1.Tray(icon);
    tray.setToolTip('This is my application.');
    tray.on('click', function () {
        if (win.isVisible()) {
            win.hide();
        }
        else {
            win.show();
        }
    });
    win.on('close', () => tray.destroy());
    if (process.platform == 'darwin') {
        electron_1.app.dock.setMenu(contextMenu);
        electron_1.app.dock.setIcon(image_path);
        electron_1.app.on('activate', function (event, hasVisibleWindows) {
            if (hasVisibleWindows)
                win.hide();
            else
                win.show();
        });
        electron_1.app.on('continue-activity', function () {
        });
        electron_1.app.on("browser-window-focus", function () {
        });
        win.on('close', function () {
            electron_1.app.dock.hide();
        });
    }
    else {
        tray.setContextMenu(contextMenu);
    }
}
exports.createTray = createTray;
