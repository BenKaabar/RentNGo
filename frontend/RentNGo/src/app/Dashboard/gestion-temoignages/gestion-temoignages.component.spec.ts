import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemoignagesComponent } from './gestion-temoignages.component';

describe('GestionTemoignagesComponent', () => {
  let component: GestionTemoignagesComponent;
  let fixture: ComponentFixture<GestionTemoignagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTemoignagesComponent]
    });
    fixture = TestBed.createComponent(GestionTemoignagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
