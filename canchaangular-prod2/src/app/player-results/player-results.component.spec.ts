import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerResultsComponent } from './player-results.component';

describe('PlayerResultsComponent', () => {
  let component: PlayerResultsComponent;
  let fixture: ComponentFixture<PlayerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
