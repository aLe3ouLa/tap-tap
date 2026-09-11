import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TabGroup } from './tab-group';
import { Tab } from '../tab/tab';

@Component({
  imports: [TabGroup, Tab],
  template: `
    <ds-tab-group [(selectedIndex)]="selectedIndex" (closed)="onClosed($event)">
      <ds-tab>One</ds-tab>
      <ds-tab>Two</ds-tab>
      <ds-tab [disabled]="true">Three</ds-tab>
      <ds-tab [closable]="true">Four</ds-tab>
    </ds-tab-group>
  `,
})
class HostComponent {
  selectedIndex = 0;
  closedIndex: number | null = null;

  onClosed(index: number): void {
    this.closedIndex = index;
  }
}

describe('TabGroup', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('marks the tab at selectedIndex as selected', () => {
    const tabs = fixture.debugElement.queryAll(By.directive(Tab)).map((d) => d.componentInstance as Tab);
    expect(tabs.map((tab) => tab.selected())).toEqual([true, false, false, false]);
  });

  it('selects a tab when its button is clicked', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.ds-tab__button'));
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.selectedIndex).toBe(1);
  });

  it('does not select a disabled tab', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.ds-tab__button'));
    buttons[2].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.selectedIndex).toBe(0);
  });

  it('emits closed with the tab index when its close button is clicked, without selecting it', async () => {
    const closeButton = fixture.debugElement.query(By.css('.ds-tab__close'));
    closeButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.closedIndex).toBe(3);
    expect(host.selectedIndex).toBe(0);
  });
});
