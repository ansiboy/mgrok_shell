import * as React from 'react';

export class PanelSettings extends React.Component<React.Props<any>, any>{
    render() {
        return (
            <div id="panelSettings" style={{ display: 'none' }} className="container">
                <form>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" />Start up (Software will auto start up after computer boot)
                    </label>
                    </div>
                </form>
            </div>
        );
    }
}