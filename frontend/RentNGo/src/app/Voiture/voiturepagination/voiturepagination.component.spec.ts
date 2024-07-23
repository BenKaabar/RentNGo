import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiturepaginationComponent } from './voiturepagination.component';

describe('VoiturepaginationComponent', () => {
  let component: VoiturepaginationComponent;
  let fixture: ComponentFixture<VoiturepaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiturepaginationComponent]
    });
    fixture = TestBed.createComponent(VoiturepaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
