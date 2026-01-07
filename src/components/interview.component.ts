import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewService } from '../services/interview.service';
import { TitleCasePipe } from '@angular/common';
import { Level } from '../services/quiz.service';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  template: `
    <div class="h-full bg-slate-50 p-6 overflow-y-auto flex flex-col items-center">
      
      <!-- STATE: INTRO (SELECT LEVEL) -->
      @if(viewState() === 'intro') {
        <div class="max-w-4xl w-full animate-fade-in text-center mt-10">
          <div class="text-6xl mb-6">🤝</div>
          <h1 class="text-3xl md:text-4xl font-black text-slate-900 mb-4">Interview Preparation</h1>
          <p class="text-slate-600 mb-10 max-w-xl mx-auto">Select your target role level to see relevant interview questions and answers.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
             @for(lvl of levels; track lvl) {
               <button (click)="selectLevel(lvl)" 
                       class="p-8 rounded-2xl border-2 transition-all hover:-translate-y-2 hover:shadow-xl text-left group bg-white relative overflow-hidden"
                       [class.border-indigo-100]="lvl === 'beginner'" 
                       [class.border-blue-100]="lvl === 'intermediate'" 
                       [class.border-purple-100]="lvl === 'advanced'" 
                       [class.border-orange-100]="lvl === 'professional'">
                  
                  <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">
                    @if(lvl === 'beginner') { 🎒 }
                    @else if(lvl === 'intermediate') { 💻 }
                    @else if(lvl === 'advanced') { 🛠️ }
                    @else { 🏛️ }
                  </div>

                  <div class="text-xs font-bold uppercase tracking-widest mb-2 text-slate-400">{{lvl}}</div>
                  <div class="text-xl font-bold text-slate-800 flex items-center gap-2">
                    View Questions
                    <span class="transform group-hover:translate-x-2 transition-transform text-indigo-500">→</span>
                  </div>
               </button>
             }
           </div>
        </div>
      }

      <!-- STATE: LIST QUESTIONS -->
      @if(viewState() === 'active') {
        <div class="max-w-3xl w-full animate-slide-up">
          
          <div class="flex items-center gap-4 mb-8">
            <button (click)="viewState.set('intro')" class="p-2 hover:bg-slate-200 rounded-full transition-colors">
              ⬅️
            </button>
            <div>
              <h1 class="text-2xl font-black text-slate-800">
                <span class="text-indigo-600">{{ currentLevel() | titlecase }}</span> Interview Q&A
              </h1>
              <p class="text-sm text-slate-500">{{ filteredQuestions().length }} Questions available</p>
            </div>
          </div>

          <div class="space-y-4 pb-20">
            @for(q of filteredQuestions(); track q.id) {
              <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                <button (click)="service.toggle(q.id)" 
                        class="w-full text-left px-6 py-5 flex justify-between items-start focus:outline-none">
                  <span class="font-bold text-slate-800 pr-4 leading-relaxed">{{q.question}}</span>
                  <div class="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 transition-colors"
                       [class.bg-indigo-50]="q.isOpen" [class.border-indigo-100]="q.isOpen">
                    <span class="text-slate-400 font-light transition-transform duration-300" 
                          [class.rotate-45]="q.isOpen"
                          [class.text-indigo-600]="q.isOpen">+</span>
                  </div>
                </button>
                
                @if(q.isOpen) {
                  <div class="px-6 pb-6 pt-0 animate-slide-down">
                    <div class="p-4 bg-slate-50 border-l-4 border-indigo-400 rounded-r-lg text-slate-700 leading-relaxed text-sm">
                      {{q.answer}}
                    </div>
                  </div>
                }
              </div>
            }
          </div>

        </div>
      }

    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-slide-down { animation: slideDown 0.2s ease-out; transform-origin: top; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideDown { from { opacity: 0; transform: scaleY(0.95); height: 0; } to { opacity: 1; transform: scaleY(1); height: auto; } }
  `]
})
export class InterviewComponent {
  service = inject(InterviewService);
  levels: Level[] = ['beginner', 'intermediate', 'advanced', 'professional'];
  
  viewState = signal<'intro' | 'active'>('intro');
  currentLevel = signal<Level>('beginner');

  filteredQuestions = (() => {
    return this.service.questions().filter(q => q.level === this.currentLevel());
  });

  selectLevel(lvl: Level) {
    this.currentLevel.set(lvl);
    this.viewState.set('active');
  }
}
