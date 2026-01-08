import { Component, output, inject, signal } from '@angular/core';
import { LanguageService, LangCode } from '../services/language.service';
import { TutorialService, Level } from '../services/tutorial.service';
import { AngularLogoComponent } from './svg/angular-logo.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AngularLogoComponent],
  template: `
    <!-- MAIN CONTAINER -->
    <div class="min-h-screen w-full text-white font-sans flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto overflow-x-hidden selection:bg-pink-500 selection:text-white landing-bg-flow">
      
      <!-- Ambient Background Gradients -->
      <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/15 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-600/15 blur-[120px] rounded-full"></div>
      </div>

      <!-- Main Content Wrapper -->
      <div class="relative z-10 w-full max-w-5xl flex flex-col items-center gap-10 md:gap-14 animate-fade-in">
        
        <!-- Header & Logo Section -->
        <div class="flex flex-col items-center text-center gap-6">
           <!-- Logo Container -->
           <div class="w-24 h-24 md:w-32 md:h-32 relative filter drop-shadow-2xl transition-transform hover:scale-105 duration-500">
              <app-angular-logo></app-angular-logo>
           </div>
           
           <!-- Title Block -->
           <div class="flex flex-col gap-1">
             <h1 class="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight gradient-flow">
               Angular
             </h1>
             <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight">
               RouteMaster
             </h2>
           </div>

           <!-- Subtitle -->
           <p class="text-slate-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
             The interactive academy for mastering navigation. 
             <br class="hidden md:block">
             From basic <span class="text-pink-400 font-bold">outlets</span> to advanced <span class="text-purple-400 font-bold">architecture</span>.
           </p>
        </div>

        <!-- Selection Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
           
           <!-- 1. Language Card -->
           <div class="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl hover:border-pink-500/30 transition-all duration-300">
              <div class="flex items-center gap-4 border-b border-white/5 pb-4">
                 <div class="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold shadow-lg shadow-pink-500/10">1</div>
                 <div>
                   <h3 class="font-bold text-white text-lg">Language</h3>
                   <p class="text-xs text-slate-400 uppercase tracking-widest font-semibold">Choose your instruction</p>
                 </div>
              </div>
              
              <div class="flex flex-col gap-3">
                 @for(lang of languages; track lang.code) {
                   <button (click)="selectLang(lang.code)"
                           class="relative group w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200"
                           [class.bg-gradient-to-r]="selectedLang() === lang.code"
                           [class.from-pink-600]="selectedLang() === lang.code"
                           [class.to-purple-600]="selectedLang() === lang.code"
                           [class.gradient-flow]="selectedLang() === lang.code"
                           
                           [class.border-transparent]="selectedLang() === lang.code"
                           [class.text-white]="selectedLang() === lang.code"
                           [class.shadow-lg]="selectedLang() === lang.code"
                           [class.shadow-pink-500/20]="selectedLang() === lang.code"
                           
                           [class.bg-slate-900/50]="selectedLang() !== lang.code"
                           [class.border-white/5]="selectedLang() !== lang.code"
                           [class.text-slate-300]="selectedLang() !== lang.code"
                           [class.hover:bg-slate-800]="selectedLang() !== lang.code"
                           [class.hover:border-white/10]="selectedLang() !== lang.code">
                      
                      <span class="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">{{lang.flag}}</span>
                      <span class="font-bold text-sm tracking-wide">{{lang.name}}</span>
                      
                      @if(selectedLang() === lang.code) {
                        <div class="ml-auto bg-white/20 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        </div>
                      }
                   </button>
                 }
              </div>
           </div>

           <!-- 2. Experience Card -->
           <div class="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div class="flex items-center gap-4 border-b border-white/5 pb-4">
                 <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shadow-lg shadow-purple-500/10">2</div>
                 <div>
                   <h3 class="font-bold text-white text-lg">Experience</h3>
                   <p class="text-xs text-slate-400 uppercase tracking-widest font-semibold">Select your level</p>
                 </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3 h-full">
                 @for(lvl of levels; track lvl.id) {
                   <button (click)="selectLevel(lvl.id)"
                           class="flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 text-left relative group overflow-hidden"
                           [class.bg-purple-500/20]="selectedLevel() === lvl.id"
                           [class.border-purple-500/50]="selectedLevel() === lvl.id"
                           [class.text-white]="selectedLevel() === lvl.id"
                           [class.shadow-inner]="selectedLevel() === lvl.id"
                           
                           [class.bg-slate-900/50]="selectedLevel() !== lvl.id"
                           [class.border-white/5]="selectedLevel() !== lvl.id"
                           [class.text-slate-400]="selectedLevel() !== lvl.id"
                           [class.hover:bg-slate-800]="selectedLevel() !== lvl.id"
                           [class.hover:border-white/10]="selectedLevel() !== lvl.id">
                      
                      <span class="text-3xl mb-3 filter drop-shadow-md group-hover:scale-110 transition-transform origin-top-left">{{lvl.icon}}</span>
                      <div>
                        <div class="font-bold text-sm mb-1" [class.text-purple-200]="selectedLevel() === lvl.id">{{lvl.label}}</div>
                        <div class="text-[10px] opacity-70 leading-tight">{{lvl.desc}}</div>
                      </div>
                      
                      @if(selectedLevel() === lvl.id) {
                         <div class="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)] animate-pulse"></div>
                      }
                   </button>
                 }
              </div>
           </div>

        </div>

        <!-- Start Action -->
        <div class="mt-4 mb-8">
            <button (click)="onStart()" 
                    class="group relative px-12 py-5 rounded-full font-bold text-lg text-white shadow-2xl transition-all hover:scale-105 hover:shadow-pink-500/40 active:scale-95 overflow-hidden ring-1 ring-white/20">
                <div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 gradient-flow group-hover:bg-gradient-to-br transition-all duration-500"></div>
                <div class="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span class="relative flex items-center gap-3 tracking-wide">
                    Enter Playground 
                    <span class="group-hover:translate-x-1 transition-transform text-xl">🚀</span>
                </span>
            </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    /* Foreground Elements (Fast Flow) */
    .gradient-flow {
      background-size: 200% auto;
      animation: gradientFlow 3s ease-in-out infinite;
    }

    /* Main Background (Slow Dark Flow) */
    .landing-bg-flow {
      /* Deep Slate 950 -> Deep Purple 950 -> Deep Indigo 950 -> Deep Slate 950 */
      background-image: linear-gradient(to right, #020617, #2e1065, #1e1b4b, #020617);
      background-size: 200% auto;
      animation: gradientFlow 15s ease-in-out infinite;
    }

    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `]
})
export class LandingPageComponent {
  ls = inject(LanguageService);
  ts = inject(TutorialService);
  start = output<void>();

  selectedLang = signal<LangCode>(this.ls.currentLang());
  selectedLevel = signal<Level>(this.ts.currentLevel());

  languages: {code: LangCode, name: string, flag: string}[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🌴' },
  ];

  levels: {id: Level, label: string, desc: string, icon: string}[] = [
    { id: 'beginner', label: 'Student', desc: 'New to code', icon: '🎒' },
    { id: 'intermediate', label: 'Intern', desc: 'Basic JS/HTML', icon: '💻' },
    { id: 'advanced', label: 'Developer', desc: 'Daily Angular user', icon: '🛠️' },
    { id: 'professional', label: 'Architect', desc: 'Deep dive internals', icon: '🏛️' },
  ];

  selectLang(code: LangCode) { this.selectedLang.set(code); }
  selectLevel(l: Level) { this.selectedLevel.set(l); }

  onStart() {
    this.ls.setLanguage(this.selectedLang());
    this.ts.setLevel(this.selectedLevel());
    this.start.emit();
  }
}
