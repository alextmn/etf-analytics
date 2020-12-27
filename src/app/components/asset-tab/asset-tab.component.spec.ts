import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTabComponent } from './asset-tab.component';

describe('AssetTabComponent', () => {
  let component: AssetTabComponent;
  let fixture: ComponentFixture<AssetTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
