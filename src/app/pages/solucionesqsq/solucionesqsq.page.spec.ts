import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolucionesqsqPage } from './solucionesqsq.page';

describe('SolucionesqsqPage', () => {
  let component: SolucionesqsqPage;
  let fixture: ComponentFixture<SolucionesqsqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolucionesqsqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolucionesqsqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
