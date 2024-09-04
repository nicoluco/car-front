import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCitasPage } from './lista-citas.page';

describe('ListaCitasPage', () => {
  let component: ListaCitasPage;
  let fixture: ComponentFixture<ListaCitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
