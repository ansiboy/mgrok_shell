"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class PanelSettings extends React.Component {
    render() {
        return (React.createElement("div", { id: "panelSettings", style: { display: 'none' }, className: "container" },
            React.createElement("form", null,
                React.createElement("div", { className: "checkbox" },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox" }),
                        "Start up (Software will auto start up after computer boot)")))));
    }
}
exports.PanelSettings = PanelSettings;
