import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Composant6Component } from './composant-6.component';

describe('Composant6Component', () => {
  let component: Composant6Component;
  let fixture: ComponentFixture<Composant6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Composant6Component]
    });
    fixture = TestBed.createComponent(Composant6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
