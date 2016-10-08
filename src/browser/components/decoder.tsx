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

    renderHeaderInfo(jwtHeader: Object) {
        let headerInfoTable = this.renderKeyValeTable(jwtHeader);
        return (
            <div>
                <h3>header</h3>
                {headerInfoTable}
            </div>
        );
    }

    renderPayloadInfo(jwtPayload: Object) {
        let payloadInfoTable = this.renderKeyValeTable(jwtPayload);
        return (
            <div>
                <h3>payload</h3>
                {payloadInfoTable}
            </div>
        );
    }

    renderKeyValeTable(keyValueObject: Object) {
        let rows: JSX.Element[] = [];
        for (let key in keyValueObject) {
            let row: JSX.Element = (
                <tr key={key}>
                    <th>{key}</th>
                    <td>{JSON.stringify(keyValueObject[key])}</td>
                </tr>
            );
            rows.push(row);
        }
        return (
            <table>
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
                {headerInfo}
                {payloadInfo}
            </div>
        );
    }
}