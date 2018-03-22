import { remote } from 'electron';
import { HomePanel } from './ui/homePanel';
import { TunnelsPanel } from './ui/tunnelsPanel';
import { PanelSettings } from './ui/panelSettings';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// let tbody = document.getElementById('modleInfo')
let close_button = document.getElementById('closeButton')
let minus_button = document.getElementById('minusButton')
let title_bar = document.getElementById('titleBar')

let main_win = remote.BrowserWindow.getAllWindows()[0]
close_button.onclick = (event) => {
    main_win.close()
    event.preventDefault()
}
minus_button.onclick = (event) => {
    main_win.hide()
    event.preventDefault()
}

let panels = document.getElementById('panels').children;

ReactDOM.render(
    [<HomePanel key={'home'} win={main_win} />,
    <TunnelsPanel key="tunnels" mainPath={__dirname} />,
    <PanelSettings key="settings" />],
    document.getElementById('panels'),
    function () {
        (title_bar.querySelectorAll('a') as any).forEach((o, i) => {
            o.onclick = function () {
                let targetId = this.hash.substr(1)
                let targetElement = document.getElementById(targetId)
                for (let i = 0; i < panels.length; i++) {
                    if (panels.item(i).id == targetId) {
                        (panels.item(i) as HTMLElement).style.display = 'block'
                    }
                    else {
                        (panels.item(i) as HTMLElement).style.display = 'none'
                    }
                }

                title_bar.querySelector('.active').className = ''
                this.parentElement.className = 'active'
            }
        })

    }
);

//============================================================
// 实现窗口移动
let x, y
let capture
title_bar.onmousedown = (event) => {
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

let deltaX;
let deltaY;
window.onmousemove = (event) => {
    if (!capture) {
        return
    }
    if (x != null && y != null) {
        deltaX = event.screenX - x
        deltaY = event.screenY - y

        let pos = main_win.getPosition()
        let main_win_x = pos[0] + deltaX
        let main_win_y = pos[1] + deltaY
        main_win.setPosition(main_win_x, main_win_y)
    }

    x = event.screenX
    y = event.screenY
}
window.onkeydown = (event) => {
    // 按下 CTRL + C 退出
    // const cKey = 67;
    // if (event.ctrlKey && event.keyCode == cKey) {
    //     window.close()
    // }
}



