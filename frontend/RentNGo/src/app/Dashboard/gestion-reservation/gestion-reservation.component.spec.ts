import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservationComponent } from './gestion-reservation.component';

describe('GestionReservationComponent', () => {
  let component: GestionReservationComponent;
  let fixture: ComponentFixture<GestionReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionReservationComponent]
    });
    fixture = TestBed.createComponent(GestionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
