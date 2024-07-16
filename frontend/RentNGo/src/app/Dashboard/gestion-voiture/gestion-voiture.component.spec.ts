import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVoitureComponent } from './gestion-voiture.component';

describe('GestionVoitureComponent', () => {
  let component: GestionVoitureComponent;
  let fixture: ComponentFixture<GestionVoitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionVoitureComponent]
    });
    fixture = TestBed.createComponent(GestionVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
