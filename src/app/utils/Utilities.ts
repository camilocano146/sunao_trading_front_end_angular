import * as CryptoJS from 'crypto-js';

export class Utilities {

  static convertKgToLib(value: number): number {
    return +((value * 2.20462).toFixed(1));
  }

  static validateOnlyNumberPress(event: KeyboardEvent): void {
    if (!event.code.toUpperCase().startsWith('DIGIT') && !event.code.toUpperCase().startsWith('PERIOD')) {
      event.preventDefault();
    }
  }

  static encrypt(body): any {
    return {e: CryptoJS.AES.encrypt(JSON.stringify(body), atob('aXVhbnhuZHNqbG1zYSgpMDk4Mnhhcw==')).toString()};
  }

  static decrypt(body): any {
    const bytes = CryptoJS.AES.decrypt(body.e, atob('c2VjazUyNjcxODkzNzk='));
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
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
