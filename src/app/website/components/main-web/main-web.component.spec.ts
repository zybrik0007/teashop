import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWebComponent } from './main-web.component';

describe('MainWebComponent', () => {
  let component: MainWebComponent;
  let fixture: ComponentFixture<MainWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
