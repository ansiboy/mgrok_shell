import * as React from 'react';
import strings from './../strings'

interface State extends React.Props<any> {
    startUp: boolean,
    startMini: boolean,
}

export class PanelSettings extends React.Component<{}, State>{
    constructor(props) {
        super(props)
        this.state = { startUp: false, startMini: false }
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