"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mgrok_1 = require("./../mgrok");
class LogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] };
    }
    componentDidMount() {
        mgrok_1.default.logChanged = (msg) => {
            this.state.logs.unshift(msg);
            this.setState(this.state);
        };
    }
    render() {
        let { logs } = this.state;
        return (React.createElement("div", { className: "log navbar-fixed-bottom" },
            React.createElement("ul", { className: "list-unstyled" }, logs.map(o => React.createElement("li", null, o)))));
    }
}
exports.LogView = LogView;
