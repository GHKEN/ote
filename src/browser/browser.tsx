import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ModeTab from './components/modetab';
import JwtDebugger from './jwtdebugger';
import ApiDebugger from './apidebugger';

import Mode from './types/mode';

interface MainState {
    mode?: Mode,
}

class Main extends React.Component<{}, MainState> {

    state: MainState = {
        mode: 'jwt',
    }

    renderDebugger(mode: Mode) {
        switch (mode) {
            case 'jwt':
                return <JwtDebugger/>;
            case 'api':
                return <ApiDebugger/>;
        }
    }

    changeMode(mode: Mode) {
        this.setState({mode: mode});
    }

    render() {
        let dbg = this.renderDebugger(this.state.mode);
        return (
            <div>
                <ModeTab mode={this.state.mode} onChange={(mode: Mode) => {this.changeMode(mode)}}/>
                {dbg}
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('app'));