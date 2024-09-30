import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalImagenPage } from './modal-imagen.page';

describe('ModalImagenPage', () => {
  let component: ModalImagenPage;
  let fixture: ComponentFixture<ModalImagenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
