import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateMailPage } from './validate-mail.page';

describe('ValidateMailPage', () => {
  let component: ValidateMailPage;
  let fixture: ComponentFixture<ValidateMailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidateMailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
