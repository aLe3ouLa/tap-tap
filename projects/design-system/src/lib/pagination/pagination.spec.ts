import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let component: Pagination;
  let fixture: ComponentFixture<Pagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('total', 500);
    fixture.componentRef.setInput('page', 7);
    fixture.componentRef.setInput('pageSize', 10);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('computes the page count from total and pageSize', () => {
    expect(component.pageCount()).toBe(50);
  });

  it('collapses distant pages into ellipses around the current page', () => {
    expect(component.pageItems()).toEqual([1, 'start-ellipsis', 5, 6, 7, 8, 9, 'end-ellipsis', 50]);
  });

  it('lists every page when the total fits within the sibling/boundary window', async () => {
    fixture.componentRef.setInput('total', 50);
    fixture.componentRef.setInput('page', 3);
    await fixture.whenStable();

    expect(component.pageItems()).toEqual([1, 2, 3, 4, 5]);
  });

  it('marks the current page as selected', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const selected = fixture.debugElement.query(By.css('.ds-pagination__item--selected'));
    expect(selected.nativeElement.textContent.trim()).toBe('7');
  });

  it('navigates with next() and prev()', () => {
    component.next();
    expect(component.page()).toBe(8);

    component.prev();
    component.prev();
    expect(component.page()).toBe(6);
  });

  it('clamps setPage() to the valid page range', () => {
    component.setPage(0);
    expect(component.page()).toBe(1);

    component.setPage(999);
    expect(component.page()).toBe(50);
  });

  it('jumps by a sibling window when quickJump() is called', () => {
    component.quickJump(1);
    expect(component.page()).toBe(12);

    component.quickJump(-1);
    expect(component.page()).toBe(7);
  });

  it('disables prev/next at the first and last page', async () => {
    fixture.componentRef.setInput('total', 30);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    await fixture.whenStable();

    const prev = fixture.debugElement.query(By.css('.ds-pagination__nav[aria-label="Previous page"]'));
    expect(prev.nativeElement.disabled).toBe(true);

    fixture.componentRef.setInput('page', 3);
    fixture.detectChanges();
    await fixture.whenStable();

    const next = fixture.debugElement.query(By.css('.ds-pagination__nav[aria-label="Next page"]'));
    expect(next.nativeElement.disabled).toBe(true);
  });

  it('does not change page when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    component.next();
    expect(component.page()).toBe(7);
  });

  it('recomputes the current page to preserve position when page size changes', () => {
    component.onPageSizeChange({ target: { value: '20' } } as unknown as Event);
    expect(component.pageSize()).toBe(20);
    expect(component.page()).toBe(4);
  });

  it('gives the page-size select an accessible name', async () => {
    fixture.componentRef.setInput('showSizeChanger', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const select = fixture.debugElement.query(By.css('.ds-pagination__size-select'));
    expect(select.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('associates the "Go to" label with the quick jumper input', async () => {
    fixture.componentRef.setInput('showQuickJumper', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const label = fixture.debugElement.query(By.css('.ds-pagination__jumper label'));
    const input = fixture.debugElement.query(By.css('.ds-pagination__jumper-input'));
    expect(label.nativeElement.getAttribute('for')).toBe(input.nativeElement.id);
    expect(input.nativeElement.id).toBeTruthy();
  });

  it('gives the simple-mode page input an accessible name', async () => {
    fixture.componentRef.setInput('simple', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.css('.ds-pagination__simple-input'));
    expect(input.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });
});
