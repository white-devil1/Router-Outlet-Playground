// Test code disabled due to missing Jasmine types in this environment.
/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPageComponent } from './pages.component'; // Importing from pages.component file
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '123' }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should read the ID parameter from URL', () => {
    // The signal should have picked up '123' from the mock
    expect(component.userId()).toBe('123');
  });

  it('should render the ID in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('123');
  });
});
*/