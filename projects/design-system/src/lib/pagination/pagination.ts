import { Component, computed, input, model } from '@angular/core';
import { Icon } from '../icon/icon';

export type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis';

let nextId = 0;

@Component({
  imports: [Icon],
  selector: 'ds-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination {
  // Gives the "Go to" <label> something unique to point `for` at, since a
  // page can render more than one ds-pagination instance.
  protected readonly jumperId = `ds-pagination-jumper-${nextId++}`;

  total = input.required<number>();
  page = model(1);
  pageSize = model(10);
  pageSizeOptions = input<number[]>([10, 20, 50, 100]);
  simple = input(false);
  showTotal = input(false);
  showSizeChanger = input(false);
  showQuickJumper = input(false);
  siblingCount = input(2);
  boundaryCount = input(1);
  disabled = input(false);
  ariaLabel = input('Pagination');

  pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  rangeLabel = computed(() => {
    const total = this.total();
    if (total === 0) return '0-0 of 0 items';
    const start = (this.page() - 1) * this.pageSize() + 1;
    const end = Math.min(this.page() * this.pageSize(), total);
    return `${start}-${end} of ${total} items`;
  });

  // Standard "boundary + siblings, collapse the rest into ellipses" layout:
  // e.g. boundaryCount 1 / siblingCount 2 around page 7 of 50 → 1 … 5 6 7 8 9 … 50.
  pageItems = computed<PaginationItem[]>(() => {
    const pageCount = this.pageCount();
    const current = Math.min(Math.max(this.page(), 1), pageCount);
    const boundary = this.boundaryCount();
    const sibling = this.siblingCount();

    if (pageCount <= boundary * 2 + sibling * 2 + 3) {
      return range(1, pageCount);
    }

    const startPages = range(1, boundary);
    const endPages = range(pageCount - boundary + 1, pageCount);

    const siblingsStart = Math.max(
      Math.min(current - sibling, pageCount - boundary - sibling * 2 - 1),
      boundary + 2,
    );
    const siblingsEnd = Math.min(
      Math.max(current + sibling, boundary + sibling * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
    );

    const items: PaginationItem[] = [...startPages];
    items.push(siblingsStart > boundary + 2 ? 'start-ellipsis' : boundary + 1);
    items.push(...range(siblingsStart, siblingsEnd));
    items.push(siblingsEnd < pageCount - boundary - 1 ? 'end-ellipsis' : pageCount - boundary);
    items.push(...endPages);

    return items;
  });

  setPage(page: number): void {
    if (this.disabled()) return;
    this.page.set(Math.min(Math.max(page, 1), this.pageCount()));
  }

  prev(): void {
    this.setPage(this.page() - 1);
  }

  next(): void {
    this.setPage(this.page() + 1);
  }

  // Clicking an ellipsis jumps a full sibling window at once, e.g. 5 pages
  // with the default siblingCount of 2 (2 * 2 + 1).
  quickJump(direction: -1 | 1): void {
    this.setPage(this.page() + direction * (this.siblingCount() * 2 + 1));
  }

  onSimpleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (Number.isFinite(value) && value > 0) {
      this.setPage(value);
    }
    target.value = String(this.page());
  }

  onJumperKeydown(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (Number.isFinite(value) && value > 0) {
      this.setPage(value);
    }
    target.value = '';
  }

  onPageSizeChange(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    const firstItemIndex = (this.page() - 1) * this.pageSize();
    this.pageSize.set(newSize);
    this.page.set(Math.floor(firstItemIndex / newSize) + 1);
  }
}

function range(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
