export default class KeyStorage {

    static getKeys() {
        let keys = JSON.parse(localStorage.getItem('pubKeys'));
        if (!keys || keys.length == 0) {
            return {};
        }
        return keys;
    }

    static get(name: string) {
        if (name == 'default') {
            return ``;
        }
        return this.getKeys()[name];
    }

    static getKeyNames() {
        let keyNames = JSON.parse(localStorage.getItem('pubKeyNames'));
        if (!keyNames || keyNames.length == 0) {
            return ['default'];
        }
        return keyNames;
    }

    static set(name: string, value: string) {
        let keys = this.getKeys();
        let keyNames = this.getKeyNames() as String[];
        if (keyNames.indexOf(name) === -1) {
            keyNames.push(name);
            localStorage.setItem('pubKeyNames', JSON.stringify(keyNames));
        }
        keys[name] = value;
        localStorage.setItem('pubKeys', JSON.stringify(keys));
    }

    static unset(name) {
        let keys = this.getKeys();
        delete keys[name];
        localStorage.setItem('pubKeys', JSON.stringify(keys));

        let keyNames = this.getKeyNames();
        let newKeyNames = keyNames.filter((val) => {
            return val !== name;
        });
        localStorage.setItem('pubKeyNames', JSON.stringify(newKeyNames));
    }
}