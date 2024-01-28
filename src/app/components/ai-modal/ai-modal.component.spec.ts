import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiModalComponent } from './ai-modal.component';

describe('AiModalComponent', () => {
  let component: AiModalComponent;
  let fixture: ComponentFixture<AiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
