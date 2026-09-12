import { Component, input, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-breadcrumb-item',
  styleUrl: './breadcrumb-item.css',
  templateUrl: './breadcrumb-item.html',
  host: {
    class: 'ds-breadcrumb-item',
    role: 'listitem',
    '[hidden]': 'hidden()',
  },
})
export class BreadcrumbItem {
  /** Renders the item as a link when set; otherwise as plain text (e.g. the current page). */
  href = input<string | null>(null);

  /** @internal Set imperatively by the parent ds-breadcrumb via contentChildren(). */
  hidden = signal(false);
  /** @internal */
  collapsedBefore = signal(false);
  /** @internal */
  showSeparator = signal(false);
}
