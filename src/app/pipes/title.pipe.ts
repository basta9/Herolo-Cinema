import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'title' })
export class Title implements PipeTransform {
  transform(val: string): any {
    if (!val) return '';
    return val.replace(/[^a-zA-Z0-9\s]/g, '')
  }
}