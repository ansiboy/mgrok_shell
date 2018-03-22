"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var tbody = document.getElementById('modleInfo');
var close_button = document.getElementById('closeButton');
var minus_button = document.getElementById('minusButton');
var title_bar = document.getElementById('titleBar');
var main_win = electron_1.remote.BrowserWindow.getAllWindows()[0];
close_button.onclick = function (event) {
    main_win.close();
    event.preventDefault();
};
minus_button.onclick = function (event) {
    main_win.hide();
    event.preventDefault();
};
var panels = document.getElementById('panels').children;
title_bar.querySelectorAll('a').forEach(function (o, i) {
    o.onclick = function () {
        var targetId = this.hash.substr(1);
        var targetElement = document.getElementById(targetId);
        for (var i_1 = 0; i_1 < panels.length; i_1++) {
            if (panels.item(i_1).id == targetId) {
                panels.item(i_1).style.display = 'block';
            }
            else {
                panels.item(i_1).style.display = 'none';
            }
        }
        title_bar.querySelector('.active').className = '';
        this.parentElement.className = 'active';
    };
});
//============================================================
// 实现窗口移动
var x, y;
var capture;
title_bar.onmousedown = function (event) {
    console.log("onmousedown " + event.x + " " + event.y);
    if (event.x > 720 && event.x < 110) {
        return;
    }
    capture = true;
};
window.onmouseup = function (event) {
    capture = false;
    x = null;
    y = null;
};
var deltaX;
var deltaY;
window.onmousemove = function (event) {
    if (!capture) {
        return;
    }
    if (x != null && y != null) {
        deltaX = event.screenX - x;
        deltaY = event.screenY - y;
        var pos = main_win.getPosition();
        var main_win_x = pos[0] + deltaX;
        var main_win_y = pos[1] + deltaY;
        main_win.setPosition(main_win_x, main_win_y);
    }
    x = event.screenX;
    y = event.screenY;
};
window.onkeydown = function (event) {
    // 按下 CTRL + C 退出
    // const cKey = 67;
    // if (event.ctrlKey && event.keyCode == cKey) {
    //     window.close()
    // }
};
//============================================================
// MGROK 
var mgrok = require('./mgrok');
mgrok.start(function (model) {
    output(tbody, model);
});
main_win.on('close', function () {
    mgrok.close();
});
var is_outputing = false;
/**
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} model
 */
function output(tbody, model) {
    if (is_outputing)
        return;
    tbody.innerHTML = "";
    is_outputing = true;
    for (var i = 0; i < model.length; i++) {
        if (model[i][0] == 'mgrok') {
            continue;
        }
        var row = tbody.rows[i];
        if (!row) {
            row = document.createElement('tr');
            row.innerHTML = '<td></td><td></td>';
            tbody.appendChild(row);
        }
        row.cells[0].innerText = model[i][0];
        row.cells[1].innerText = model[i][1];
    }
    is_outputing = false;
}
