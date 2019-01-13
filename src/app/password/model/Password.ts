import {Strength} from './Strength';

export class Password {
    _plain: string;
    _md5: string;
    _sha256: string;
    _sha512: string;
    _strength: Strength;

    constructor(plain: string) {
        this.plain = plain;
    }

    // Setters

    set plain(newPlain: string) {
        this._plain = newPlain;
    }

    // Getters

    get plain(): string {
        return this._plain;
    }

    get md5(): string {
        return this._md5; // use MD5 function here?
    }

    get sha256(): string {
        return this._sha256; // use sha256 function here?
    }

    get sha512(): string {
        return this._sha512; // use sha512 function here?
    }

    get strength(): Strength {
        return this._strength;
    }

}
