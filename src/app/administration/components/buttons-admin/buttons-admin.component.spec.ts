import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsAdminComponent } from './buttons-admin.component';

describe('ButtonsAdminComponent', () => {
  let component: ButtonsAdminComponent;
  let fixture: ComponentFixture<ButtonsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
