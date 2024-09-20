import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroCitasPage } from './registro-citas.page';

describe('RegistroCitasPage', () => {
  let component: RegistroCitasPage;
  let fixture: ComponentFixture<RegistroCitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
