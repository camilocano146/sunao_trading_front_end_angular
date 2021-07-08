
export class Utilities {

  static convertKgToLib(value: number): number {
    return +((value * 2.20462).toFixed(1));
  }

  static validateOnlyNumberPress(event: KeyboardEvent): void {
    if (!event.code.toUpperCase().startsWith('DIGIT') && !event.code.toUpperCase().startsWith('PERIOD')) {
      event.preventDefault();
    }
  }

  showPriceFormat(fobValue: number): void {
  }
}
