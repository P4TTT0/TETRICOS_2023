import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncuestaPage } from './encuesta.page';

describe('EncuestaPage', () => {
  let component: EncuestaPage;
  let fixture: ComponentFixture<EncuestaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
