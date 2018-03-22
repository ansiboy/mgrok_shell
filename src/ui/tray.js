"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var electron_1 = require("electron");
var mgrok = require("./../mgrok");
function createTray(win) {
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Options', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click: function () {
            }
        },
        { type: 'separator' },
        {
            label: 'Show', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click: function () {
                win.show();
            }
        },
        {
            label: 'Restart', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click: function () {
                mgrok.restart();
            }
        },
        {
            label: 'Exits', type: 'normal', icon: electron_1.nativeImage.createEmpty(),
            click: function () {
                win.close();
            }
        },
    ]);
    var image_path = path.join(__dirname, "content/image/app_icon.png");
    var icon = electron_1.nativeImage.createFromPath(image_path);
    icon = icon.resize({ width: 16, height: 16 });
    var tray = new electron_1.Tray(icon);
    tray.setToolTip('This is my application.');
    tray.on('click', function () {
        if (win.isVisible()) {
            win.hide();
        }
        else {
            win.show();
        }
    });
    win.on('close', function () { return tray.destroy(); });
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
            debugger;
        });
        electron_1.app.on("browser-window-focus", function () {
            //debugger;
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
