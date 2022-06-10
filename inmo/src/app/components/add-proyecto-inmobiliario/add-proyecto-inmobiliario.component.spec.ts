import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProyectoInmobiliarioComponent } from './add-proyecto-inmobiliario.component';

describe('AddProyectoInmobiliarioComponent', () => {
  let component: AddProyectoInmobiliarioComponent;
  let fixture: ComponentFixture<AddProyectoInmobiliarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProyectoInmobiliarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProyectoInmobiliarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
