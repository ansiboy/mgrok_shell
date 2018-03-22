import * as React from 'react';
import * as  mgrok from './../mgrok';

interface State {
    model: Array<string[]>
}
interface Props extends React.Props<any> {
    win: Electron.BrowserWindow
}
export class HomePanel extends React.Component<Props, State>{
    private tbody: HTMLTableSectionElement;

    constructor(props) {
        super(props);
        this.state = { model: [] };
    }

    componentDidMount() {
        mgrok.start((model) => {
            // output(this.tbody, model)
            this.state.model = model;
            this.setState(this.state);
        })
        this.props.win.on('close', () => {
            mgrok.close()
        })
    }
    render() {
        let { model } = this.state;
        return (
            <div id="panelHome" className="container" ref={(e) => this.tbody = e as any || this.tbody}>
                <table>
                    <tbody id="modleInfo">
                        {model.map((o, i) =>
                            <tr key={i}>
                                <td>{o[0]}</td>
                                <td>{o[1]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}



var is_outputing = false;
/**
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} model
 */
function output(tbody: HTMLTableSectionElement, model) {
    if (is_outputing)
        return;

    tbody.innerHTML = "";
    is_outputing = true
    for (let i = 0; i < model.length; i++) {
        if (model[i][0] == 'mgrok') {
            continue;
        }

        let row = tbody.rows[i]
        if (!row) {
            row = document.createElement('tr')
            row.innerHTML = '<td></td><td></td>'
            tbody.appendChild(row)
        }
        row.cells[0].innerText = model[i][0]
        row.cells[1].innerText = model[i][1]
    }

    is_outputing = false
}
