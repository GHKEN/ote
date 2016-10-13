import * as React from 'react';
import {ipcRenderer} from 'electron';

interface DecoderProps {
    jwt: string,
}

export default class Decoder extends React.Component<DecoderProps, {}> {

    private decode(jwt: string): Object {
        let decoded = ipcRenderer.sendSync('decode', {jwt: jwt});
        return decoded;
    }

    private timestampToDateTime(timestamp: number): string {
        return (new Date(timestamp * 1000)).toLocaleString();
    }

    renderHeaderInfo(jwtHeader: Object) {
        return this.renderKeyValeTable('header', jwtHeader);
    }

    renderPayloadInfo(jwtPayload: Object) {
        return this.renderKeyValeTable('payload', jwtPayload);
    }

    renderKeyValeTable(caption: string, keyValueObject: Object) {
        let rows: JSX.Element[] = [];
        for (let key in keyValueObject) {
            let moreInfo = '';
            if (['iat', 'exp'].indexOf(key) !== -1) {
                moreInfo = '(' + this.timestampToDateTime(Number(JSON.stringify(keyValueObject[key]))) + ')';
            }
            let row: JSX.Element = (
                <tr key={key}>
                    <th className='border'>{key}</th>
                    <td className='border'>{JSON.stringify(keyValueObject[key]) + moreInfo}</td>
                </tr>
            );
            rows.push(row);
        }
        return (
            <table>
                <caption>{caption}</caption>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    render() {
        let decoded = this.decode(this.props.jwt);
        let headerInfo = decoded ? this.renderHeaderInfo(decoded['header']) : null;
        let payloadInfo = decoded ? this.renderPayloadInfo(decoded['payload']) : null;
        return (
            <div>
                <h2>decoder</h2>
                <div className='border'>
                    {headerInfo}
                    {payloadInfo}
                </div>
            </div>
        );
    }
}