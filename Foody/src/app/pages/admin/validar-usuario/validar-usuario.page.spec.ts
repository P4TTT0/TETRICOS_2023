import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarUsuarioPage } from './validar-usuario.page';

describe('ValidarUsuarioPage', () => {
  let component: ValidarUsuarioPage;
  let fixture: ComponentFixture<ValidarUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
