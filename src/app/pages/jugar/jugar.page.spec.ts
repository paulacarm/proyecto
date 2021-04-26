import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JugarPage } from './jugar.page';

describe('JugarPage', () => {
  let component: JugarPage;
  let fixture: ComponentFixture<JugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
