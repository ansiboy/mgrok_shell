"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const homePanel_1 = require("./ui/homePanel");
const tunnelsPanel_1 = require("./ui/tunnelsPanel");
const panelSettings_1 = require("./ui/panelSettings");
const React = require("react");
const ReactDOM = require("react-dom");
// let tbody = document.getElementById('modleInfo')
let close_button = document.getElementById('closeButton');
let minus_button = document.getElementById('minusButton');
let title_bar = document.getElementById('titleBar');
let main_win = electron_1.remote.BrowserWindow.getAllWindows()[0];
close_button.onclick = (event) => {
    main_win.close();
    event.preventDefault();
};
minus_button.onclick = (event) => {
    main_win.hide();
    event.preventDefault();
};
let panels = document.getElementById('panels').children;
ReactDOM.render([React.createElement(homePanel_1.HomePanel, { key: 'home', win: main_win }),
    React.createElement(tunnelsPanel_1.TunnelsPanel, { key: "tunnels", mainPath: __dirname }),
    React.createElement(panelSettings_1.PanelSettings, { key: "settings" })], document.getElementById('panels'), function () {
    title_bar.querySelectorAll('a').forEach((o, i) => {
        o.onclick = function () {
            let targetId = this.hash.substr(1);
            let targetElement = document.getElementById(targetId);
            for (let i = 0; i < panels.length; i++) {
                if (panels.item(i).id == targetId) {
                    panels.item(i).style.display = 'block';
                }
                else {
                    panels.item(i).style.display = 'none';
                }
            }
            title_bar.querySelector('.active').className = '';
            this.parentElement.className = 'active';
        };
    });
});
//============================================================
// 实现窗口移动
let x, y;
let capture;
title_bar.onmousedown = (event) => {
    console.log(`onmousedown ${event.x} ${event.y}`);
    if (event.x > 720 && event.x < 110) {
        return;
    }
    capture = true;
};
window.onmouseup = (event) => {
    capture = false;
    x = null;
    y = null;
};
let deltaX;
let deltaY;
window.onmousemove = (event) => {
    if (!capture) {
        return;
    }
    if (x != null && y != null) {
        deltaX = event.screenX - x;
        deltaY = event.screenY - y;
        let pos = main_win.getPosition();
        let main_win_x = pos[0] + deltaX;
        let main_win_y = pos[1] + deltaY;
        main_win.setPosition(main_win_x, main_win_y);
    }
    x = event.screenX;
    y = event.screenY;
};
window.onkeydown = (event) => {
    // 按下 CTRL + C 退出
    // const cKey = 67;
    // if (event.ctrlKey && event.keyCode == cKey) {
    //     window.close()
    // }
};
