import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWebComponent } from './table-web.component';

describe('TableWebComponent', () => {
  let component: TableWebComponent;
  let fixture: ComponentFixture<TableWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
