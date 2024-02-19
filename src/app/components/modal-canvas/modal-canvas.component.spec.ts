import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCanvasComponent } from './modal-canvas.component';

describe('ModalCanvasComponent', () => {
  let component: ModalCanvasComponent;
  let fixture: ComponentFixture<ModalCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
