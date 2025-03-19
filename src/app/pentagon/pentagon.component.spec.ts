import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentagonComponent } from './pentagon.component';

describe('PentagonComponent', () => {
  let component: PentagonComponent;
  let fixture: ComponentFixture<PentagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PentagonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PentagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
