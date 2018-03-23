"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let defaultStrings = {
    Home: 'Home',
    Tunnels: 'Tunnels',
    Settings: 'Settings',
    Save: 'Save',
    SaveSuccess: 'Save success',
    StartUp: 'Start up (Software will auto start up after computer boot)',
    StartMini: 'Start mini (Software mini as tray icon after start)',
};
let zhCNStrings = {
    Home: '首页',
    Tunnels: '隧道',
    Settings: '设置',
    Save: '保存',
    SaveSuccess: '保存成功',
    StartUp: '开机启动 (电脑启动后软件将自动启动)',
    StartMini: '启动最小化 (软件启动后最小化为托盘图标)',
};
let allStrings = {
    default: defaultStrings,
    'zh-CN': zhCNStrings,
};
let locale = electron_1.remote.app.getLocale();
let strings = Object.assign(allStrings.default, allStrings[locale] || {});
exports.default = strings;
