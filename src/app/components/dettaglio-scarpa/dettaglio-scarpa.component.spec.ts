import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioScarpaComponent } from './dettaglio-scarpa.component';

describe('DettaglioScarpaComponent', () => {
  let component: DettaglioScarpaComponent;
  let fixture: ComponentFixture<DettaglioScarpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettaglioScarpaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettaglioScarpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
