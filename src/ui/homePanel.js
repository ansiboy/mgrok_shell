"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mgrok_1 = require("./../mgrok");
const logView_1 = require("./logView");
class HomePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { model: [] };
    }
    componentDidMount() {
        mgrok_1.default.modelChanged = (model) => {
            this.state.model = model;
            this.setState(this.state);
        };
        mgrok_1.default.start();
        this.props.win.on('close', () => {
            mgrok_1.default.close();
        });
    }
    render() {
        let { model } = this.state;
        return (React.createElement("div", { id: "panelHome", className: "container", ref: (e) => this.tbody = e || this.tbody },
            React.createElement("table", null,
                React.createElement("tbody", { id: "modleInfo" }, model.filter(o => o[0] != 'mgrok').map((o, i) => React.createElement("tr", { key: i },
                    React.createElement("td", null, o[0]),
                    React.createElement("td", null, o[1]))))),
            React.createElement(logView_1.LogView, null)));
    }
}
exports.HomePanel = HomePanel;
var is_outputing = false;
/**
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} model
 */
function output(tbody, model) {
    if (is_outputing)
        return;
    tbody.innerHTML = "";
    is_outputing = true;
    for (let i = 0; i < model.length; i++) {
        if (model[i][0] == 'mgrok') {
            continue;
        }
        let row = tbody.rows[i];
        if (!row) {
            row = document.createElement('tr');
            row.innerHTML = '<td></td><td></td>';
            tbody.appendChild(row);
        }
        row.cells[0].innerText = model[i][0];
        row.cells[1].innerText = model[i][1];
    }
    is_outputing = false;
}
