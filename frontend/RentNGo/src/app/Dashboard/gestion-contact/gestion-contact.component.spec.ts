import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContactComponent } from './gestion-contact.component';

describe('GestionContactComponent', () => {
  let component: GestionContactComponent;
  let fixture: ComponentFixture<GestionContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionContactComponent]
    });
    fixture = TestBed.createComponent(GestionContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
