import { remote } from 'electron';
import { MainPage } from './ui/mainPage';

import * as React from 'react';
import * as ReactDOM from 'react-dom';


let main_win = remote.BrowserWindow.getAllWindows()[0]
let element = document.createElement('div')
document.body.appendChild(element)
ReactDOM.render(<MainPage win={main_win} mainPath={__dirname} />, element)





