"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TitleBar extends React.Component {
    componentDidMount() {
        // let tbody = document.getElementById('modleInfo')
        let close_button = document.getElementById('closeButton');
        let minus_button = document.getElementById('minusButton');
        // let title_bar = document.getElementById('titleBar')
        close_button.onclick = (event) => {
            this.props.win.close();
            event.preventDefault();
        };
        minus_button.onclick = (event) => {
            this.props.win.hide();
            event.preventDefault();
        };
    }
    render() {
        return (React.createElement("ul", { id: "titleBar", className: "nav nav-tabs", ref: e => this.element = e || this.element },
            React.createElement("li", { key: 10, role: "presentation", className: "active" },
                React.createElement("a", { href: "#panelHome" }, "Home")),
            React.createElement("li", { key: 20, role: "presentation" },
                React.createElement("a", { href: "#panelTunnels" }, "Tunnels")),
            React.createElement("li", { key: 30, role: "presentation" },
                React.createElement("a", { href: "#panelSettings" }, "Settings")),
            React.createElement("li", { key: 40, className: "pull-right" },
                React.createElement("div", { id: "closeButton", className: "button pull-right" },
                    React.createElement("i", { className: "glyphicon glyphicon-remove" })),
                React.createElement("div", { id: "minusButton", className: "button pull-right" },
                    React.createElement("i", { className: "glyphicon glyphicon-minus" })))));
    }
}
exports.TitleBar = TitleBar;