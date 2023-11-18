import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CateogrysPage } from './cateogrys.page';

describe('CateogrysPage', () => {
  let component: CateogrysPage;
  let fixture: ComponentFixture<CateogrysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CateogrysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
