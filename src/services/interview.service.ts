import { Injectable, signal } from '@angular/core';
import { Level } from './quiz.service';

export interface InterviewQA {
  id: number;
  level: Level;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  
  questions = signal<InterviewQA[]>([]);

  constructor() {
    this.generateQuestions();
  }

  // Resets the state of all questions (collapses them)
  reset() {
    this.questions.update(qs => qs.map(q => ({ ...q, isOpen: false })));
  }

  private generateQuestions() {
    const allQs: InterviewQA[] = [];
    let idCounter = 1;

    // Helper for code blocks
    const code = (snippet: string) => `
      <div class="mt-3 bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs overflow-x-auto border border-slate-700 shadow-inner">
        <pre>${snippet}</pre>
      </div>
    `;

    // ===========================
    // LEVEL 1: BEGINNER
    // ===========================
    const beginnerQs = [
      { 
        q: 'What is a Single Page Application (SPA)?', 
        a: `
          <p class="mb-2">Think of a desktop application, like Spotify or Excel. When you click a button, the whole screen doesn't go black and reload, right? Only the part you changed updates.</p>
          <p class="mb-2">An SPA works the same way. We load <strong>index.html</strong> exactly once. After that, Angular takes over. When you navigate, instead of asking the server for a new page, Angular uses JavaScript to swap the HTML content inside the <code><router-outlet></code>.</p>
          <p><strong>Benefits:</strong> It's faster, feels like a native app, and doesn't "blink" white between pages.</p>
        ` 
      },
      { 
        q: 'What is the purpose of <router-outlet>?', 
        a: `
          <p class="mb-2">The <code>&lt;router-outlet&gt;</code> is essentially a <strong>placeholder</strong> or a "picture frame" in your HTML template.</p>
          <p class="mb-2">You place it in your <code>app.component.html</code> once. It tells the Angular Router: <em>"Hey, whenever the URL changes, please look up which component belongs to that URL, and display it right here."</em></p>
          ${code(`
<!-- app.component.html -->
<header>My Website</header>
<router-outlet></router-outlet> <!-- Content changes here! -->
<footer>Contact Us</footer>
          `)}
        ` 
      },
      { 
        q: 'Why should we use routerLink instead of href?', 
        a: `
          <p class="mb-2">This is a classic performance question. If you use a standard <code>href="/home"</code>, the browser treats it like a brand new website visit. It destroys your entire app, clears the memory, downloads all the scripts again, and restarts Angular.</p>
          <p class="mb-2"><strong>routerLink</strong> intercepts that click event. It tells the browser: <em>"Don't reload! I'll handle this."</em> Then it simply swaps the component view. It maintains your application state (like user data or scroll position).</p>
          ${code(`<a routerLink="/dashboard">Go Fast (SPA)</a>\n<a href="/dashboard">Go Slow (Reload)</a>`)}
        ` 
      },
      { 
        q: 'How do you handle a "Page Not Found" (404) scenario?', 
        a: `
          <p class="mb-2">We use a <strong>Wildcard Route</strong>. In route configuration syntax, two asterisks <code>**</code> mean "match absolutely anything".</p>
          <p class="mb-2"><strong>Crucial Rule:</strong> Angular matches routes from top to bottom. If you put the wildcard at the top, it will match <em>every</em> URL and your app will break. It must always be the <strong>last</strong> item in your routes array.</p>
          ${code(`
const routes = [
  { path: 'home', component: HomeComp },
  // ... other routes
  { path: '**', component: NotFoundComp } // LAST!
];
          `)}
        ` 
      }
    ];
    beginnerQs.forEach(item => allQs.push({ id: idCounter++, level: 'beginner', question: item.q, answer: item.a, isOpen: false }));


    // ===========================
    // LEVEL 2: INTERMEDIATE
    // ===========================
    const interQs = [
      { 
        q: 'How do you read a dynamic parameter, like /user/:id?', 
        a: `
          <p class="mb-2">You need the <code>ActivatedRoute</code> service. It represents the route that is currently loaded in the outlet.</p>
          <p class="mb-2">Ideally, you should use the <strong>Observable</strong> approach (<code>paramMap</code>). This is because Angular reuses components. If you navigate from <em>/user/1</em> to <em>/user/2</em>, the component is not destroyed, so <code>ngOnInit</code> won't run again, but the observable <em>will</em> emit the new ID.</p>
          ${code(`
// Modern way using Signals (Angular 16+)
userId = toSignal(
  inject(ActivatedRoute).paramMap.pipe(
    map(params => params.get('id'))
  )
);
          `)}
        ` 
      },
      { 
        q: 'What is a Route Guard?', 
        a: `
          <p class="mb-2">Think of a Route Guard as a bouncer at a club. It runs logic <em>before</em> the router allows navigation to complete.</p>
          <p class="mb-2">The most common one is <code>CanActivate</code>. It checks conditions like "Is the user logged in?". If it returns <code>true</code>, the user enters. If <code>false</code>, they are blocked. If it returns a <code>UrlTree</code>, they are redirected (e.g., to the login page).</p>
        ` 
      },
      { 
        q: 'What is Lazy Loading and why is it important?', 
        a: `
          <p class="mb-2">By default, Angular bundles your whole app into one file. If your app is huge, that file takes forever to download.</p>
          <p class="mb-2"><strong>Lazy Loading</strong> splits your code. We tell the router: <em>"Don't download the Admin section code until the user actually clicks the Admin link."</em></p>
          <p>This drastically improves the initial load time (LCP) of your application.</p>
          ${code(`
{ 
  path: 'admin', 
  loadChildren: () => import('./admin/routes') 
}
          `)}
        ` 
      },
      { 
        q: 'What are Named Outlets (Auxiliary Routes)?', 
        a: `
          <p class="mb-2">Sometimes you need to show multiple independent views at once. For example, a main dashboard, but also a persistent chat window or a popup.</p>
          <p class="mb-2">You can give a <code>&lt;router-outlet&gt;</code> a <code>name</code> attribute. The URL for this looks unique, using parentheses to separate the outlets.</p>
          ${code(`
// URL: /home(sidebar:chat)
<router-outlet></router-outlet>      <!-- Primary -->
<router-outlet name="sidebar"></router-outlet>
          `)}
        ` 
      }
    ];
    interQs.forEach(item => allQs.push({ id: idCounter++, level: 'intermediate', question: item.q, answer: item.a, isOpen: false }));


    // ===========================
    // LEVEL 3: ADVANCED
    // ===========================
    const advQs = [
      { 
        q: 'Explain the CanDeactivate guard with a use case.', 
        a: `
          <p class="mb-2"><code>CanDeactivate</code> is unique because it runs when the user tries to <strong>leave</strong> a route.</p>
          <p class="mb-2"><strong>Use Case:</strong> A user is filling out a long form and accidentally clicks "Home". Without this guard, their data is lost instantly. With <code>CanDeactivate</code>, we can check <code>component.hasUnsavedChanges()</code> and show a confirmation dialog: <em>"You have unsaved work. Are you sure you want to leave?"</em></p>
        ` 
      },
      { 
        q: 'What is a Resolver and when should you use it?', 
        a: `
          <p class="mb-2">A <strong>Resolver</strong> is a script that fetches data <em>before</em> the route activates. The router waits for the data to arrive before showing the component.</p>
          <p class="mb-2"><strong>Pros:</strong> The component doesn't need to handle "loading" states or empty data; the data is guaranteed to be there when it loads.</p>
          <p class="mb-2"><strong>Cons:</strong> If the API is slow, the user sees nothing (it feels like the app froze). Often, showing a skeleton loader in the component is better UX than using a resolver.</p>
        ` 
      },
      { 
        q: 'How does { relativeTo: this.route } work?', 
        a: `
          <p class="mb-2">When navigating programmatically using <code>router.navigate</code>, the router defaults to absolute paths (starting from root <code>/</code>).</p>
          <p class="mb-2">If you want to navigate <strong>relative</strong> to where you currently are (e.g., from <code>/products</code> to <code>/products/123</code>), you must provide the context.</p>
          ${code(`
// Current URL: /products
// Goal: Go to /products/123

// Bad (Hardcoded):
router.navigate(['/products', id]); 

// Good (Relative):
router.navigate([id], { relativeTo: this.route });
          `)}
        ` 
      }
    ];
    advQs.forEach(item => allQs.push({ id: idCounter++, level: 'advanced', question: item.q, answer: item.a, isOpen: false }));


    // ===========================
    // LEVEL 4: PROFESSIONAL
    // ===========================
    const profQs = [
      { 
        q: 'What is the RouteReuseStrategy?', 
        a: `
          <p class="mb-2">This is a powerful low-level API. By default, when you leave a route, Angular destroys the component. When you return, it recreates it.</p>
          <p class="mb-2">However, for complex dashboards or tabbed interfaces, you might want to keep the component state alive (scroll position, filled inputs) even when hidden.</p>
          <p class="mb-2">By implementing a custom <code>RouteReuseStrategy</code>, you can tell Angular to <strong>Detach</strong> the view (store it in memory) instead of destroying it, and <strong>Attach</strong> it (retrieve from memory) when the user returns.</p>
        ` 
      },
      { 
        q: 'Explain CanMatch vs CanLoad.', 
        a: `
          <p class="mb-2"><code>CanLoad</code> was used to prevent lazy-loaded bundles from downloading. However, it had a flaw: it blocked the route, but didn't allow you to try an alternative route with the same path.</p>
          <p class="mb-2"><code>CanMatch</code> (introduced in v14+) is superior. It runs during the route matching phase. If it returns <code>false</code>, the router behaves as if that route <strong>does not exist</strong> and keeps looking down the array.</p>
          <p class="mb-2"><strong>Killer Feature:</strong> You can define two routes with the same <code>path: 'dashboard'</code>. One guarded for 'Admin', one for 'User'. <code>CanMatch</code> will pick the correct component based on the user's role.</p>
        ` 
      },
      { 
        q: 'How does Angular handle UrlTree serialization?', 
        a: `
          <p class="mb-2">The URL in Angular isn't just a string; it's a recursive tree structure (<code>UrlTree</code>), comprised of <code>UrlSegmentGroups</code>, <code>UrlSegments</code>, and parameters.</p>
          <p class="mb-2">This is critical for handling <strong>Named Outlets</strong>. A URL like <code>/home(popup:details)</code> implies two parallel branches in the tree. The standard browser URL string is just a serialization of this internal tree state. This abstraction protects us from manually parsing confusing URL strings.</p>
        ` 
      }
    ];
    profQs.forEach(item => allQs.push({ id: idCounter++, level: 'professional', question: item.q, answer: item.a, isOpen: false }));

    this.questions.set(allQs);
  }

  toggle(id: number) {
    this.questions.update(qs => qs.map(q => q.id === id ? { ...q, isOpen: !q.isOpen } : q));
  }
}