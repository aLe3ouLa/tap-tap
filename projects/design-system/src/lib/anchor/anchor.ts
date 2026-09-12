import { Component, contentChildren, effect, input, signal } from '@angular/core';
import { AnchorLink } from '../anchor-link/anchor-link';

@Component({
  imports: [],
  selector: 'ds-anchor',
  styleUrl: './anchor.css',
  templateUrl: './anchor.html',
})
export class Anchor {
  /** Accessible name for the nav landmark wrapping the projected `ds-anchor-link` items. */
  ariaLabel = input('Anchor');

  private readonly items = contentChildren(AnchorLink, { descendants: true });
  private readonly activeHref = signal<string | null>(null);

  constructor() {
    effect(() => {
      const items = this.items();
      // Nothing has been clicked yet: the first link stands in for the
      // current location, matching how a page's top section is active on load.
      const active = this.activeHref() ?? items[0]?.href() ?? null;
      items.forEach((item) => item.active.set(item.href() === active));
    });
  }

  /** @internal Template `(click)` handler; not meant to be called directly. */
  onLinkClick(event: MouseEvent): void {
    const link = (event.target as HTMLElement).closest('a[href]');
    const href = link?.getAttribute('href');
    if (!href || !href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    this.activeHref.set(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
