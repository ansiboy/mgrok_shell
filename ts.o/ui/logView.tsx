import * as React from 'react';
import mgrok from './../mgrok';

interface State {
    logs: string[]
}
export class LogView extends React.Component<any, State>{
    constructor(props) {
        super(props);

        this.state = { logs: [] }


    }
    componentDidMount() {
        mgrok.logChanged = (msg) => {
            this.state.logs.unshift(msg);
            this.setState(this.state);
        }
    }
    render() {
        let { logs } = this.state;
        return (
            <div className="log navbar-fixed-bottom">
                <ul className="list-unstyled">
                    {logs.map(o =>
                        <li>{o}</li>
                    )}
                </ul>
            </div>
        );
    }
}