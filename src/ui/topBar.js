"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TopBar extends React.Component {
    render() {
        return (React.createElement("ul", { id: "titleBar", className: "nav nav-tabs" },
            React.createElement("li", { role: "presentation", className: "active" },
                React.createElement("a", { href: "#panelHome" }, "Home")),
            React.createElement("li", { role: "presentation" },
                React.createElement("a", { href: "#panelTunnels" }, "Tunnels")),
            React.createElement("li", { role: "presentation" },
                React.createElement("a", { href: "#panelSettings" }, "Settings")),
            React.createElement("li", { className: "pull-right" },
                React.createElement("div", { id: "closeButton", className: "button pull-right" },
                    React.createElement("i", { className: "glyphicon glyphicon-remove" })),
                React.createElement("div", { id: "minusButton", className: "button pull-right" },
                    React.createElement("i", { className: "glyphicon glyphicon-minus" })))));
    }
}
exports.TopBar = TopBar;
