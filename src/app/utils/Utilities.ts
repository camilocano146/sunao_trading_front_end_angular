import * as CryptoJS from 'crypto-js';
import {ConstantsApp} from "./ConstantsApp";

export class Utilities {
  static key = CryptoJS.enc.Utf8.parse('((23((!#48//4))/'); // TODO change to something with more entropy
  static generateNumbers = (length) => Array.from({length}, (_, i) => i);

  static listAux: Array<number> = [
    3,
    7,
    13,
    17,
    19,
    23,
    29,
    37,
    41,
    43,
    47,
    53,
    59,
    67,
    71
  ];

  static getDigitVerification(nit: number): number {
    if (nit) {
      const nitText = nit.toString();
      const nuevo = nitText.split('');
      const reverseArray = nuevo.reverse();
      const joinArray = reverseArray.join('');
      let sum = 0;
      this.listAux.forEach((element, pos) => {
        if (pos < nitText.length) {
          sum += element * parseInt(joinArray.charAt(pos));
        }
      });
      const mod = sum % 11;
      if (mod === 0) {
        return 0;
      }
      if (mod === 1) {
        return 1;
      }
      if (mod > 1) {
        return 11 - mod;
      }
    } else {
      return NaN;
    }
  }

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

  static arrayIncludesArray(arraySource: any[], arrayFrom: any[]): boolean {
    for (const element of arrayFrom) {
      if (!arraySource.includes(element)) {
        return false;
      }
    }
    return true;
  }

  static sumArray(listSelectedItems: number[]): number {
    try {
      return listSelectedItems.reduce((a, b) => a + b);
    } catch (e) {
      return 0;
    }
  }

  static isWrongDatesReports(dateStringOne, dateStringTwo, Swal): boolean {
    if (dateStringOne && dateStringTwo) {
      const dateSince = new Date(dateStringOne);
      const dateUntil = new Date(dateStringTwo);
      if (dateUntil.getTime() < dateSince.getTime()) {
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#106690',
          text: 'La fecha final debe ser menor a la fecha inicio'
        });
        return true;
      }
      if ((dateUntil.getTime() - dateSince.getTime()) > ConstantsApp.maxTimeExportReportsInMillis) {
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#106690',
          text: 'La máxima diferencia de tiempo permitido entre ambas fechas es de 6 Meses'
        });
        return true;
      }
    }
    return false;
  }
}
