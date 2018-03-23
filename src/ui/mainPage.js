"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const homePanel_1 = require("./homePanel");
const tunnelsPanel_1 = require("./tunnelsPanel");
const panelSettings_1 = require("./panelSettings");
const titleBar_1 = require("./titleBar");
class MainPage extends React.Component {
    componentDidMount() {
        let allAnchors = this.titleBar.element.querySelectorAll('a');
        let panels = this.panelsContainer.children;
        allAnchors.forEach((o, i) => {
            o.onclick = () => {
                let targetId = o.hash.substr(1);
                let targetElement = document.getElementById(targetId);
                for (let i = 0; i < panels.length; i++) {
                    if (panels.item(i).id == targetId) {
                        panels.item(i).style.display = 'block';
                    }
                    else {
                        panels.item(i).style.display = 'none';
                    }
                }
                this.titleBar.element.querySelector('.active').className = '';
                o.parentElement.className = 'active';
            };
        });
        this.enableMove();
    }
    enableMove() {
        //============================================================
        // 实现窗口移动
        let x, y;
        let capture;
        this.titleBar.element.onmousedown = (event) => {
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
        window.onkeydown = (event) => {
            // 按下 CTRL + C 退出
            let F12 = 123;
            if (event.keyCode == F12) {
                this.props.win.webContents.openDevTools();
            }
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
                let pos = this.props.win.getPosition();
                let main_win_x = pos[0] + deltaX;
                let main_win_y = pos[1] + deltaY;
                this.props.win.setPosition(main_win_x, main_win_y);
            }
            x = event.screenX;
            y = event.screenY;
        };
    }
    render() {
        let main_win = this.props.win;
        return [
            React.createElement(titleBar_1.TitleBar, { win: main_win, ref: e => this.titleBar = e || this.titleBar }),
            React.createElement("div", { id: "panels", ref: e => this.panelsContainer = e || this.panelsContainer },
                React.createElement(homePanel_1.HomePanel, { key: 'home', win: main_win }),
                React.createElement(tunnelsPanel_1.TunnelsPanel, { key: "tunnels", mainPath: this.props.mainPath }),
                React.createElement(panelSettings_1.PanelSettings, { key: "settings" }))
        ];
    }
}
exports.MainPage = MainPage;
