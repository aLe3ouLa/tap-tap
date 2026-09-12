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
  /**
   * @internal Gives the "Go to" <label> something unique to point `for` at, since a
   * page can render more than one ds-pagination instance.
   */
  protected readonly jumperId = `ds-pagination-jumper-${nextId++}`;

  /** Total number of items being paginated (not the number of pages). */
  total = input.required<number>();
  /** Current 1-indexed page. Supports two-way binding via `[(page)]`. */
  page = model(1);
  /** Items per page. Supports two-way binding via `[(pageSize)]`. */
  pageSize = model(10);
  /** Choices shown in the page-size `<select>` when `showSizeChanger` is true. */
  pageSizeOptions = input<number[]>([10, 20, 50, 100]);
  /** Renders just prev/next and the current page, dropping numbered page buttons. */
  simple = input(false);
  /** Shows the "x-y of z items" range label. */
  showTotal = input(false);
  /** Shows the page-size `<select>`. */
  showSizeChanger = input(false);
  /** Shows the "Go to" page-number jumper input. */
  showQuickJumper = input(false);
  /** Pages shown on each side of the current page before collapsing into an ellipsis. */
  siblingCount = input(2);
  /** Pages always shown at the start and end, regardless of the current page. */
  boundaryCount = input(1);
  /** Disables all page/prev/next/jumper controls. */
  disabled = input(false);
  /** Accessible name for the pagination nav landmark. */
  ariaLabel = input('Pagination');

  /** Total number of pages, derived from `total` and `pageSize`. */
  pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  /** The "x-y of z items" text shown when `showTotal` is true. */
  rangeLabel = computed(() => {
    const total = this.total();
    if (total === 0) return '0-0 of 0 items';
    const start = (this.page() - 1) * this.pageSize() + 1;
    const end = Math.min(this.page() * this.pageSize(), total);
    return `${start}-${end} of ${total} items`;
  });

  /**
   * The page buttons to render, with ellipses collapsed in per `siblingCount`/`boundaryCount`.
   * E.g. boundaryCount 1 / siblingCount 2 around page 7 of 50 → 1 … 5 6 7 8 9 … 50.
   */
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

  /** Clamps to `[1, pageCount]` and sets `page`. Safe to call with out-of-range values. */
  setPage(page: number): void {
    if (this.disabled()) return;
    this.page.set(Math.min(Math.max(page, 1), this.pageCount()));
  }

  /** Moves to the previous page. No-ops on page 1. */
  prev(): void {
    this.setPage(this.page() - 1);
  }

  /** Moves to the next page. No-ops on the last page. */
  next(): void {
    this.setPage(this.page() + 1);
  }

  /**
   * @internal Template ellipsis-click handler. Jumps a full sibling window at
   * once, e.g. 5 pages with the default siblingCount of 2 (2 * 2 + 1).
   */
  quickJump(direction: -1 | 1): void {
    this.setPage(this.page() + direction * (this.siblingCount() * 2 + 1));
  }

  /** @internal Template `(change)` handler for the simple-mode page input. */
  onSimpleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (Number.isFinite(value) && value > 0) {
      this.setPage(value);
    }
    target.value = String(this.page());
  }

  /** @internal Template `(keydown.enter)` handler for the "Go to" jumper input. */
  onJumperKeydown(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (Number.isFinite(value) && value > 0) {
      this.setPage(value);
    }
    target.value = '';
  }

  /** @internal Template `(change)` handler for the page-size `<select>`. */
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
