import { Component, input } from '@angular/core';
import { ICON_NAMES } from './icon-names';

@Component({
  imports: [],
  selector: 'ds-icon',
  styleUrl: './icon.css',
  templateUrl: './icon.html',
})
export class Icon {
  /** Sprite symbol id, generated from the SVG filenames in `src/lib/icons`. */
  name = input.required<(typeof ICON_NAMES)[number]>();
}
