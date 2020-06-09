import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationAdminComponent } from './authorization-admin.component';

describe('AuthorizationAdminComponent', () => {
  let component: AuthorizationAdminComponent;
  let fixture: ComponentFixture<AuthorizationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
