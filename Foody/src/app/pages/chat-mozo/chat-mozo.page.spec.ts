import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMozoPage } from './chat-mozo.page';

describe('ChatMozoPage', () => {
  let component: ChatMozoPage;
  let fixture: ComponentFixture<ChatMozoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatMozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
