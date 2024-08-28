import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceceComponent } from './view-servicece.component';

describe('ViewServiceceComponent', () => {
  let component: ViewServiceceComponent;
  let fixture: ComponentFixture<ViewServiceceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServiceceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
