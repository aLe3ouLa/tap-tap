import { Component, contentChildren, effect, input, model, output } from '@angular/core';
import { Tab } from '../tab/tab';

@Component({
  imports: [],
  selector: 'ds-tab-group',
  styleUrl: './tab-group.css',
  templateUrl: './tab-group.html',
})
export class TabGroup {
  /** `line` underlines the selected tab; `card` renders tabs as bordered chips. */
  variant = input<'line' | 'card'>('line');
  /** Controls the height and font size of every projected `ds-tab`. */
  size = input<'default' | 'small'>('default');
  /** Horizontal alignment of the tablist. */
  align = input<'left' | 'center'>('left');
  /** Shows a border under the whole tablist, separating it from the panel below. */
  bordered = input(true);
  /** Accessible name for the tablist landmark. */
  ariaLabel = input('Tabs');

  /** Index of the selected `ds-tab`. Supports two-way binding via `[(selectedIndex)]`. */
  selectedIndex = model(0);
  /** Emits the index of a closable tab when its × is clicked; this component doesn't remove it. */
  closed = output<number>();

  private readonly items = contentChildren(Tab);

  constructor() {
    effect(() => {
      const items = this.items();
      const size = this.size();
      const variant = this.variant();
      const selected = this.selectedIndex();

      items.forEach((item, index) => {
        item.index.set(index);
        item.size.set(size);
        item.variant.set(variant);
        item.selected.set(index === selected);
      });
    });
  }

  /**
   * @internal A single delegated listener on the tablist, rather than an output on
   * every projected ds-tab: matches the click-delegation pattern in
   * ds-anchor, and lets a plain data-tab-index/data-tab-close attribute
   * (stamped on each tab by the effect above) identify the target.
   */
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const closeTarget = target.closest<HTMLElement>('[data-tab-close]');
    if (closeTarget) {
      const index = Number(closeTarget.dataset['tabClose']);
      if (!this.items()[index]?.disabled()) {
        this.closed.emit(index);
      }
      return;
    }

    const tabTarget = target.closest<HTMLElement>('[data-tab-index]');
    if (tabTarget) {
      const index = Number(tabTarget.dataset['tabIndex']);
      if (!this.items()[index]?.disabled()) {
        this.selectedIndex.set(index);
      }
    }
  }
}
