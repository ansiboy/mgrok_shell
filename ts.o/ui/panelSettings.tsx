import * as React from 'react';
import strings from './../strings'
import * as regedit from 'regedit';
import { remote } from 'electron';

interface State extends React.Props<any> {
    startUp: boolean,
    startMini: boolean,
}

let bootSetting = startOnBoot()
let WIN_REGISTRY_KEY = "mgrok_shell"
export class PanelSettings extends React.Component<{}, State>{
    exePath: string;

    constructor(props) {
        super(props)
        this.state = { startUp: false, startMini: false }
        this.exePath = remote.app.getPath("exe");

    }
    componentDidMount() {
        bootSetting.getAutoStartValue(WIN_REGISTRY_KEY, (result) => {
            if (!result) return;
            if (result != this.exePath) {
                bootSetting.enableAutoStart(WIN_REGISTRY_KEY, this.exePath)
            }

            this.state.startUp = true;
            this.setState(this.state);
        })
    }
    startUp() {
        let startUp = !this.state.startUp;
        if (startUp) {
            if (process.platform == "win32") {
                bootSetting.enableAutoStart(WIN_REGISTRY_KEY, this.exePath)
            }
        }
        else {
            bootSetting.disableAutoStart(WIN_REGISTRY_KEY)
        }
        
        this.state.startUp = startUp;
        this.setState(this.state);
    }
    startMini() {
        this.state.startMini = !this.state.startMini;
        this.setState(this.state);
    }
    render() {
        return (
            <div id="panelSettings" style={{ display: 'none' }} className="container">
                <form>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={this.state.startUp}
                                onClick={() => this.startUp()} />{strings.StartUp}
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={this.state.startMini}
                                onClick={() => this.startMini()} />{strings.StartMini}
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

function startOnBoot() {

    var WinReg = require('winreg');

    var startOnBoot = {
        enableAutoStart: function (name, file, callback?) {
            var key = getKey();
            key.set(name, WinReg.REG_SZ, file, callback || noop);
        },
        disableAutoStart: function (name, callback?) {
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
            hive: WinReg.HKCU, //CurrentUser,
            key: RUN_LOCATION
        });
    }

    function noop() { }

    return startOnBoot;
}