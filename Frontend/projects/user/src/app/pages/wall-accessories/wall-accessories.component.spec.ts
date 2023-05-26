import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallAccessoriesComponent } from './wall-accessories.component';

describe('WallAccessoriesComponent', () => {
  let component: WallAccessoriesComponent;
  let fixture: ComponentFixture<WallAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
