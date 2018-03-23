"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const strings_1 = require("./../strings");
class PanelSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startUp: false, startMini: false };
    }
    startUp() {
        this.state.startUp = !this.state.startUp;
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
