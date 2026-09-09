import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  variant = input<'primary' | 'outline' | 'ghost' | 'link'>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  size = input<'large' | 'medium' | 'small'>('medium');
  disabled = input(false);
  ariaLabel = input<string | null>(null);
}
