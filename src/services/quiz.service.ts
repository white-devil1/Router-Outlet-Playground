import { Injectable, signal, computed } from '@angular/core';

export type QuestionType = 'mcq' | 'fill-blank' | 'code';
export type Level = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export interface QuizQuestion {
  id: number;
  level: Level;
  type: QuestionType;
  question: string;
  codeContext?: string; // For code questions, show this context
  options?: string[]; // For MCQ
  correctAnswer: string | string[]; // String for Fill/Code, Array of strings (keywords) for Code fuzzy match
  explanation: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  // --- STATE ---
  currentLevel = signal<Level>('beginner');
  currentQuestionIndex = signal(0);
  score = signal(0);
  quizState = signal<'intro' | 'active' | 'result'>('intro');
  userAnswers = signal<Map<number, string>>(new Map());
  showExplanation = signal(false);
  isCorrect = signal(false);

  // --- DATA REPOSITORY ---
  private allQuestions: QuizQuestion[] = [];

  constructor() {
    this.initializeQuestions();
    this.generateDrillQuestions(); 
  }

  // Base Set of Hand-Crafted Questions (High Quality)
  private initializeQuestions() {
    this.allQuestions = [
      // === BEGINNER (Basic Tags & Concepts) ===
      {
        id: 1, level: 'beginner', type: 'mcq',
        question: 'Which HTML tag acts as the placeholder for the active page?',
        options: ['<app-root>', '<router-outlet>', '<ng-content>', '<div id="main">'],
        correctAnswer: '<router-outlet>',
        explanation: 'The <router-outlet> is the dynamic container where Angular inserts the component for the current URL.'
      },
      {
        id: 2, level: 'beginner', type: 'fill-blank',
        question: 'To link to the "/home" page without reloading, use the [?] directive.',
        correctAnswer: 'routerLink',
        explanation: 'Use routerLink="/path" instead of href to perform single-page navigation.'
      },
      
      // === INTERMEDIATE (Params & 404) ===
      {
        id: 101, level: 'intermediate', type: 'mcq',
        question: 'How do you define a route parameter for a user ID?',
        options: ['path: "user/id"', 'path: "user/:id"', 'path: "user/{id}"', 'path: "user?id"'],
        correctAnswer: 'path: "user/:id"',
        explanation: 'The colon (:) denotes a dynamic parameter in the route definition.'
      },
      {
        id: 102, level: 'intermediate', type: 'fill-blank',
        question: 'To define a route that catches invalid URLs (404), we use the path: "[?]"',
        correctAnswer: '**',
        explanation: 'The double asterisk (**) is the wildcard path that matches any URL.'
      },

      // === ADVANCED (Guards & Lazy Loading) ===
      {
        id: 201, level: 'advanced', type: 'mcq',
        question: 'Why might ngOnInit NOT run when navigating from /user/1 to /user/2?',
        options: ['A bug in Angular', 'The component is reused', 'Change Detection is off', 'The Router is broken'],
        correctAnswer: 'The component is reused',
        explanation: 'By default, Angular reuses the component instance if the route config is the same, only the params change.'
      },
      {
        id: 202, level: 'advanced', type: 'code',
        question: 'Write a lazy loading route for "admin" that imports "./admin.routes".',
        codeContext: '// routes array',
        correctAnswer: ['path', "'admin'", 'loadChildren', 'import', "'./admin.routes'"],
        explanation: '{ path: "admin", loadChildren: () => import("./admin.routes") }'
      },
      
      // === PROFESSIONAL (Architecture & Strategy) ===
      {
        id: 301, level: 'professional', type: 'mcq',
        question: 'Which strategy allows you to detach a view and store it in memory instead of destroying it?',
        options: ['RouteReuseStrategy', 'ViewEncapsulation', 'ChangeDetectionStrategy', 'PreloadAllModules'],
        correctAnswer: 'RouteReuseStrategy',
        explanation: 'RouteReuseStrategy allows customization of when to detach/store and reattach route snapshots.'
      },
      {
        id: 302, level: 'professional', type: 'code',
        question: 'Write a functional guard that redirects to "/login" if not logged in.',
        codeContext: 'const guard: CanActivateFn = (route, state) => ...',
        correctAnswer: ['inject', 'AuthService', 'createUrlTree', "'/login'"],
        explanation: 'return isLoggedIn ? true : createUrlTree(["/login"]);'
      }
    ];
  }

  // --- SMART GENERATOR ---
  private generateDrillQuestions() {
    
    // 1. BEGINNER GENERATOR (Simple Path Logic)
    const beginnerTopics = ['home', 'about', 'contact', 'login', 'signup'];
    beginnerTopics.forEach((topic, i) => {
      this.allQuestions.push({
        id: 1000 + i, level: 'beginner', type: 'code',
        question: `Write the HTML code to create a navigation link to the '${topic}' page.`,
        codeContext: '<!-- Template -->',
        correctAnswer: ['<a', `routerLink="/${topic}"`, '>'],
        explanation: `We use routerLink="/${topic}" to navigate without reloading.`
      });
      
      this.allQuestions.push({
        id: 1100 + i, level: 'beginner', type: 'mcq',
        question: `What happens if you use href="/${topic}" instead of routerLink?`,
        options: ['The page reloads (bad)', 'It works perfectly (good)', 'Angular throws an error', 'Nothing happens'],
        correctAnswer: 'The page reloads (bad)',
        explanation: 'href causes a full browser refresh, losing application state.'
      });
    });

    // 2. INTERMEDIATE GENERATOR (Params & Redirects)
    const paramEntities = ['product', 'order', 'ticket', 'invoice', 'lesson'];
    paramEntities.forEach((ent, i) => {
       this.allQuestions.push({
        id: 2000 + i, level: 'intermediate', type: 'fill-blank',
        question: `To capture the ID of a ${ent}, the route path should be defined as: '${ent}/[?]'`,
        correctAnswer: ':id',
        explanation: 'Route parameters always start with a colon (:).'
       });
       
       this.allQuestions.push({
        id: 2100 + i, level: 'intermediate', type: 'mcq',
        question: `In the component, how do you read the 'id' for the ${ent}?`,
        options: ['ActivatedRoute.snapshot.paramMap', 'Router.url', 'Location.path', 'Window.location'],
        correctAnswer: 'ActivatedRoute.snapshot.paramMap',
        explanation: 'ActivatedRoute provides access to the parameters of the currently active route.'
       });
    });

    // 3. ADVANCED GENERATOR (Guards & Resolvers)
    const roles = ['admin', 'manager', 'editor', 'subscriber'];
    roles.forEach((role, i) => {
      this.allQuestions.push({
        id: 3000 + i, level: 'advanced', type: 'code',
        question: `Write a guard check to see if the user has the '${role}' role.`,
        codeContext: 'canActivate: () => ...',
        correctAnswer: ['user.hasRole', `'${role}'`, 'true', 'false'],
        explanation: `You typically check user.role === '${role}' inside the guard function.`
      });
    });

    // 4. PROFESSIONAL GENERATOR (Complex Scenarios)
    for(let i=0; i<10; i++) {
       this.allQuestions.push({
         id: 4000 + i, level: 'professional', type: 'mcq',
         question: `Scenario ${i+1}: A user navigates to a lazy-loaded module but the network fails. Which event fires?`,
         options: ['RouteConfigLoadError', 'NavigationError', 'NavigationCancel', 'GuardsCheckEnd'],
         correctAnswer: 'RouteConfigLoadError',
         explanation: 'RouteConfigLoadError is triggered when a lazy loaded module fails to download.'
       });
       
       this.allQuestions.push({
         id: 4100 + i, level: 'professional', type: 'fill-blank',
         question: `To optimize change detection in the router outlet for Scenario ${i+1}, we can detach the view using [?].`,
         correctAnswer: 'ViewContainerRef',
         explanation: 'ViewContainerRef.detach() removes the view from the DOM but keeps it in memory.'
       });
    }

  }

  // --- COMPUTED ---
  
  questionsForLevel = computed(() => {
    return this.allQuestions.filter(q => q.level === this.currentLevel());
  });

  currentQuestion = computed(() => {
    const questions = this.questionsForLevel();
    return questions[this.currentQuestionIndex()] || null;
  });

  progress = computed(() => {
    const total = this.questionsForLevel().length;
    if (total === 0) return 0;
    return ((this.currentQuestionIndex()) / total) * 100;
  });

  // --- ACTIONS ---

  startQuiz(level: Level) {
    this.currentLevel.set(level);
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.quizState.set('active');
    this.userAnswers.update(m => { m.clear(); return new Map(m); });
    this.showExplanation.set(false);
  }

  submitAnswer(answer: string) {
    const q = this.currentQuestion();
    if (!q) return;

    let correct = false;

    // VALIDATION LOGIC
    if (q.type === 'mcq') {
      correct = answer === q.correctAnswer;
    } 
    else if (q.type === 'fill-blank') {
      correct = answer.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim();
    } 
    else if (q.type === 'code') {
      const requiredTokens = q.correctAnswer as string[];
      // Remove all whitespace and special chars for fuzzy matching
      const userCode = answer.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      
      correct = requiredTokens.every(token => {
        const cleanToken = token.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return userCode.includes(cleanToken);
      });
    }

    this.isCorrect.set(correct);
    if (correct) {
      this.score.update(s => s + 10);
    }

    this.showExplanation.set(true);
  }

  nextQuestion() {
    this.showExplanation.set(false);
    const nextIdx = this.currentQuestionIndex() + 1;
    if (nextIdx >= this.questionsForLevel().length) {
      this.quizState.set('result');
    } else {
      this.currentQuestionIndex.set(nextIdx);
    }
  }

  restart() {
    this.quizState.set('intro');
  }
}
