const { isArray } = 'util';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


let child_process
function start(model_changed) {
    let mgrok_path = "";
    if (global.process.platform == "darwin" && process.arch == 'x64') {
        mgrok_path = 'mgrok/darwin_amd64/mgrok'
    }
    else if (global.process.platform == "win32" && process.arch == 'x64') {
        mgrok_path = 'mgrok/windows_amd64/mgrok'
    }

    if (!mgrok_path) {
        return
    }
    child_process = spawn(mgrok_path, ['-log=stdout', `-config=${__dirname}/mgrok.yaml`, 'start', 'test'])
    child_process.stdout.on('data', function (data) {
        console.log(data.toString());
        if (model_changed) {
            let obj = fetch_model(data.toString())
            if (obj != null && model_changed != null) {
                model_changed(obj)
            }
        }
    });

    child_process.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    child_process.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });

    child_process.on('error', function (err) {
        console.error(err);
    })

    return child_process;
}

function close() {
    if (child_process == null)
        return

    child_process.kill();
}

/**
 * 将输出的 MODEL 信息转换为对象
 * @param {string} text 
 */
function fetch_model(text) {
    let lines = text.split('\n').filter(o => o.trim())

    let obj;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let tag = '[METRICS]'
        let tagIndex = line.indexOf(tag)
        if (tagIndex >= 0) {
            let str = line.substr(tagIndex + tag.length)
            try {
                obj = JSON.parse(str)
            }
            catch (exc) {
                console.log(exc)
                debugger
                console.log(line)
                console.log(str)
            }
            break;
        }
    }

    return obj
}

function clearModel() {
    let names = Object.getOwnPropertyNames(model)
    for (let i = 0; i < names.length; i++) {
        delete model[name]
    }
}

module.exports = {
    start,
    close
}
