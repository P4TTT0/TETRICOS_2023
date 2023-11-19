import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiPedidoPage } from './mi-pedido.page';

describe('MiPedidoPage', () => {
  let component: MiPedidoPage;
  let fixture: ComponentFixture<MiPedidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
