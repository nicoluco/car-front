import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroMantencionPage } from './registro-mantencion.page';

describe('RegistroMantencionPage', () => {
  let component: RegistroMantencionPage;
  let fixture: ComponentFixture<RegistroMantencionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMantencionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
