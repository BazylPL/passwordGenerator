import {Strength} from './Strength';
import * as md5 from 'js-md5';
import {sha256} from 'js-sha256';
import {sha512} from 'js-sha512';


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

        // regenerate and set hashed values
        this._md5 = md5(this._plain);
        this._sha256 = sha256(this._plain);
        this._sha512 = sha512(this._plain);
    }

    // Getters

    get plain(): string {
        return this._plain;
    }

    get md5(): string {
        return this._md5;
    }

    get sha256(): string {
        return this._sha256;
    }

    get sha512(): string {
        return this._sha512;
    }

    get strength(): Strength {
        return this._strength;
    }

}
