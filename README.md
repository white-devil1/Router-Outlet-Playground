<div align="center">

# 🧭 Angular RouteMaster
### The Interactive Routing Academy

![Angular Version](https://img.shields.io/badge/Angular-v18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Stack-TypeScript_|_Tailwind_|_Signals-007ACC?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A visual, interactive playground designed to demystify Single Page Application (SPA) routing.**

[**Launch Application**](https://your-project.web.app) · [Report Bug](https://github.com/your-repo/issues)

</div>

---

## 📖 Introduction (Start Here)

### For Non-Technical Learners & Students
Welcome! If you are new to web development, think of this application as a **Digital House**.

*   **The Problem:** In old websites, every time you clicked a link, the screen would flash white, and the computer had to rebuild the entire house from scratch. It was slow.
*   **The Solution (Angular Routing):** Imagine a house with a **Magic Picture Frame** on the wall. When you click a button (like "Kitchen" or "Bedroom"), the house stays still. The walls don't move. Only the *picture inside the frame* changes instantly.
    *   This app allows you to press buttons and watch that "Magic Frame" (called a **Router Outlet**) change in real-time.
    *   It also visualizes complex ideas like "Picture-in-Picture" (Secondary Outlets) and "Security Guards" (Route Guards).

### For Developers & Engineers
**Angular RouteMaster** is a reference architecture for modern Angular development. It demonstrates:
*   **Zoneless Architecture:** Runs without `zone.js` for maximum performance.
*   **Signal-Based State:** Uses Angular Signals (`signal`, `computed`, `effect`) for reactive data flow.
*   **Router Features:** Visualizes `UrlTree` serialization, Named Outlets, Lazy Loading concepts, and Route Guards.
*   **Accessibility:** Includes Text-to-Speech (Web Speech API) for all lessons.

---

## 🎮 User Manual: How to Use

### 1. The Playground (The Classroom)
When you enter the app, you see the **Playground**.
*   **The URL Bar (Top):** This is a *simulation* of a browser address bar. Watch how it changes when you click buttons. It visualizes how Angular "reads" the URL (e.g., `/home(left:menu)`).
*   **The Primary Outlet (Center):** This is the main screen. Clicking **Home**, **Dash**, or **Set** changes the content here.
*   **Simulator Controls:**
    *   **ID Buttons:** Click "User 1" or "User 99". Notice the page layout stays the same, but the data changes. This teaches **Route Parameters**.
    *   **Err Link:** Clicking this simulates a broken link, triggering the **Wildcard (404)** route.
*   **Side Outlets (Left/Right):** Click the icons (🍔 Menu, 📢 Ads) to open panels *next* to the main content. This teaches **Named Outlets**.

### 2. The Assessment Engine
*   **Quiz Mode:** Accessible via the sidebar. It hides the playground and presents questions based on your selected difficulty level.
*   **Interview Mode:** A curated list of common job interview questions. Click a question to reveal the answer with code snippets.

### 3. Settings & Accessibility
*   **Language:** On the landing page, choose between English, Hindi, or Malayalam.
*   **Speech:** Click the Speaker icon 🔈 in the header to have the "Teacher" read the lesson to you.
*   **Code View:** Click the `{ } Code` button to see the actual Angular code snippet for the current lesson.

---

## 📂 Project Structure & File Guide

This project follows a strict **Standalone Component** architecture. Here is what every file does:

### Root Directory
*   `index.tsx`: **The Entry Point.** This file bootstraps the Angular application. It contains the **Master Route Configuration** (`routes` array), defining how URLs map to components.
*   `index.html`: The HTML shell. It loads Tailwind CSS and sets the viewport.
*   `metadata.json`: Specific configuration for the web container/applet environment.

### `src/app.component.ts` (The Shell)
This is the "Frame" of the house.
*   **Responsibility:** It handles the global layout (Sidebar + Main Content Area).
*   **Key Logic:** It listens to `Router.events` to update the fake address bar at the top. It also manages the global animations (the flowing background).

### `src/components/` (The UI Bricks)
*   **`pages.component.ts`**: Contains the "Pages" users visit (`Home`, `Dashboard`, `Settings`, `User`, `NotFound`). These are kept simple to focus on routing behavior.
*   **`side-components.ts`**: Contains the small widgets (`Menu`, `Ads`, `Notes`) that load into the *side* outlets.
*   **`quiz.component.ts`**: The engine that renders the interactive exams. It handles user input, scoring, and confetti animations.
*   **`interview.component.ts`**: Renders the accordion-style Q&A section. It uses `[innerHTML]` to safely render code blocks inside answers.
*   **`landing.component.ts`**: The first screen users see. It handles Level selection (Beginner -> Architect) and Language selection.

### `src/services/` (The Brains)
All business logic lives here. Services are singletons (`providedIn: 'root'`).
*   **`tutorial.service.ts`**: **The CMS.** It contains all the text, translations, and code snippets for every lesson. It uses a `computed` signal to return the correct content based on the user's difficulty level.
*   **`quiz.service.ts`**: **The Game Logic.** Manages the state of the active quiz (current question, score, correct/incorrect logic). It includes a "Fuzzy Matcher" for checking code answers.
*   **`speech.service.ts`**: **The Voice.** A wrapper around the browser's `window.speechSynthesis` API. It dynamically changes accents based on the selected language (e.g., using a Hindi voice for Hindi text).
*   **`language.service.ts`**: A simple state holder for the currently selected language code (`en`, `hi`, `ml`).

---

## 🏗️ Technical Deep Dive

### Routing Strategy
The routing configuration in `index.tsx` demonstrates several advanced concepts:

```typescript
const routes: Routes = [
  // 1. Redirection: Automatically fixes empty URLs
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 2. Parameterization: ':id' captures any value (1, 99, abc)
  { path: 'user/:id', component: UserPageComponent },

  // 3. Named Outlets: These load INDEPENDENTLY of the main page.
  // URL: /home(left:menu)
  { path: 'menu', component: MenuSidebarComponent, outlet: 'left' },
  
  // 4. Wildcard: The "Catch-All" for 404s. Must be last.
  { path: '**', component: NotFoundComponent }
];
```

### State Management (Signals)
We avoid `RxJS` for synchronous state, preferring **Angular Signals**:
*   **`tutorial.currentStep()`**: A signal holding the active lesson.
*   **`parsedUrl()`**: A `computed` signal in `AppComponent` that parses the router's string URL into a JSON object to display in the visual address bar.

### CSS Architecture
*   **Framework:** Tailwind CSS.
*   **Theme:** "Dark Space Flow".
*   **Animation:** We use standard CSS keyframes (`@keyframes`) defined in the Component metadata for performance, avoiding the heavy `@angular/animations` package.

---

## 🛠️ Installation & Development

To run this project locally:

1.  **Prerequisites:** Node.js v18+ installed.
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm start
    ```
4.  **Build for Production:**
    ```bash
    npm run build
    ```

---

<div align="center">
  <sub>Built with ❤️ using Angular 18+.</sub>
</div>