import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { remote } from 'electron'
import strings from './../strings'

interface State {
    text: string;
}

interface Props extends React.Props<any> {
    mainPath: string
}

export class TunnelsPanel extends React.Component<Props, State> {
    private textarea: HTMLTextAreaElement;
    private configPath: string;

    constructor(props) {
        super(props);

        this.configPath = path.join(this.props.mainPath, 'mgrok.yaml');
        let p = remote.app.getAppPath();
        let text = "";
        if (fs.existsSync(this.configPath)) {
            let buffer = fs.readFileSync(this.configPath)
            text = buffer.toString();
        }

        this.state = { text };
    }
    save() {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.configPath, this.state.text, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        })
    }
    render() {
        return (
            <div id="panelTunnels" style={{ display: 'none' }} className="container">
                <div id="content">
                    <textarea ref={e => this.textarea = e as any || this.textarea} value={this.state.text}
                        onChange={(e) => {
                            if (!e) return;
                            this.state.text = (e.currentTarget as HTMLTextAreaElement).value;
                            this.setState(this.state);
                        }}>
                    </textarea>
                </div>
                <div className="navbar-fixed-bottom">
                    <button className="btn btn-primary btn-block"
                        ref={(e: HTMLButtonElement) => {
                            if (!e) return;
                            e.onclick = ui.buttonOnClick(() => this.save(), { toast: strings.SaveSuccess });

                        }}>{strings.Save}</button>
                </div>
            </div>
        );
    }
}