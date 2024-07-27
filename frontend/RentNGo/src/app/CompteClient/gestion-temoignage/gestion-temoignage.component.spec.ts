import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemoignageComponent } from './gestion-temoignage.component';

describe('GestionTemoignageComponent', () => {
  let component: GestionTemoignageComponent;
  let fixture: ComponentFixture<GestionTemoignageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTemoignageComponent]
    });
    fixture = TestBed.createComponent(GestionTemoignageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
