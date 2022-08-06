import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersReactiveComponent } from './customers-reactive.component';

describe('CustomersReactiveComponent', () => {
  let component: CustomersReactiveComponent;
  let fixture: ComponentFixture<CustomersReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
