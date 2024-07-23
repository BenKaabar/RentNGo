import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Composant5Component } from './composant5.component';

describe('Composant5Component', () => {
  let component: Composant5Component;
  let fixture: ComponentFixture<Composant5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Composant5Component]
    });
    fixture = TestBed.createComponent(Composant5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
