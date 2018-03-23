import * as React from 'react';
import { HomePanel } from './homePanel';
import { TunnelsPanel } from './tunnelsPanel';
import { PanelSettings } from './panelSettings';
import { TitleBar } from './titleBar';

export class MainPage extends React.Component<{ win: Electron.BrowserWindow, mainPath: string }, any>{
    panelsContainer: HTMLElement;
    titleBar: TitleBar;
    componentDidMount() {
        let allAnchors = this.titleBar.element.querySelectorAll('a') as any;
        let panels = this.panelsContainer.children;
        allAnchors.forEach((o, i) => {
            o.onclick = () => {
                let targetId = o.hash.substr(1)
                let targetElement = document.getElementById(targetId)
                for (let i = 0; i < panels.length; i++) {
                    if (panels.item(i).id == targetId) {
                        (panels.item(i) as HTMLElement).style.display = 'block'
                    }
                    else {
                        (panels.item(i) as HTMLElement).style.display = 'none'
                    }
                }

                this.titleBar.element.querySelector('.active').className = ''
                o.parentElement.className = 'active'
            }
        })
        this.enableMove()
    }
    enableMove() {
        //============================================================
        // 实现窗口移动
        let x: number, y: number;
        let capture: boolean;
        this.titleBar.element.onmousedown = (event) => {
            console.log(`onmousedown ${event.x} ${event.y}`)
            if (event.x > 720 && event.x < 110) {
                return;
            }
            capture = true
        }
        window.onmouseup = (event) => {
            capture = false
            x = null
            y = null
        }
        window.onkeydown = (event) => {
            // 按下 CTRL + C 退出
            let F12 = 123;
            if (event.keyCode == F12) {
                this.props.win.webContents.openDevTools();
            }
        }

        let deltaX;
        let deltaY;
        window.onmousemove = (event) => {
            if (!capture) {
                return
            }
            if (x != null && y != null) {
                deltaX = event.screenX - x
                deltaY = event.screenY - y

                let pos = this.props.win.getPosition()
                let main_win_x = pos[0] + deltaX
                let main_win_y = pos[1] + deltaY
                this.props.win.setPosition(main_win_x, main_win_y)
            }

            x = event.screenX
            y = event.screenY
        }


    }
    render() {
        let main_win = this.props.win;
        return [
            <TitleBar win={main_win} ref={e => this.titleBar = e || this.titleBar} />,
            <div id="panels" ref={e => this.panelsContainer = e as HTMLElement || this.panelsContainer}>
                <HomePanel key={'home'} win={main_win} />
                <TunnelsPanel key="tunnels" mainPath={this.props.mainPath} />
                <PanelSettings key="settings" />
            </div>
        ]
    }
}
