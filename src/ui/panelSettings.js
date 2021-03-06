"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const strings_1 = require("./../strings");
const electron_1 = require("electron");
let bootSetting = startOnBoot();
let WIN_REGISTRY_KEY = "mgrok_shell";
class PanelSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startUp: false, startMini: false };
        this.exePath = electron_1.remote.app.getPath("exe");
    }
    componentDidMount() {
        bootSetting.getAutoStartValue(WIN_REGISTRY_KEY, (result) => {
            if (!result)
                return;
            if (result != this.exePath) {
                bootSetting.enableAutoStart(WIN_REGISTRY_KEY, this.exePath);
            }
            this.state.startUp = true;
            this.setState(this.state);
        });
    }
    startUp() {
        let startUp = !this.state.startUp;
        if (startUp) {
            if (process.platform == "win32") {
                bootSetting.enableAutoStart(WIN_REGISTRY_KEY, this.exePath);
            }
        }
        else {
            bootSetting.disableAutoStart(WIN_REGISTRY_KEY);
        }
        this.state.startUp = startUp;
        this.setState(this.state);
    }
    startMini() {
        this.state.startMini = !this.state.startMini;
        this.setState(this.state);
    }
    render() {
        return (React.createElement("div", { id: "panelSettings", style: { display: 'none' }, className: "container" },
            React.createElement("form", null,
                React.createElement("div", { className: "checkbox" },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: this.state.startUp, onClick: () => this.startUp() }),
                        strings_1.default.StartUp)),
                React.createElement("div", { className: "checkbox" },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: this.state.startMini, onClick: () => this.startMini() }),
                        strings_1.default.StartMini)))));
    }
}
exports.PanelSettings = PanelSettings;
function startOnBoot() {
    var WinReg = require('winreg');
    var startOnBoot = {
        enableAutoStart: function (name, file, callback) {
            var key = getKey();
            key.set(name, WinReg.REG_SZ, file, callback || noop);
        },
        disableAutoStart: function (name, callback) {
            var key = getKey();
            key.remove(name, callback || noop);
        },
        getAutoStartValue: function (name, callback) {
            var key = getKey();
            key.get(name, function (error, result) {
                if (result) {
                    callback(result.value);
                }
                else {
                    callback(null, error);
                }
            });
        }
    };
    var RUN_LOCATION = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    function getKey() {
        return new WinReg({
            hive: WinReg.HKCU,
            key: RUN_LOCATION
        });
    }
    function noop() { }
    return startOnBoot;
}
