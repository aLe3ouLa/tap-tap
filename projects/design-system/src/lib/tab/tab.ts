import { Component, input, signal } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  imports: [Icon],
  selector: 'ds-tab',
  styleUrl: './tab.css',
  templateUrl: './tab.html',
})
export class Tab {
  value = input<string | null>(null);
  disabled = input(false);
  /** Shows a × that emits `ds-tab-group`'s `closed` output with this tab's index. */
  closable = input(false);

  /**
   * @internal Set imperatively by the parent ds-tab-group via contentChildren(), since
   * projected content can't receive template input bindings. See the note in
   * breadcrumb-item.ts for why this component also needs `display: contents`
   * rather than relying on DOM position. `index` lets the group's single
   * delegated click listener (see tab-group.ts) identify which tab was hit.
   */
  index = signal(0);
  /** @internal */
  selected = signal(false);
  /** @internal */
  size = signal<'default' | 'small'>('default');
  /** @internal */
  variant = signal<'line' | 'card'>('line');
}
