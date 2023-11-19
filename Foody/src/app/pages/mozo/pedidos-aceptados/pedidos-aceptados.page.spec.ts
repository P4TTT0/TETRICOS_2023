import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosAceptadosPage } from './pedidos-aceptados.page';

describe('PedidosAceptadosPage', () => {
  let component: PedidosAceptadosPage;
  let fixture: ComponentFixture<PedidosAceptadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosAceptadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
