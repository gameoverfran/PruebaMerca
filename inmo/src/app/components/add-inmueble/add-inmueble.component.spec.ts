import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInmuebleComponent } from './add-inmueble.component';

describe('AddInmuebleComponent', () => {
  let component: AddInmuebleComponent;
  let fixture: ComponentFixture<AddInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInmuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
