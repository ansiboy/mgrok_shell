import { remote } from 'electron'
let tbody = document.getElementById('modleInfo')
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
//============================================================
// MGROK 

const mgrok = require('./mgrok')
mgrok.start(function (model) {
    output(tbody, model)
})
main_win.on('close', function () {
    mgrok.close()
})

var is_outputing = false;
/**
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} model
 */
function output(tbody, model) {
    if (is_outputing)
        return;

    tbody.innerHTML = "";
    is_outputing = true
    for (let i = 0; i < model.length; i++) {
        if (model[i][0] == 'mgrok') {
            continue;
        }

        let row = tbody.rows[i]
        if (!row) {
            row = document.createElement('tr')
            row.innerHTML = '<td></td><td></td>'
            tbody.appendChild(row)
        }
        row.cells[0].innerText = model[i][0]
        row.cells[1].innerText = model[i][1]
    }

    is_outputing = false
}




