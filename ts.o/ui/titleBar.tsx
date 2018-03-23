import * as React from 'react';

interface Props extends React.Props<any> {
    win: Electron.BrowserWindow
}
export class TitleBar extends React.Component<Props, any>{
    element: HTMLElement;
    componentDidMount() {
        // let tbody = document.getElementById('modleInfo')
        let close_button = document.getElementById('closeButton')
        let minus_button = document.getElementById('minusButton')
        // let title_bar = document.getElementById('titleBar')

        close_button.onclick = (event) => {
            this.props.win.close()
            event.preventDefault()
        }
        minus_button.onclick = (event) => {
            this.props.win.hide()
            event.preventDefault()
        }
    }
    render() {
        return (
            <ul id="titleBar" className="nav nav-tabs" ref={e => this.element = e as any || this.element}>
                <li key={10} role="presentation" className="active">
                    <a href="#panelHome">Home</a>
                </li>
                <li key={20} role="presentation">
                    <a href="#panelTunnels">Tunnels</a>
                </li>
                <li key={30} role="presentation">
                    <a href="#panelSettings">Settings</a>
                </li>
                <li key={40} className="pull-right">
                    <div id="closeButton" className="button pull-right">
                        <i className="glyphicon glyphicon-remove"></i>
                    </div>
                    <div id="minusButton" className="button pull-right">
                        <i className="glyphicon glyphicon-minus"></i>
                    </div>
                </li>
            </ul>
        );
    }
}