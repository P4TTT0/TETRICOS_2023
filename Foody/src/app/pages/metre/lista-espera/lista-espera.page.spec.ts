import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEsperaPage } from './lista-espera.page';

describe('ListaEsperaPage', () => {
  let component: ListaEsperaPage;
  let fixture: ComponentFixture<ListaEsperaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaEsperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
