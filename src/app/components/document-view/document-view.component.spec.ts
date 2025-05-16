import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DocumentViewComponent} from "./document-view.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('DocumentViewComponent', () => {
  let fixture: ComponentFixture<DocumentViewComponent>;
  let component: DocumentViewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentViewComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
