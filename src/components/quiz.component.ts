import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService, QuizQuestion } from '../services/quiz.service';
import { TutorialService } from '../services/tutorial.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col bg-slate-50 relative overflow-hidden font-sans">
      
      <!-- BACKGROUND DECORATION -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <!-- HEADER -->
      <div class="relative z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
        <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
          <span>🧠</span> Routing Quiz
          <span class="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-normal uppercase tracking-wider">
            {{ tutorial.currentLevel() }}
          </span>
        </h2>
        @if(quiz.quizState() === 'active') {
          <div class="flex items-center gap-4">
             <div class="text-sm font-bold text-slate-500">Score: <span class="text-indigo-600 text-lg">{{quiz.score()}}</span></div>
             <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
               <div class="h-full bg-indigo-500 transition-all duration-500" [style.width.%]="quiz.progress()"></div>
             </div>
          </div>
        }
      </div>

      <!-- MAIN CONTENT AREA -->
      <div class="flex-1 overflow-y-auto p-6 relative z-10 flex flex-col items-center justify-center">
        
        <!-- STATE: ACTIVE QUESTION -->
        @if(quiz.quizState() === 'active' && quiz.currentQuestion(); as q) {
          <div class="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col animate-slide-up">
            
            <!-- Question Text -->
            <div class="p-8 bg-slate-50 border-b border-slate-100">
               <div class="flex justify-between mb-4">
                 <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                   Question {{quiz.currentQuestionIndex() + 1}}
                 </span>
                 <span class="text-xs font-bold text-slate-400 uppercase">{{q.type}}</span>
               </div>
               
               <h3 class="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                 {{ formatQuestionText(q) }}
               </h3>
               
               @if(q.codeContext) {
                 <div class="mt-4 p-3 bg-slate-800 rounded-lg font-mono text-sm text-blue-300 border border-slate-700 shadow-inner">
                   {{q.codeContext}}
                 </div>
               }
            </div>

            <!-- Input Area -->
            <div class="p-8">
              @if(!quiz.showExplanation()) {
                
                <!-- MCQ -->
                @if(q.type === 'mcq') {
                  <div class="grid gap-3">
                    @for(opt of q.options; track opt) {
                      <button (click)="submit(opt)" 
                              class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700">
                        {{opt}}
                      </button>
                    }
                  </div>
                }

                <!-- FILL BLANK -->
                @if(q.type === 'fill-blank') {
                  <div class="flex gap-2">
                    <input #txtInput type="text" 
                           (keydown.enter)="submit(txtInput.value)"
                           placeholder="Type your answer here..." 
                           class="flex-1 p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none text-lg font-medium">
                    <button (click)="submit(txtInput.value)" class="px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg">Submit</button>
                  </div>
                }

                <!-- CODE -->
                @if(q.type === 'code') {
                  <div class="flex flex-col gap-3">
                    <textarea #codeInput rows="4" 
                              placeholder="Write your code snippet here..." 
                              class="w-full p-4 rounded-xl bg-slate-900 text-green-400 font-mono text-sm border-2 border-slate-700 focus:border-indigo-500 focus:outline-none shadow-inner"></textarea>
                    <button (click)="submit(codeInput.value)" class="self-end px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg">Run Code ▶</button>
                  </div>
                }

              } @else {
                <!-- RESULT FEEDBACK -->
                <div class="text-center animate-pop-in">
                  <div class="text-6xl mb-4">
                    {{ quiz.isCorrect() ? '✅' : '❌' }}
                  </div>
                  <h3 class="text-2xl font-bold mb-2" 
                      [class.text-green-600]="quiz.isCorrect()" 
                      [class.text-red-600]="!quiz.isCorrect()">
                    {{ quiz.isCorrect() ? 'Correct!' : 'Incorrect' }}
                  </h3>
                  
                  <div class="bg-slate-50 p-6 rounded-xl text-left border border-slate-200 mb-8 shadow-sm">
                    <p class="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2">Explanation:</p>
                    <p class="text-slate-700 leading-relaxed">{{q.explanation}}</p>
                    @if(!quiz.isCorrect()) {
                      <div class="mt-4 pt-4 border-t border-slate-200">
                        <span class="font-bold text-xs text-slate-400 uppercase tracking-widest">Correct Answer:</span>
                        <code class="block bg-slate-200 p-2 rounded mt-2 text-sm font-mono text-slate-800 break-words">
                          {{ q.type === 'code' ? 'Must contain keywords: ' + q.correctAnswer : q.correctAnswer }}
                        </code>
                      </div>
                    }
                  </div>

                  <button (click)="quiz.nextQuestion()" 
                          class="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Next Question →
                  </button>
                </div>
              }
            </div>
          </div>
        }

        <!-- STATE: RESULT -->
        @if(quiz.quizState() === 'result') {
          <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-pop-in border border-slate-100 relative overflow-hidden">
             
             <!-- SUCCESS -->
             @if(quiz.score() >= 30) {
               <div class="absolute inset-0 pointer-events-none">
                  <!-- CSS Confetti dots -->
                  <div class="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-confetti-1"></div>
                  <div class="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-confetti-2"></div>
                  <div class="absolute top-0 right-1/4 w-2 h-2 bg-green-500 rounded-full animate-confetti-3"></div>
               </div>
               
               <div class="text-8xl mb-4 animate-bounce">🏆</div>
               <h2 class="text-3xl font-black text-slate-800 mb-2">Excellent Work!</h2>
               <p class="text-slate-500 mb-6">You've mastered the {{quiz.currentLevel()}} level.</p>
             } 
             
             <!-- FAIL -->
             @else {
               <div class="text-8xl mb-4 animate-pulse grayscale">📉</div>
               <h2 class="text-3xl font-black text-slate-800 mb-2">Needs Improvement</h2>
               <p class="text-slate-500 mb-6">Review the tutorials and try again.</p>
             }

             <div class="text-6xl font-black mb-2" [class.text-indigo-600]="quiz.score() >= 30" [class.text-gray-400]="quiz.score() < 30">
                {{quiz.score()}}
             </div>
             <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Final Score</div>

             <div class="flex gap-3 justify-center">
               <button (click)="goHome()" class="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Exit</button>
               <button (click)="retry()" class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg">Retry</button>
             </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    
    @keyframes confettiFall { 0% { transform: translateY(-10px) rotate(0deg); opacity: 1; } 100% { transform: translateY(400px) rotate(360deg); opacity: 0; } }
    .animate-confetti-1 { animation: confettiFall 2s linear infinite; }
    .animate-confetti-2 { animation: confettiFall 2.5s linear infinite 0.5s; }
    .animate-confetti-3 { animation: confettiFall 1.8s linear infinite 1s; }
  `]
})
export class QuizComponent implements OnInit {
  quiz = inject(QuizService);
  tutorial = inject(TutorialService);
  router = inject(Router);

  ngOnInit() {
    // Automatically start quiz for the currently selected tutorial level
    this.retry();
  }

  // Safe helper to format text
  formatQuestionText(q: QuizQuestion): string {
    if (q.type === 'fill-blank' && q.question) {
      return q.question.replace('[?]', '____');
    }
    return q.question;
  }

  submit(answer: string) {
    if (!answer) return;
    this.quiz.submitAnswer(answer);
  }

  retry() {
    this.quiz.startQuiz(this.tutorial.currentLevel());
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
