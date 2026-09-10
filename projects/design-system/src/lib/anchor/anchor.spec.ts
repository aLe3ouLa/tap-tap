import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Anchor } from './anchor';
import { AnchorLink } from '../anchor-link/anchor-link';

@Component({
  imports: [Anchor, AnchorLink],
  template: `
    <ds-anchor>
      <ds-anchor-link href="#title-one">Title One</ds-anchor-link>
      <ds-anchor-link href="#title-two">Title Two</ds-anchor-link>
      <ds-anchor-link href="#long-title">
        Long Title
        <ds-anchor-link href="#subtitle-one">Subtitle One</ds-anchor-link>
        <ds-anchor-link href="#subtitle-two">Subtitle Two</ds-anchor-link>
      </ds-anchor-link>
    </ds-anchor>
  `,
})
class HostComponent {}

describe('Anchor', () => {
  let component: Anchor;
  let fixture: ComponentFixture<Anchor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anchor],
    }).compileComponents();

    fixture = TestBed.createComponent(Anchor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults the first link to active, including nested links', async () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    await hostFixture.whenStable();

    const links = hostFixture.debugElement
      .queryAll(By.directive(AnchorLink))
      .map((link) => link.componentInstance as AnchorLink);

    expect(links.map((link) => link.active())).toEqual([true, false, false, false, false]);
  });

  it('activates the clicked link and deactivates the rest', async () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    await hostFixture.whenStable();

    const link = hostFixture.debugElement.query(By.css('a[href="#subtitle-one"]'))
      .nativeElement as HTMLAnchorElement;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const links = hostFixture.debugElement
      .queryAll(By.directive(AnchorLink))
      .map((link) => link.componentInstance as AnchorLink);

    expect(links.map((link) => [link.href(), link.active()])).toEqual([
      ['#title-one', false],
      ['#title-two', false],
      ['#long-title', false],
      ['#subtitle-one', true],
      ['#subtitle-two', false],
    ]);
  });
});
