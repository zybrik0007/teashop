import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWebComponent } from './footer-web.component';

describe('FooterWebComponent', () => {
  let component: FooterWebComponent;
  let fixture: ComponentFixture<FooterWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
