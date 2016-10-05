import * as React from 'react';
import {ipcRenderer} from 'electron';

interface VerifierProps {
    jwt: string,
    pubKey: string,
}

export default class Verifier extends React.Component<VerifierProps, {}> {

    verify(jwt: string, pubKey: string): boolean {
        let res = ipcRenderer.sendSync('verify', {jwt: jwt, pubKey: pubKey});
        return res;
    }

    render() {
        let res = this.verify(this.props.jwt, this.props.pubKey);
        return (
            <div>
                <h2>verifier</h2>
                <div>{res['isValid'].toString()}</div>
                <div>{res['err']}</div>
            </div>
        );
    }
}