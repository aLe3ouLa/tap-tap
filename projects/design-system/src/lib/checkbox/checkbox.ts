import { Component, input, model } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  imports: [Icon],
  selector: 'ds-checkbox',
  styleUrl: './checkbox.css',
  templateUrl: './checkbox.html',
})
export class Checkbox {
  checked = model(false);
  indeterminate = input(false);
  disabled = input(false);
  name = input<string | null>(null);
  value = input<string | null>(null);
  ariaLabel = input<string | null>(null);

  onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
