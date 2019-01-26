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
    _strengthName: string;


    constructor(plain: string) {
        this.plain = plain;
    }

    // Setters

    set plain(newPlain: string) {
        this._plain = newPlain;

        // set password Strength
        this.computePasswordStrength();

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

    get strengthName(): string {
        this._strengthName = Password.strengthNames()[this.strength];
        return this._strengthName;
    }

    static strengthNames(): Array<string> {
        let strNames = [];
        strNames[Strength.VeryBad] = 'Very weak';
        strNames[Strength.Weak] = 'Could be better';
        strNames[Strength.GoodEnough] = 'Good enough';
        strNames[Strength.VeryGood] = 'Very good';
        strNames[Strength.Unbelievable] = 'Unbelievable!';
        return strNames;
    }

    private computePasswordStrength(): void {
        let score = this.getPasswordStrengthScore();
        this._strength = Strength.VeryBad;

        if (score > 50.5) {
            this._strength = Strength.Weak;
        }

        if (score > 95.5) {
            this._strength = Strength.GoodEnough;
        }

        if (score > 145.5) {
            this._strength = Strength.VeryGood;
        }

        if (score > 225.5) {
            this._strength = Strength.Unbelievable;
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
