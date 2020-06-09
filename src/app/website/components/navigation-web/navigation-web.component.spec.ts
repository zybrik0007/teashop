import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationWebComponent } from './navigation-web.component';

describe('NavigationWebComponent', () => {
  let component: NavigationWebComponent;
  let fixture: ComponentFixture<NavigationWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
