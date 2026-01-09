// Test code disabled due to missing Jasmine types in this environment.
/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { TutorialService } from './services/tutorial.service';
import { SpeechService } from './services/speech.service';
import { QuizService } from './services/quiz.service';
import { InterviewService } from './services/interview.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let tutorialService: TutorialService;
  let speechService: jasmine.SpyObj<SpeechService>;

  beforeEach(async () => {
    const speechSpy = jasmine.createSpyObj('SpeechService', ['speak', 'stop'], { isSpeaking: () => false });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]), // Mock router config
        { provide: SpeechService, useValue: speechSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    tutorialService = TestBed.inject(TutorialService);
    speechService = TestBed.inject(SpeechService) as jasmine.SpyObj<SpeechService>;
    
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    expect(component.isSidebarOpen()).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBeTrue();
  });

  it('should parse URLs correctly for the simulator bar', () => {
    // 1. Root
    component.currentUrlStr.set('/');
    expect(component.parsedUrl().primary).toBe('home');

    // 2. Simple
    component.currentUrlStr.set('/dashboard');
    expect(component.parsedUrl().primary).toBe('dashboard');

    // 3. With ID
    component.currentUrlStr.set('/user/99');
    expect(component.parsedUrl().primary).toBe('user');
    expect(component.parsedUrl().id).toBe('99');

    // 4. Complex Outlets
    component.currentUrlStr.set('/home(left:menu//right:help)');
    expect(component.parsedUrl().primary).toBe('home');
    expect(component.parsedUrl().left).toBe('menu');
    expect(component.parsedUrl().right).toBe('help');
  });

  it('should start tutorial by resetting services', () => {
    const quizService = TestBed.inject(QuizService);
    const interviewService = TestBed.inject(InterviewService);
    
    spyOn(quizService, 'reset');
    spyOn(interviewService, 'reset');
    spyOn(router, 'navigate');

    component.startTutorial();

    expect(quizService.reset).toHaveBeenCalled();
    expect(interviewService.reset).toHaveBeenCalled();
    expect(component.showLandingPage()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home', { outlets: { left: null, right: null } }]);
  });

  it('should dim non-focused areas', () => {
    // Mock the current step's focus area
    spyOn(tutorialService, 'currentStep').and.returnValue({
      focusArea: 'primary'
    } as any);

    expect(component.shouldDim('primary')).toBeFalse(); // Should NOT dim the active area
    expect(component.shouldDim('left')).toBeTrue();    // Should dim other areas
  });
});
*/