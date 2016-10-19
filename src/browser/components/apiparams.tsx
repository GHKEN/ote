import * as React from 'react';

interface ApiParamsProps {
    onChange: (params: Object) => void,
    params: {key: string, value: any}[],
}

export default class ApiParams extends React.Component<ApiParamsProps, {}> {

    constructor(props: ApiParamsProps) {
        super(props);
        this.buildParamKeyOnChange = this.buildParamKeyOnChange.bind(this);
        this.buildParamValueOnChange = this.buildParamValueOnChange.bind(this);
    }

    buildParamKeyOnChange(index: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            let newKey = e.target['value'];
            let newParams = this.props.params;
            newParams[index].key = newKey;
            this.props.onChange(newParams);
        }
    }

    buildParamValueOnChange(index: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            let newVal = e.target['value'];
            let newParams = this.props.params;
            newParams[index].value = newVal;
            this.props.onChange(newParams);
        }
    }

    buildDeleteParam(index: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            let newParams = this.props.params;
            delete newParams[index];
            this.props.onChange(newParams);
        }
    }

    private renderParams(params: {key: string, value: any}[]) {
        let rows = params.map((param, index) => {
            let addButton = (index == params.length - 1) ? <td><input type='button' onClick={() => {this.addParam()}} value='add'/></td> : null;
            return (
                <tr key={index}>
                    <td><input value={param.key} type='text' onChange={this.buildParamKeyOnChange(index)}/></td>
                    <td><input key='value' value={param.value} type='text' onChange={this.buildParamValueOnChange(index)}/></td>
                    <td><input type='button' onClick={this.buildDeleteParam(index)} value='delete'/></td>
                    {addButton}
                </tr>
            );
        });
        return rows;
    }

    private addParam() {
        let newParams = this.props.params;
        newParams.push({key: '', value: ''});
        this.props.onChange(newParams);
    }

    render() {
        let params = this.renderParams(this.props.params);
        return (
            <div>
                <h2>params</h2>
                <table>
                    <thead>
                        <tr>
                            <th>key</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {params}
                    </tbody>
                </table>
            </div>
        );
    }
}