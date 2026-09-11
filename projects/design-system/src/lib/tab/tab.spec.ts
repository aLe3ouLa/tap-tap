import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tab } from './tab';

describe('Tab', () => {
  let fixture: ComponentFixture<Tab>;
  let component: Tab;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes its index for the parent group to stamp onto the button', async () => {
    component.index.set(3);
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.debugElement.query(By.css('.ds-tab__button'));
    expect(button.attributes['data-tab-index']).toBe('3');
  });

  it('renders a close button only when closable is set', async () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('.ds-tab__close'))).toBeTruthy();
  });

  it('reflects the selected signal as aria-selected', async () => {
    component.selected.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.debugElement.query(By.css('.ds-tab__button'));
    expect(button.attributes['aria-selected']).toBe('true');
  });
});
