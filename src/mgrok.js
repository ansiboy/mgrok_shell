"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var Mgrok = /** @class */ (function () {
    function Mgrok(modelChanged) {
        this.modelChanged = modelChanged;
    }
    Mgrok.prototype.start = function () {
        var _this = this;
        var mgrok_path = path.join(__dirname, "../bin/mgrok");
        if (global.process.platform == "win32" && process.arch == 'x64') {
            mgrok_path = mgrok_path + '.exe';
        }
        if (!fs.existsSync(mgrok_path)) {
            return;
        }
        // child_process = spawn(mgrok_path, ['-log=stdout', `-config=${__dirname}/mgrok.yaml`, 'start', 'test'])
        this.child_process = child_process_1.spawn(mgrok_path, ['-log=stdout', '80']);
        this.child_process.stdout.on('data', function (data) {
            console.log(data.toString());
            if (_this.modelChanged) {
                var obj = fetch_model(data.toString());
                if (obj != null && _this.modelChanged != null) {
                    _this.modelChanged(obj);
                }
            }
        });
        this.child_process.stderr.on('data', function (data) {
            console.log(data.toString());
        });
        this.child_process.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
        this.child_process.on('error', function (err) {
            console.error(err);
        });
    };
    Mgrok.prototype.close = function () {
        if (this.child_process == null)
            return;
        this.child_process.kill();
    };
    return Mgrok;
}());
/**
 * 将输出的 MODEL 信息转换为对象
 * @param {string} text
 */
function fetch_model(text) {
    var lines = text.split('\n').filter(function (o) { return o.trim(); });
    var obj;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var tag = '[METRICS]';
        var tagIndex = line.indexOf(tag);
        if (tagIndex >= 0) {
            var str = line.substr(tagIndex + tag.length);
            try {
                obj = JSON.parse(str);
            }
            catch (exc) {
                console.log(exc);
                debugger;
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
