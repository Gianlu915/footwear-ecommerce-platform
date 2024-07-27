import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipaleComponent } from './pagina-principale.component';

describe('PaginaPrincipaleComponent', () => {
  let component: PaginaPrincipaleComponent;
  let fixture: ComponentFixture<PaginaPrincipaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaPrincipaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
