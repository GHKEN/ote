import * as React from 'react';

export interface SelectorProps {
    name: string,
    items: string[],
    item: string,
    type: 'select' | 'radio',
    onChange: (string) => void,
}

export default class Selector extends React.Component<SelectorProps, {}> {

    renderSelect() {
        let options = this.props.items.map((item) => {
            return <option key={item} value={item}>{item}</option>;
        });
        return <select name={this.props.name} value={this.props.item} onChange={(e) => {this.props.onChange(e.target['value'])}}>{options}</select>;
    }

    renderRadio() {
        return this.props.items.map((item) => {
            return (
                <label key={item}>{item}
                    <input
                        name={this.props.name}
                        type='radio'
                        value={item}
                        checked={this.props.item == item}
                        onChange={(e) => {this.props.onChange(e.target['value'])}}
                    />
                </label>
            );
        })
    }

    render() {
        let items = this.props.type == 'select' ? this.renderSelect() : this.renderRadio();
        return (
            <div>
                <h2>{this.props.name}</h2>
                {items}
            </div>
        );
    }
}