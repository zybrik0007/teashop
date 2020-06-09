import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountstrAdminComponent } from './countstr-admin.component';

describe('CountstrAdminComponent', () => {
  let component: CountstrAdminComponent;
  let fixture: ComponentFixture<CountstrAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountstrAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountstrAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
