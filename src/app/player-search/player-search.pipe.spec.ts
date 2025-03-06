import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSearchPipe } from './player-search.pipe';

describe('PlayerSearchPipe', () => {
  let component: PlayerSearchPipe;
  let fixture: ComponentFixture<PlayerSearchPipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSearchPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSearchPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
