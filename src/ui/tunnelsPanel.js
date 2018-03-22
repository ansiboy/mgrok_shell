"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const fs = require("fs");
const path = require("path");
const electron_1 = require("electron");
class TunnelsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.configPath = path.join(this.props.mainPath, 'mgrok.yaml');
        let p = electron_1.remote.app.getAppPath();
        let text = "";
        if (fs.existsSync(this.configPath)) {
            let buffer = fs.readFileSync(this.configPath);
            text = buffer.toString();
        }
        this.state = { text };
    }
    save() {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.configPath, this.state.text, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    render() {
        return (React.createElement("div", { id: "panelTunnels", style: { display: 'none' }, className: "container" },
            React.createElement("div", { id: "content" },
                React.createElement("textarea", { ref: e => this.textarea = e || this.textarea, value: this.state.text, onChange: (e) => {
                        if (!e)
                            return;
                        this.state.text = e.currentTarget.value;
                        this.setState(this.state);
                    } })),
            React.createElement("div", { className: "navbar-fixed-bottom" },
                React.createElement("button", { className: "btn btn-primary btn-block", ref: (e) => {
                        if (!e)
                            return;
                        e.onclick = ui.buttonOnClick(() => this.save(), { toast: 'Save success' });
                    } }, "Save"))));
    }
}
exports.TunnelsPanel = TunnelsPanel;
