import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaProductoPage } from './alta-producto.page';

describe('AltaProductoPage', () => {
  let component: AltaProductoPage;
  let fixture: ComponentFixture<AltaProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AltaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
