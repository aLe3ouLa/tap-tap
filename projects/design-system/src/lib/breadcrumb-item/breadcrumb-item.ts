import { Component, input, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ds-breadcrumb-item',
  styleUrl: './breadcrumb-item.css',
  templateUrl: './breadcrumb-item.html',
  host: {
    class: 'ds-breadcrumb-item',
    role: 'listitem',
    '[hidden]': 'hidden()',
  },
})
export class BreadcrumbItem {
  href = input<string | null>(null);

  hidden = signal(false);
  collapsedBefore = signal(false);
  showSeparator = signal(false);
}
