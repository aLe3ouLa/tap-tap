import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  /** Visual style. `danger` is for destructive actions; `link` renders as inline text. */
  variant = input<'primary' | 'outline' | 'ghost' | 'link' | 'danger'>('primary');
  /** Native `<button type>`. `submit`/`reset` only matter inside a `<form>`. */
  type = input<'button' | 'submit' | 'reset'>('button');
  /** Height, min-width, and font size preset. */
  size = input<'large' | 'medium' | 'small'>('medium');
  /** Disables interaction and applies the muted disabled styling per variant. */
  disabled = input(false);
  /** Required when `iconOnly` is true, since there's no visible text for assistive tech to read. */
  ariaLabel = input<string | null>(null);
  /** Drops the horizontal padding and forces a square footprint for a single projected icon. */
  iconOnly = input(false);
}
