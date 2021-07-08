import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText'
})
export class ReplaceTextPipe implements PipeTransform {

  transform(value: string, original: string, replace: string): unknown {
    if (!value) {
      return '';
    }
    // @ts-ignore
    return value.replaceAll(original, replace);
  }
}
