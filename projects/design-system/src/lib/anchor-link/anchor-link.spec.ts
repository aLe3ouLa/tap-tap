import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnchorLink } from './anchor-link';

describe('AnchorLink', () => {
  let component: AnchorLink;
  let fixture: ComponentFixture<AnchorLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorLink],
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorLink);
    fixture.componentRef.setInput('href', '#title-one');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
