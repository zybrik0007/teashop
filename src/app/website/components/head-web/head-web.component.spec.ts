import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadWebComponent } from './head-web.component';

describe('HeadWebComponent', () => {
  let component: HeadWebComponent;
  let fixture: ComponentFixture<HeadWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
