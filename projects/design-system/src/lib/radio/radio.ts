import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ds-radio',
  styleUrl: './radio.css',
  templateUrl: './radio.html',
})
export class Radio {
  checked = model(false);
  disabled = input(false);
  name = input<string | null>(null);
  value = input<string | null>(null);
  ariaLabel = input<string | null>(null);

  onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
