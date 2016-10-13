import * as React from 'react';

import KeyStorage from './keystorage';

import Decoder from './components/decoder';
import Verifier from './components/verifier';
import Selector from './components/selector';

interface JwtDebuggerState {
    jwt?: string,
    pubKey?: string,
    keyName?: string,
    keyNames?: string[],
}

export default class JwtDebugger extends React.Component<{}, JwtDebuggerState> {

    constructor(props: {}) {
        super(props);
        this.onKeyChange = this.onKeyChange.bind(this);
        this.onKeyNameChange = this.onKeyNameChange.bind(this);
        this.onKeySave = this.onKeySave.bind(this);
        this.onKeyRemove = this.onKeyRemove.bind(this);
        this.onChangeJwt = this.onChangeJwt.bind(this);
        this.onChangePubKey = this.onChangePubKey.bind(this);
    }

    state: JwtDebuggerState = {
        jwt: '',
        pubKey: KeyStorage.get('default'),
        keyName: 'default',
        keyNames: KeyStorage.getKeyNames(),
    }

    onKeyChange(keyName: string) {
        let newKey = KeyStorage.get(keyName);
        this.setState({pubKey: newKey, keyName: keyName});
    }

    onKeyNameChange(e: any) {
        let newKeyName = e.target.value;
        this.setState({keyName: newKeyName});
    }

    onKeySave(e: any) {
        KeyStorage.set(this.state.keyName, this.state.pubKey);
        let newKeyNames = KeyStorage.getKeyNames();
        this.setState({keyNames: newKeyNames, keyName: this.state.keyName});
    }

    onKeyRemove(e: any) {
        KeyStorage.unset(this.state.keyName);
        let newKeyNames = KeyStorage.getKeyNames();
        this.setState({keyNames: newKeyNames, keyName: 'default', pubKey: KeyStorage.get('default')});
    }

    onChangeJwt(e: any) {
        let newJwt = e.target.value;
        this.setState({jwt: newJwt});
    }

    onChangePubKey(e: any) {
        let newPubKey = e.target.value;
        this.setState({pubKey: newPubKey});
    }

    render() {
        return (
            <div>
                <h1>jwt debugger</h1>
                <div className='half'>
                    <h2>jwt</h2>
                    <textarea className='textarea w400' value={this.state.jwt} onChange={this.onChangeJwt}/>
                    <Selector items={this.state.keyNames} item={this.state.keyName} type='select' name='public key' onChange={this.onKeyChange}/>
                    <input type='text' value={this.state.keyName} onChange={this.onKeyNameChange}/>
                    <input type='button' value='保存' onClick={this.onKeySave}/>
                    <input type='button' value='削除' onClick={this.onKeyRemove}/>
                    <br/>
                    <textarea className='textarea w400' value={this.state.pubKey} onChange={this.onChangePubKey}/>
                </div>
                <div className='half'>
                    <Decoder jwt={this.state.jwt}/>
                    <Verifier jwt={this.state.jwt} pubKey={this.state.pubKey}/>
                </div>
            </div>
        );
    }
}