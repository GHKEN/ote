import * as React from 'react';

import Mode from '../types/mode';

interface ModeTabProps {
    onChange: (mode: Mode) => void,
    mode: Mode,
}

export default class ModeTab extends React.Component<ModeTabProps, {}> {

    private modes = ['jwt', 'api'];

    render() {
        let tabs = this.modes.map((mode: Mode) => {
            let classNames = this.props.mode == mode ? 'tab active' : 'tab';
            return <li key={mode} className={classNames} onClick={() => {this.props.onChange(mode)}}>{mode}</li>;
        });

        return (
            <ul className='tabs'>
                {tabs}
            </ul>
        );
    }
}