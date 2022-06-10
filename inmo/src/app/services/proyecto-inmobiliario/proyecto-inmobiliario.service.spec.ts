import { TestBed } from '@angular/core/testing';

import { ProyectoInmobiliarioService } from './proyecto-inmobiliario.service';

describe('ProyectoInmobiliarioService', () => {
  let service: ProyectoInmobiliarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoInmobiliarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
