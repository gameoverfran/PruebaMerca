import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFiltroComponent } from './boolean-filtro.component';

describe('BooleanFiltroComponent', () => {
  let component: BooleanFiltroComponent;
  let fixture: ComponentFixture<BooleanFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
