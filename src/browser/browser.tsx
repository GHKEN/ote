import * as React from 'react';
import * as ReactDOM from 'react-dom';

import JwtDebugger from './jwtdebugger';
import ApiDebugger from './apidebugger';

interface MainState {
}

class Main extends React.Component<{}, MainState> {

    state: MainState = {
    }

    render() {
        return (
            <div>
                <JwtDebugger/>
                <ApiDebugger/>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('app'));