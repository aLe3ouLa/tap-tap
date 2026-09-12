import { Component, input, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-anchor-link',
  styleUrl: './anchor-link.css',
  templateUrl: './anchor-link.html',
})
export class AnchorLink {
  /** Target section id, e.g. `#overview`. Clicking scrolls to it and marks this link active. */
  href = input.required<string>();

  /**
   * @internal Set imperatively by the parent ds-anchor via contentChildren(), since
   * projected content can't receive template input bindings. See the note
   * in breadcrumb-item.ts for why this component also needs `display:
   * contents` rather than relying on DOM position.
   */
  active = signal(false);
}
