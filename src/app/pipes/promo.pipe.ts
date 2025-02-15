import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promo',
  standalone: true,
})
export class PromoPipe implements PipeTransform {
  transform(price: string | null): string {
    if (!price) return '';

    const numericPrice = parseFloat(
      price.replace(/[^0-9.,]/g, '').replace(',', '.')
    );

    if (numericPrice < 20) {
      return `${price} <span class="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm block">Promotion</span>`;
    }
    return price;
  }
}