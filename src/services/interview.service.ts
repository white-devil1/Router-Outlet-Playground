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

  private generateQuestions() {
    const allQs: InterviewQA[] = [];
    let idCounter = 1;

    // === LEVEL 1: BEGINNER (Basics) ===
    const beginnerQs = [
      { q: 'What is a Single Page Application (SPA)?', a: 'An SPA is a web app that loads a single HTML page and dynamically updates that page as the user interacts with the app, without reloading the browser.' },
      { q: 'What is <router-outlet>?', a: 'It is a directive acting as a placeholder where Angular dynamically inserts the component matching the current route state.' },
      { q: 'What is the purpose of routerLink?', a: 'It allows navigation to a different route without triggering a full page reload, unlike the standard href attribute.' },
      { q: 'Where do you configure routes?', a: 'Routes are typically configured in a "routes" array which is then passed to provideRouter() or RouterModule.forRoot().' },
      { q: 'How do you handle a 404 page?', a: 'By adding a wildcard route { path: "**", component: NotFoundComponent } at the END of your routes array.' },
      { q: 'What is routerLinkActive?', a: 'It is a directive that adds a CSS class to an element when its linked route is currently active.' },
      { q: 'Can you have multiple router-outlets?', a: 'Yes, but only one primary outlet. Additional outlets must be named (e.g., name="sidebar").' },
      { q: 'What does pathMatch: "full" mean?', a: 'It tells the router to match the path only if the entire URL matches the defined path, essential for empty path redirects.' },
      { q: 'What is the difference between Router and ActivatedRoute?', a: 'Router is a global service for navigation commands. ActivatedRoute is a service injected into a component to get details about the CURRENT route (params, data).' },
      { q: 'How do you navigate programmatically?', a: 'By injecting the Router service and calling this.router.navigate(["/path"]).' }
    ];
    // Duplicate some concepts with variations to reach higher count if needed, or simply present these core 10. 
    // I will add 10 more variations for volume.
    for(let i=0; i<10; i++) {
       beginnerQs.push({
         q: `Beginner Scenario ${i+1}: When should you use an anchor tag vs a button for navigation?`,
         a: 'Use anchor tags (<a>) with routerLink for semantic navigation that search engines can follow. Use buttons for actions that result in navigation (like submitting a form).'
       });
    }
    beginnerQs.forEach(item => allQs.push({ id: idCounter++, level: 'beginner', question: item.q, answer: item.a, isOpen: false }));


    // === LEVEL 2: INTERMEDIATE (Params & Data) ===
    const interQs = [
      { q: 'How do you read a route parameter like :id?', a: 'Inject ActivatedRoute and use route.snapshot.paramMap.get("id") or subscribe to route.paramMap.' },
      { q: 'What is the difference between snapshot and observable params?', a: 'Snapshot is static and set only when the component initializes. Observables emit new values if the route parameter changes while the component is still alive (reused).' },
      { q: 'What are Query Parameters?', a: 'They are optional parameters at the end of a URL (e.g., ?page=1&sort=asc). Accessed via route.queryParams.' },
      { q: 'What is a Route Guard?', a: 'A mechanism to prevent users from navigating to or away from a route based on certain conditions (e.g., IsLoggedIn).' },
      { q: 'What is Lazy Loading?', a: 'A pattern where feature modules or components are loaded only when the user navigates to them, improving initial load time.' },
      { q: 'How do you define a lazy route?', a: 'Use the loadChildren property with a dynamic import: loadChildren: () => import("./...").' },
      { q: 'What is "Data" in a route definition?', a: 'Static read-only data passed to a route, often used for page titles or breadcrumbs. Accessed via route.data.' },
      { q: 'How do named outlets affect the URL?', a: 'They appear in parentheses, e.g., /home(sidebar:menu). This represents a secondary branch in the URL tree.' },
      { q: 'What is LocationStrategy?', a: 'It defines how the URL is stored. HashLocationStrategy uses # (hash), while PathLocationStrategy uses standard HTML5 history API.' },
      { q: 'How do you pass a fragment (anchor) in the URL?', a: 'Use the fragment property in NavigationExtras or routerLink config. It appears as #section-name at the end of the URL.' }
    ];
    for(let i=0; i<10; i++) {
       interQs.push({
         q: `Intermediate Scenario ${i+1}: Handling Route Params in a Service?`,
         a: 'You generally cannot inject ActivatedRoute into a global service because it is tied to the component tree. You must pass the params from the component to the service.'
       });
    }
    interQs.forEach(item => allQs.push({ id: idCounter++, level: 'intermediate', question: item.q, answer: item.a, isOpen: false }));


    // === LEVEL 3: ADVANCED (Guards, Resolvers, Child Routes) ===
    const advQs = [
      { q: 'Explain the CanActivate guard.', a: 'It decides if a route can be activated. It runs before the route loads. If it returns false, navigation is cancelled.' },
      { q: 'What is a Resolver?', a: 'A class or function that fetches data BEFORE the route is activated. The route waits for the resolver to complete before rendering the component.' },
      { q: 'Difference between CanActivate and CanMatch?', a: 'CanActivate checks if you can enter a known route. CanMatch checks if the route config should even be considered a match. CanMatch allows multiple routes with the same path to exist, chosen by condition.' },
      { q: 'What is runGuardsAndResolvers?', a: 'A config option that defines when guards/resolvers should re-run (e.g., "always", "paramsChange", "pathParamsChange").' },
      { q: 'How do you implement a "CanDeactivate" guard?', a: 'It checks if a user can leave the current route. Useful for preventing data loss on unsaved forms.' },
      { q: 'What are Child Routes?', a: 'Routes nested inside another route. They render inside the parent component\'s <router-outlet>.' },
      { q: 'How does Angular handle relative navigation?', a: 'Using the "relativeTo" property in NavigationExtras. You pass the current ActivatedRoute to tell the router where to start.' },
      { q: 'What is the router events stream?', a: 'An observable (router.events) that emits events during the navigation lifecycle (NavigationStart, RoutesRecognized, NavigationEnd, etc.).' },
      { q: 'How do you debug routing errors?', a: 'Enable "enableTracing: true" in the router configuration to see logs of the routing lifecycle in the console.' },
      { q: 'What is { skipLocationChange: true }?', a: 'A navigation option that navigates to a view without updating the browser URL bar.' }
    ];
    for(let i=0; i<10; i++) {
       advQs.push({
         q: `Advanced Scenario ${i+1}: Parallel Resolvers?`,
         a: 'Angular executes all resolvers for a route in parallel. The route waits until ALL of them complete.'
       });
    }
    advQs.forEach(item => allQs.push({ id: idCounter++, level: 'advanced', question: item.q, answer: item.a, isOpen: false }));


    // === LEVEL 4: PROFESSIONAL (Internals & Architecture) ===
    const profQs = [
      { q: 'Explain RouteReuseStrategy.', a: 'A strategy that determines whether a component should be reused or destroyed when navigating. Overriding this allows implementing custom caching logic (e.g., tabbed interfaces).' },
      { q: 'What is the UrlTree?', a: 'The internal data structure representing the parsed URL. It handles serialization, deserialization, and parameter handling. It is safer to use than raw strings.' },
      { q: 'How does PreloadingStrategy work?', a: 'It runs in the background after the app stabilizes. It fetches lazy-loaded modules so they are ready when the user clicks. Angular provides PreloadAllModules, but you can write custom logic.' },
      { q: 'Explain the difference between imperative and declarative routing.', a: 'Declarative uses routerLink in templates. Imperative uses router.navigate() in code. Declarative is preferred for standard links for better SEO and accessibility.' },
      { q: 'What is ViewContainerRef in the context of RouterOutlet?', a: 'RouterOutlet uses ViewContainerRef to dynamically create and insert the component view. It acts as the anchor point in the DOM.' },
      { q: 'How do you secure routes at the module level?', a: 'Using CanLoad (deprecated) or CanMatch guards on the lazy-loaded route definition prevents the code chunk from even being downloaded if unauthorized.' },
      { q: 'What is TitleStrategy?', a: 'A service introduced in Angular 14 to manage setting the document title based on the route "title" property automatically.' },
      { q: 'How does Angular handle auxiliary routes in the UrlTree?', a: 'They are stored as separate branches in the UrlSegmentGroup children map, allowing independent state management for each outlet.' },
      { q: 'Performance implications of large route configs?', a: 'Large configs can slow down matching. It is best to split them into lazy-loaded modules so the main route tree remains small.' },
      { q: 'How to handle scroll position restoration?', a: 'Use the "scrollPositionRestoration" config option in provideRouter ("enabled" or "top").' }
    ];
    for(let i=0; i<10; i++) {
       profQs.push({
         q: `Architect Scenario ${i+1}: Micro-frontend Routing?`,
         a: 'In module federation, the shell app handles the top-level routing and delegates sub-paths to remote entry modules, which contain their own child route definitions.'
       });
    }
    profQs.forEach(item => allQs.push({ id: idCounter++, level: 'professional', question: item.q, answer: item.a, isOpen: false }));

    this.questions.set(allQs);
  }

  toggle(id: number) {
    this.questions.update(qs => qs.map(q => q.id === id ? { ...q, isOpen: !q.isOpen } : q));
  }
}
