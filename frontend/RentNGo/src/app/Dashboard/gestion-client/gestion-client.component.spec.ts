import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClientComponent } from './gestion-client.component';

describe('GestionClientComponent', () => {
  let component: GestionClientComponent;
  let fixture: ComponentFixture<GestionClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionClientComponent]
    });
    fixture = TestBed.createComponent(GestionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
