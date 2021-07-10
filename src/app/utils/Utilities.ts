import * as CryptoJS from 'crypto-js';

export class Utilities {
  static key = CryptoJS.enc.Utf8.parse('((23((!#48//4))/'); // TODO change to something with more entropy

  static convertKgToLib(value: number): number {
    return +((value * 2.20462).toFixed(1));
  }

  static validateOnlyNumberPress(event: KeyboardEvent): void {
    if (!event.code.toUpperCase().startsWith('DIGIT') && !event.code.toUpperCase().startsWith('PERIOD')) {
      event.preventDefault();
    }
  }

  // static encrypt(body): any {
  //   return {e: CryptoJS.AES.encrypt(JSON.stringify(body), 'AER').toString()};
  // }
  //
  // static decrypt(body): any {
  //   const bytes = CryptoJS.AES.decrypt(body.e, atob('c2VjazUyNjcxODkzNzk='));
  //   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   return JSON.parse(originalText);
  // }

  static encrypt(msgString: any): any {
    // msgString is expected to be Utf8 encoded
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(msgString), this.key, {
      iv
    });
    return {data: iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)};
  }

  static decrypt(ciphertextStr: any): any {
    const data = ciphertextStr.data;
    const ciphertext = CryptoJS.enc.Base64.parse(data);

    // split IV and ciphertext
    const iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    ciphertext.sigBytes -= 16;

    // decryption
    const decrypted = CryptoJS.AES.decrypt({ciphertext}, this.key, {
      iv
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  static getCommissionBanColombia(value: number): number {
    const commission = value * 0.015 + 500;
    return Math.round(commission + (commission * 0.19));
  }

  static getCommissionCardPseNequi(value: number): number {
    const commission = value * 0.0285 + 800;
    return Math.round(commission + (commission * 0.19));
  }
}
