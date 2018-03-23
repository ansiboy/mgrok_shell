import * as React from 'react'
import * as ReactDOM from 'react-dom'

export function fireError(error: Error) {
    let dialogElement = document.createElement('div');
    document.body.appendChild(dialogElement);
    ReactDOM.render(<ErrorDialog />, dialogElement);
    ui.showDialog(dialogElement);
}

interface State {
    message: string
}

class ErrorDialog extends React.Component<any, State>{
    element: HTMLElement;
    constructor(props) {
        super(props)
        this.state = { message: "" }
    }
    render() {
        return (
            <div className="modal fade" ref={(e) => this.element = e as any || this.element}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">错误</h4>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



