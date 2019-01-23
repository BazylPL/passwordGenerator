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

        // set password Strength
        this.computePasswordStrength();
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

    private computePasswordStrength(): void {
        let score = this.getPasswordStrengthScore();

        this._strength = Strength.Poor;

        if (score > 30) {
            this._strength = Strength.Sufficient;
        }

        if (score > 60) {
            this._strength = Strength.Good;
        }

        if (score > 100) {
            this._strength = Strength.Great;
        }

        if (score > 160) {
            this._strength = Strength.TheBest;
        }
    }

    private getPasswordStrengthScore(): number {
        let score: number = 0;

        // award every unique letter until 5 repetitions
        let letters = [];
        for (let i = 0; i < this._plain.length; i++) {
            letters[this._plain[i]] = (letters[this._plain[i]] || 0) + 1;
            score += 5.0 / letters[this._plain[i]];
        }

        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(this._plain),
            lower: /[a-z]/.test(this._plain),
            upper: /[A-Z]/.test(this._plain),
            nonWords: /\W/.test(this._plain)
        };

        let variationCount = 0;
        for (const check of Object.keys(variations)) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }

        score += (variationCount - 1) * 10;

        return score;
    }

}
