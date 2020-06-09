import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetWebComponent } from './cabinet-web.component';

describe('CabinetWebComponent', () => {
  let component: CabinetWebComponent;
  let fixture: ComponentFixture<CabinetWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
