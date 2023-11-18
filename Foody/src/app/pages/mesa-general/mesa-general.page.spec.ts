import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaGeneralPage } from './mesa-general.page';

describe('MesaGeneralPage', () => {
  let component: MesaGeneralPage;
  let fixture: ComponentFixture<MesaGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesaGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
