import { Component, input, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-breadcrumb-item',
  styleUrl: './breadcrumb-item.css',
  templateUrl: './breadcrumb-item.html',
})
export class BreadcrumbItem {
  href = input<string | null>(null);

  // Set imperatively by the parent ds-breadcrumb via contentChildren(),
  // since projected content can't receive template input bindings.
  // (Also: :host has `display: contents`, which flattens the box tree but
  // not the DOM tree, so this item's <li> can't rely on :first-child /
  // :not(:first-child) — its real DOM parent is this component's own host,
  // where it's always the sole child.)
  hidden = signal(false);
  collapsedBefore = signal(false);
  showSeparator = signal(false);
}
