import { Component, contentChildren, effect, input } from '@angular/core';
import { BreadcrumbItem } from '../breadcrumb-item/breadcrumb-item';

@Component({
  imports: [],
  selector: 'ds-breadcrumb',
  styleUrl: './breadcrumb.css',
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  ariaLabel = input('Breadcrumb');
  // When set and there are more projected ds-breadcrumb-item than this,
  // every item but the first and last collapses into a static '···'.
  maxItems = input<number | null>(null);

  private readonly items = contentChildren(BreadcrumbItem);

  constructor() {
    effect(() => {
      const items = this.items();
      const max = this.maxItems();
      const collapse = max !== null && items.length > max && items.length > 2;

      items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        item.hidden.set(collapse && index > 0 && !isLast);
        item.collapsedBefore.set(collapse && isLast);
        item.showSeparator.set(index > 0);
      });
    });
  }
}
