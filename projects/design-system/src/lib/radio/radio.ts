import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ds-radio',
  styleUrl: './radio.css',
  templateUrl: './radio.html',
})
export class Radio {
  /** Whether this radio is selected. Supports two-way binding via `[(checked)]`. */
  checked = model(false);
  /** Disables interaction and applies the muted disabled styling. */
  disabled = input(false);
  /** Groups this radio with every other `ds-radio` sharing the same `name` for native mutual exclusivity. */
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
