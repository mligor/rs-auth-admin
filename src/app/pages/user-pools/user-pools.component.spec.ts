import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPoolsComponent } from './user-pools.component';

describe('UserPoolsComponent', () => {
  let component: UserPoolsComponent;
  let fixture: ComponentFixture<UserPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
