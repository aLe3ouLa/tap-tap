import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-button-group',
  styleUrl: './button-group.css',
  templateUrl: './button-group.html',
  // Angular's emulated encapsulation never matches projected `<ds-button>`
  // content (it keeps the consumer template's scope, not this component's),
  // so the corner/overlap rules below need to be unscoped to apply at all.
  encapsulation: ViewEncapsulation.None,
})
export class ButtonGroup {
  /** Accessible name for the group landmark wrapping the projected `ds-button` items. */
  ariaLabel = input<string | null>(null);
}
