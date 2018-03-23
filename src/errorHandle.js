"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
function fireError(error) {
    let dialogElement = document.createElement('div');
    document.body.appendChild(dialogElement);
    ReactDOM.render(React.createElement(ErrorDialog, null), dialogElement);
    ui.showDialog(dialogElement);
}
exports.fireError = fireError;
class ErrorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "" };
    }
    render() {
        return (React.createElement("div", { className: "modal fade", ref: (e) => this.element = e || this.element },
            React.createElement("div", { className: "modal-dialog" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                        React.createElement("h4", { className: "modal-title" }, "\u9519\u8BEF")),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("p", null, this.state.message))))));
    }
}
