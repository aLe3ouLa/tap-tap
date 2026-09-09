import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbItem } from './breadcrumb-item';

describe('BreadcrumbItem', () => {
  let component: BreadcrumbItem;
  let fixture: ComponentFixture<BreadcrumbItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
