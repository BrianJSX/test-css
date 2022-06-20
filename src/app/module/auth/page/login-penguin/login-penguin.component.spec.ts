import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPenguinComponent } from './login-penguin.component';

describe('LoginPenguinComponent', () => {
  let component: LoginPenguinComponent;
  let fixture: ComponentFixture<LoginPenguinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPenguinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPenguinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
