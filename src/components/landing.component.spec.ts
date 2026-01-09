
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing.component';
import { LanguageService } from '../services/language.service';
import { TutorialService } from '../services/tutorial.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let langService: LanguageService;
  let tutorialService: TutorialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [LanguageService, TutorialService]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    langService = TestBed.inject(LanguageService);
    tutorialService = TestBed.inject(TutorialService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected language', () => {
    component.selectLang('hi');
    expect(component.selectedLang()).toBe('hi');
  });

  it('should update selected level', () => {
    component.selectLevel('professional');
    expect(component.selectedLevel()).toBe('professional');
  });

  it('should emit start event and update services on start', () => {
    vi.spyOn(component.start, 'emit');
    vi.spyOn(langService, 'setLanguage');
    vi.spyOn(tutorialService, 'setLevel');

    // Set some state
    component.selectLang('ml');
    component.selectLevel('advanced');
    
    // Action
    component.onStart();

    expect(langService.setLanguage).toHaveBeenCalledWith('ml');
    expect(tutorialService.setLevel).toHaveBeenCalledWith('advanced');
    expect(component.start.emit).toHaveBeenCalled();
  });
});
