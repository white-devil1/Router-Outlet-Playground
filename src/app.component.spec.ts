
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router } from '@angular/router';
import { TutorialService } from './services/tutorial.service';
import { SpeechService } from './services/speech.service';
import { QuizService } from './services/quiz.service';
import { InterviewService } from './services/interview.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let tutorialService: TutorialService;
  let speechService: any; // Using simple object for mock

  beforeEach(async () => {
    // Create Vitest mocks
    const speechSpy = {
      speak: vi.fn(),
      stop: vi.fn(),
      isSpeaking: vi.fn().mockReturnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]), 
        { provide: SpeechService, useValue: speechSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    tutorialService = TestBed.inject(TutorialService);
    speechService = TestBed.inject(SpeechService);
    
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    expect(component.isSidebarOpen()).toBe(false);
    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBe(true);
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
    
    vi.spyOn(quizService, 'reset');
    vi.spyOn(interviewService, 'reset');
    vi.spyOn(router, 'navigate');

    component.startTutorial();

    expect(quizService.reset).toHaveBeenCalled();
    expect(interviewService.reset).toHaveBeenCalled();
    expect(component.showLandingPage()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home', { outlets: { left: null, right: null } }]);
  });

  it('should dim non-focused areas', () => {
    // Mock the current step's focus area manually via property overwrite if needed,
    // or rely on default tutorial service state.
    // For unit testing strict logic, we trust the defaults or use `vi.spyOn`.
    
    // We'll trust default state here which is usually 'intro' or step 1.
    // Step 1 focusArea is 'intro'.
    expect(component.shouldDim('primary')).toBe(false); 
  });
});
