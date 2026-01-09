
import { TestBed } from '@angular/core/testing';
import { TutorialService } from './tutorial.service';
import { LanguageService } from './language.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TutorialService', () => {
  let service: TutorialService;
  let langService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialService);
    langService = TestBed.inject(LanguageService);
  });

  it('should generate steps', () => {
    const steps = service.steps();
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].title).toBeDefined();
  });

  it('should navigate next and prev correctly', () => {
    service.goTo(0);
    expect(service.isFirst()).toBe(true);

    service.next();
    expect(service.currentStep().id).toBe(2); 
    expect(service.isFirst()).toBe(false);

    service.prev();
    expect(service.isFirst()).toBe(true);
  });

  it('should not go out of bounds', () => {
    service.goTo(0);
    service.prev(); 
    expect(service.isFirst()).toBe(true);

    const lastIndex = service.steps().length - 1;
    service.goTo(lastIndex);
    service.next(); 
    expect(service.isLast()).toBe(true);
  });

  it('should update content based on Language', () => {
    service.goTo(0);
    const englishTitle = service.currentStep().title;

    langService.setLanguage('hi');
    const hindiTitle = service.currentStep().title;

    expect(englishTitle).not.toBe(hindiTitle);
  });

  it('should update content based on Level', () => {
    service.goTo(0);
    service.setLevel('beginner');
    const beginnerContent = service.currentStep().content;

    service.setLevel('professional');
    const proContent = service.currentStep().content;

    expect(beginnerContent).not.toBe(proContent);
  });

  it('should group modules correctly', () => {
    const modules = service.modules();
    expect(modules.length).toBeGreaterThan(0);
    expect(modules[0][0]).toBeDefined(); 
    expect(Array.isArray(modules[0][1])).toBe(true); 
  });
});
