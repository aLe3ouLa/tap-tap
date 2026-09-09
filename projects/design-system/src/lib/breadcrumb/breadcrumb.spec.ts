import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbItem } from '../breadcrumb-item/breadcrumb-item';
import { Component } from '@angular/core';

@Component({
  imports: [Breadcrumb, BreadcrumbItem],
  template: `
    <ds-breadcrumb [maxItems]="maxItems">
      <ds-breadcrumb-item href="/">Homepage</ds-breadcrumb-item>
      <ds-breadcrumb-item href="/target">Target</ds-breadcrumb-item>
      <ds-breadcrumb-item href="/tag">Tag</ds-breadcrumb-item>
      <ds-breadcrumb-item>Authority</ds-breadcrumb-item>
    </ds-breadcrumb>
  `,
})
class HostComponent {
  maxItems: number | null = null;
}

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not collapse items when maxItems is unset', async () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    await hostFixture.whenStable();

    const items = hostFixture.debugElement
      .queryAll(By.directive(BreadcrumbItem))
      .map((item) => item.componentInstance as BreadcrumbItem);

    expect(items.every((item) => !item.hidden())).toBe(true);
    expect(items.map((item) => item.showSeparator())).toEqual([false, true, true, true]);
  });

  it('collapses the middle items into a single boundary marker when over maxItems', async () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.componentInstance.maxItems = 2;
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const items = hostFixture.debugElement
      .queryAll(By.directive(BreadcrumbItem))
      .map((item) => item.componentInstance as BreadcrumbItem);

    expect(items.map((item) => item.hidden())).toEqual([false, true, true, false]);
    expect(items.map((item) => item.collapsedBefore())).toEqual([false, false, false, true]);
  });
});
