"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const child_process_1 = require("child_process");
class Mgrok {
    constructor(modelChanged) {
        this.modelChanged = modelChanged;
    }
    start() {
        let mgrok_path = path.join(__dirname, "../bin/mgrok");
        if (global.process.platform == "win32" && process.arch == 'x64') {
            mgrok_path = mgrok_path + '.exe';
        }
        if (!fs.existsSync(mgrok_path)) {
            return;
        }
        // child_process = spawn(mgrok_path, ['-log=stdout', `-config=${__dirname}/mgrok.yaml`, 'start', 'test'])
        this.child_process = child_process_1.spawn(mgrok_path, ['-log=stdout', '80']);
        this.child_process.stdout.on('data', (data) => {
            console.log(data.toString());
            if (this.modelChanged) {
                let obj = fetch_model(data.toString());
                if (obj != null && this.modelChanged != null) {
                    this.modelChanged(obj);
                }
            }
        });
        this.child_process.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        this.child_process.on('close', (code) => {
            console.log('child process exited with code ' + code);
        });
        this.child_process.on('error', (err) => {
            console.error(err);
        });
    }
    close() {
        if (this.child_process == null)
            return;
        this.child_process.kill();
    }
}
/**
 * 将输出的 MODEL 信息转换为对象
 * @param {string} text
 */
function fetch_model(text) {
    let lines = text.split('\n').filter(o => o.trim());
    let obj;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let tag = '[METRICS]';
        let tagIndex = line.indexOf(tag);
        if (tagIndex >= 0) {
            let str = line.substr(tagIndex + tag.length);
            try {
                obj = JSON.parse(str);
            }
            catch (exc) {
                console.log(exc);
                console.log(line);
                console.log(str);
            }
            break;
        }
    }
    return obj;
}
var instance;
function start(modelChanged) {
    instance = new Mgrok(modelChanged);
    instance.start();
}
exports.start = start;
function close() {
    if (instance == null)
        return;
    instance.close();
}
exports.close = close;
function restart() {
    if (instance == null)
        return;
    instance.close();
    instance.start();
}
exports.restart = restart;
