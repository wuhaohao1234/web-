import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoovComponent } from './moov.component';

describe('MoovComponent', () => {
  let component: MoovComponent;
  let fixture: ComponentFixture<MoovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
