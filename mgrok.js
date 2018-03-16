const { isArray } = 'util';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


let child_process
function start(model_changed) {
    child_process = spawn('mgrok.exe', ['-log=stdout', 'start', 'test'])
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
        var items = line.split('|')
            .filter(o => o.trim())

        items.forEach(o => o.trim())

        if (items.length == 2) {
            if (obj == null) {
                obj = []
            }

            obj.push(items)
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
