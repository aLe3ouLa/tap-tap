import { Component, input, model } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  imports: [Icon],
  selector: 'ds-checkbox',
  styleUrl: './checkbox.css',
  templateUrl: './checkbox.html',
})
/** Checkbox is used for selecting multiple values from several options. */
export class Checkbox {
  /** Whether the checkbox is checked. Supports two-way binding via `[(checked)]`. */
  checked = model(false);
  /** Shows the mixed/indeterminate mark instead of the check, regardless of `checked`. */
  indeterminate = input(false);
  /** Disables interaction and applies the muted disabled styling. */
  disabled = input(false);
  /** Forwarded to the native `<input>`, so it's submitted with the enclosing `<form>`. */
  name = input<string | null>(null);
  /** Forwarded to the native `<input>`'s `value` attribute. */
  value = input<string | null>(null);
  /** Accessible name for when no label is projected. */
  ariaLabel = input<string | null>(null);

  /** @internal Template `(change)` handler; not meant to be called directly. */
  onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
