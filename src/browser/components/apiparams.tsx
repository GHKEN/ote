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
        return params.map((param, index) => {
            return (
                <div key={index}>
                    <label>key: <input value={param.key} type='text' onChange={this.buildParamKeyOnChange(index)}/></label>
                    <label>value: <input key='value' value={param.value} type='text' onChange={this.buildParamValueOnChange(index)}/></label>
                    <input type='button' onClick={this.buildDeleteParam(index)} value='削除'/>
                </div>
            );
        });
    }

    private addParam() {
        let newParams = this.props.params;
        newParams.push({key: '', value: ''});
        this.props.onChange(newParams);
    }

    render() {
        let params = this.renderParams(this.props.params);
        return (
            <form>
                <h2>params</h2>
                {params}
                <input type='button' onClick={() => {this.addParam()}} value='追加'/>
            </form>
        );
    }
}