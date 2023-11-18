import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaPage } from './mesa.page';

describe('MesaPage', () => {
  let component: MesaPage;
  let fixture: ComponentFixture<MesaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
