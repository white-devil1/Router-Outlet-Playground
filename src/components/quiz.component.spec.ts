
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../services/quiz.service';
import { TutorialService } from '../services/tutorial.service';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizService: QuizService;
  let routerSpy: any;

  beforeEach(async () => {
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        QuizService,
        TutorialService,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    fixture.detectChanges();
  });

  it('should start quiz on init', () => {
    expect(quizService.quizState()).toBe('active');
  });

  it('should submit answer via service', () => {
    vi.spyOn(quizService, 'submitAnswer');
    component.submit('Option A');
    expect(quizService.submitAnswer).toHaveBeenCalledWith('Option A');
  });

  it('should format fill-blank questions', () => {
    const q = { type: 'fill-blank', question: 'Hello [?] World' } as any;
    const formatted = component.formatQuestionText(q);
    expect(formatted).toContain('____');
  });

  it('should navigate home on exit', () => {
    component.goHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
