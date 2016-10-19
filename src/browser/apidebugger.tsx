import * as React from 'react';

import ApiParams from './components/apiparams';
import Selector from './components/selector';

interface ApiDebuggerState {
    token?: string,
    url?: string,
    params?: {key: string, value: any}[],
    response?: string,
    method?: Method,
    contentType?: ContentType,
}

type Method = 'get' | 'post' | 'patch' | 'delete' | 'put';
type ContentType = 'application/json' | 'application/x-www-form-urlencoded';

export default class ApiDebugger extends React.Component<{}, ApiDebuggerState> {

    private methods = ['get', 'post', 'patch', 'put', 'delete'];
    private contentTypes = ['application/json', 'application/x-www-form-urlencoded'];

    constructor(props) {
        super(props);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeParams = this.onChangeParams.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.onChangeContentType = this.onChangeContentType.bind(this);
        this.apiResponseHandler = this.apiResponseHandler.bind(this);
    }

    state: ApiDebuggerState = {
        token: '',
        url: '',
        params: [{key: '', value: ''}],
        method: 'get',
        response: '',
        contentType: 'application/json',
    }

    onChangeToken(e: React.FormEvent<HTMLInputElement>) {
        let newToken = e.target['value'];
        this.setState({token: newToken});
    }

    onChangeUrl(e: React.FormEvent<HTMLInputElement>) {
        let newUrl = e.target['value'];
        this.setState({url: newUrl});
    }

    onChangeMethod(method: Method) {
        this.setState({method: method});
    }

    onChangeContentType(contentType: ContentType) {
        this.setState({contentType: contentType});
    }

    onChangeParams(params: {key: string, value: any}[]) {
        this.setState({params: params});
    }

    callApi() {
        let xhr = new XMLHttpRequest();
        let url = this.getUrl();
        xhr.open(this.state.method, url);
        xhr.setRequestHeader('Content-Type', this.state.contentType);
        if (this.state.token != '') {
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.state.token);
        }
        xhr.addEventListener('load', this.apiResponseHandler);
        let params = this.getParams();
        xhr.send(params);
    }

    getUrl() {
        if (this.state.method != 'get') {
            return this.state.url;
        }
        let query = this.state.params.filter((param) => {
            return param['key'] != '';
        }).map((param) => {
            return param.key + '=' + param.value;
        }).join('&');
        return this.state.url + '?' + query;
    }

    getParams(): string | FormData {
        let validParams = this.state.params.filter((param) => {
            return param['key'] != '';
        });
        switch (this.state.contentType) {
            case 'application/json':
                let params = new Object();
                validParams.forEach((param) => {
                    params[param['key']] = param['value'];
                });
                return JSON.stringify(params);
            case 'application/x-www-form-urlencoded':
                let formData = new FormData();
                validParams.forEach((param) => {
                    formData.append(param['key'], param['value']);
                });
                return formData;
            default:
                return '';
        }
    }

    apiResponseHandler(e: Event) {
        this.setState({response: e.target['responseText']});
    }

    render() {
        return (
            <div>
                <h1>api debugger</h1>
                <div className='half'>
                    <h2>request</h2>
                    <div className='alignCenter'>
                        <h3>url</h3>
                        <input className='wMax' type='text' value={this.state.url} onChange={this.onChangeUrl}/>
                        <h3>token</h3>
                        <input className='wMax' type='text' value={this.state.token} onChange={this.onChangeToken}/>
                        <Selector name='method' type='select' items={this.methods} item={this.state.method} onChange={this.onChangeMethod}/>
                        <Selector name='contentType' type='select' items={this.contentTypes} item={this.state.contentType} onChange={this.onChangeContentType}/>
                        <ApiParams onChange={this.onChangeParams} params={this.state.params}/>
                        <input type='button' value='send' onClick={() => {this.callApi()}}/>
                    </div>
                </div>
                <div className='half'>
                    <h2>response</h2>
                    <pre className='border'>{this.state.response}</pre>
                </div>
            </div>
        );
    }
}