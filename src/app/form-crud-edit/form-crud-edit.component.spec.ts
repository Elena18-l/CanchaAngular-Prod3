import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrudEditComponent } from './form-crud-edit.component';

describe('FormCrudEditComponent', () => {
  let component: FormCrudEditComponent;
  let fixture: ComponentFixture<FormCrudEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrudEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrudEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
