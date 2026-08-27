# 🤖 AI-Assisted Development Playbook

> **A practical methodology for turning ideas into working prototypes with AI coding tools.**

This repository documents the workflow, prompting techniques, and development practices I use when building applications with AI coding tools such as **Claude, ChatGPT, Gemini, and Codex-style models**.

The goal isn't to write the "perfect prompt."

The goal is to use AI effectively throughout the development process while maintaining **clear requirements, technical judgment, controlled iteration, and a working understanding of the system being built.**

---

## 🧭 Why This Exists

AI coding tools make it possible to go from an idea to a working prototype much faster.

But faster generation doesn't automatically mean better software.

Without clear requirements and an iterative process, AI can easily:

* misunderstand the intended user experience
* introduce unnecessary complexity
* overwrite working functionality
* add dependencies that aren't needed
* make too many changes at once
* solve the wrong problem
* produce code that looks correct but doesn't behave correctly

This playbook is my attempt to document the practices that have worked well through hands-on experimentation and building small applications with AI.

---

# 🔄 The Workflow

My general process is:

**Idea → Refine → Design → Build → Validate → Iterate**

### 01 · Brain-dump the idea

Start with the problem rather than the technology.

Write down:

* What problem are you solving?
* Who is the user?
* What should the tool accomplish?
* What does the ideal workflow look like?
* What constraints matter?

Don't worry about writing a perfect prompt yet.

Capture the idea first.

---

### 02 · Refine the idea with AI

Use an AI assistant to turn rough notes into structured requirements.

Ask it to help clarify:

* the goal
* target users
* core features
* user flow
* edge cases
* technical constraints
* possible implementation approaches

The AI can help organize the thinking before it starts generating code.

---

### 03 · Design before building

Before asking the coding tool to generate everything, define the basic structure.

For example:

```text
Project
│
├── Goal
├── Users
├── Core Features
├── User Flow
├── UI Layout
├── Technical Constraints
├── Functionality Rules
└── Output Requirements
```

For more complex applications, ask the AI to briefly explain the proposed architecture before implementation.

---

### 04 · Build with an AI coding tool

Send the refined requirements to the coding tool.

For simple prototypes, I often prefer keeping the initial implementation lightweight.

Example:

```text
Build a complete working prototype.

Use:
- HTML
- CSS
- Vanilla JavaScript

Constraints:
- Single-file application
- No backend
- No external APIs
- No unnecessary dependencies
- Responsive layout
- Clean and readable code

Prioritize:
1. Core functionality
2. Simplicity
3. Usability
4. Visual polish
```

The exact technology will depend on the problem.

The principle remains the same:

> **Give the AI enough context to make good decisions without unnecessarily increasing complexity.**

---

### 05 · Validate the result

Don't assume generated code works because it looks correct.

Run the application.

Click through the workflow.

Test the important interactions.

Ask:

* Does it solve the original problem?
* Does the user flow make sense?
* What works?
* What doesn't?
* What feels confusing?
* What should be simplified?

For small prototypes, a quick hands-on review can reveal more than another long prompt.

---

### 06 · Iterate deliberately

If something needs to change, make controlled changes.

Instead of:

> "Fix everything and redesign the whole app."

Try:

> "Keep the existing functionality intact. Fix the timezone conversion issue described below."

Then test again.

A useful loop is:

```text
Observe
   ↓
Identify the issue
   ↓
Describe the desired change
   ↓
Make a small change
   ↓
Test
   ↓
Repeat
```

---

# 🧠 Prompting Principles

## 1. Think Like a Product Specification

Weak:

```text
make a cute timezone app
```

Better:

```text
Create a timezone meeting planner.

Goal:
Help users find overlapping meeting times across different timezones.

Core Features:
- Select timezone
- Add participants
- Convert meeting times
- Highlight overlapping working hours

Constraints:
- Single HTML file
- Vanilla JavaScript
- No external APIs

UI:
Soft, calm, minimal, and easy to understand.
```

A good prompt gives the AI a **problem, context, requirements, and boundaries**.

---

## 2. Describe the User, Not Just the Feature

Instead of:

> Add a timezone picker.

Describe the interaction:

> The user selects their timezone from a dropdown before adding participants.

This gives the AI more context about how the feature fits into the overall experience.

---

## 3. Be Specific About Constraints

AI coding tools often fill in missing requirements themselves.

Explicit constraints reduce unnecessary decisions.

Examples:

```text
Use only HTML, CSS, and vanilla JavaScript.
No frameworks.
No external libraries.
No backend.
No external APIs.
Keep the implementation simple.
```

Constraints can prevent overengineering.

---

## 4. Describe the Feeling of the Interface

"Make it modern" is usually too vague.

Instead describe the visual direction:

```text
Soft and calming
Minimal interface
Rounded corners
Gentle shadows
Clear visual hierarchy
Comfortable spacing
Avoid corporate dashboard aesthetics
Avoid excessive animation
```

You can describe both **what you want** and **what you don't want**.

---

## 5. Define the User Flow

Features tell the AI *what exists*.

A user flow explains *how everything connects*.

Example:

```text
1. User selects their timezone.
2. User adds participants.
3. User selects a date.
4. User selects a meeting time.
5. System converts the time.
6. Results are displayed.
7. Suitable overlapping times are highlighted.
```

This can help prevent disconnected features.

---

## 6. Tell the AI What NOT to Do

This is one of the most useful techniques when working with AI coding tools.

Examples:

```text
Do not overengineer the solution.

Avoid unnecessary abstractions.

Do not introduce a framework.

Do not add dependencies unless necessary.

Keep the existing implementation intact.

Do not rewrite unrelated functionality.
```

Sometimes defining boundaries is just as important as defining requirements.

---

## 7. Ask the AI to Plan Before Coding

For more complex tasks:

```text
Before writing code, briefly explain:
1. The proposed architecture
2. The main components
3. How data will flow
4. Any potential edge cases

Then generate the implementation.
```

This can expose problems before they become large implementation changes.

---

## 8. Build in Layers

Avoid trying to create the entire product at once.

A simple progression:

```text
V1 → Core functionality
V2 → UI improvements
V3 → UX improvements
V4 → Additional features
```

Get the core workflow working first.

Then improve it.

---

## 9. Make Changes Incrementally

When troubleshooting an existing application, avoid changing everything at once.

A practical rule:

> **Make one or a few related changes, then test.**

This makes it easier to identify what caused a regression.

---

## 10. Use AI as a Reviewer

AI can also be used after implementation.

Example:

```text
Review the current application for:

- Bugs
- Logic issues
- Unnecessary complexity
- Performance concerns
- UX problems
- Accessibility issues
- Opportunities to simplify the implementation

Do not rewrite the application yet.
First explain your findings and prioritize them.
```

This turns AI from a generator into a **review and analysis partner**.

---

# 🔍 Troubleshooting & Iteration

## Give the AI Evidence

When something breaks, provide the actual information available.

Instead of:

> "It doesn't work."

Provide:

```text
Expected:
The selected timezone should update the meeting time.

Actual:
The displayed time remains unchanged.

Error:
[Paste exact error message]

Recent change:
I modified the timezone conversion function.
```

The more useful evidence the AI has, the less it needs to guess.

---

## Preserve Working Versions

Before making significant changes, preserve a known-good version.

For simple prototypes:

```text
app-v1.html
app-v2.html
app-v3.html
```

For larger projects, use Git.

The principle is:

> **Keep experiments reversible.**

A working version is valuable context.

---

## Improve Without Rewriting Everything

When modifying an existing application, explicitly protect working functionality.

Example:

```text
Improve the UI while keeping the existing functionality intact.

Do not rewrite the entire application.

Only modify the components necessary for the requested improvement.
```

This can help reduce unnecessary regressions.

---

# 🏗️ AI + Technical Judgment

AI-generated code should be treated as a **proposed implementation**, not automatically correct.

A useful mindset is:

```text
AI generates
     ↓
I inspect
     ↓
I test
     ↓
I question
     ↓
I decide
```

AI can help with:

* exploration
* implementation
* debugging
* refactoring
* UX ideas
* documentation
* code review

But the person building the system still needs to decide:

* Is this actually solving the problem?
* Is the architecture appropriate?
* Is the implementation unnecessarily complex?
* Does the behavior match the requirements?
* Are there privacy or security concerns?
* Should this feature exist at all?

> **AI accelerates development. It doesn't replace technical judgment.**

---

# 🧩 A Reusable Prompt Formula

A general-purpose structure I often use:

```text
PROJECT NAME

GOAL
What problem are we solving?

USER
Who is this for?

CORE FEATURES
What must the application do?

USER FLOW
How does the user interact with it?

UI LAYOUT
What should the interface contain?

DESIGN STYLE
What should it look and feel like?

TECHNICAL CONSTRAINTS
What technologies should or should not be used?

FUNCTIONALITY RULES
What specific behaviors must happen?

OUTPUT REQUIREMENTS
What should the AI generate?

PRIORITIES
What matters most?
```

The exact structure can change.

The important part is providing enough context for the AI to understand **what success looks like**.

---

# 🧪 Reusable Prompt Patterns

### UI Polish

```text
Improve the visual hierarchy, spacing, typography, and interaction states.

Keep the existing functionality intact.

Avoid adding unnecessary UI elements.
```

### Simplification

```text
Review the current implementation and identify unnecessary complexity.

Suggest simpler approaches before making changes.

Prioritize readability and maintainability.
```

### Mobile-Friendly

```text
Make the interface responsive across desktop and mobile.

Prioritize touch-friendly controls, readable text, and sensible spacing.

Do not change the underlying functionality.
```

### Code Review

```text
Review the current implementation for:

- Bugs
- Logic issues
- Unnecessary complexity
- Maintainability
- Performance
- Accessibility

Explain the issues first.

Do not modify the code until I approve the changes.
```

---

# 🧰 Tools

The workflow can be adapted to different AI tools.

| Tool                         | Typical Use                                       |
| ---------------------------- | ------------------------------------------------- |
| **ChatGPT**                  | Brainstorming, requirements refinement, analysis  |
| **Gemini**                   | Idea refinement, research, alternative approaches |
| **Claude**                   | AI-assisted application development and iteration |
| **Codex-style coding tools** | Code generation, modification, debugging          |
| **Git / GitHub**             | Version control and project history               |

The specific tool matters less than the workflow.

> **Use the tool that has the right context and capabilities for the current stage of the problem.**

---

# 📚 Recommended Workflow

For a new project:

```text
Idea
 ↓
Brain Dump
 ↓
Requirements
 ↓
User Flow
 ↓
Architecture
 ↓
Prompt
 ↓
Prototype
 ↓
Test
 ↓
Review
 ↓
Iterate
 ↓
Validate
 ↓
Share
```

For an existing project:

```text
Analyze Current State
 ↓
Identify Issue
 ↓
Define Desired Change
 ↓
Make Small Change
 ↓
Test
 ↓
Review
 ↓
Repeat
```

---

# 💡 Lessons I've Learned

Through building and experimenting with AI coding tools, a few principles consistently stand out:

### Start with the problem.

Technology should serve the problem, not the other way around.

### Keep the scope realistic.

A small working prototype is more useful than an ambitious broken one.

### Give AI boundaries.

Constraints help prevent unnecessary complexity.

### Test what AI generates.

Generated code is not automatically correct.

### Change things incrementally.

Small changes make debugging easier.

### Preserve working states.

Experiments should be reversible.

### Use AI for thinking as well as coding.

AI can help explore requirements, UX, architecture, and implementation options.

### Don't chase the perfect prompt.

Good prompting is iterative:

**Prompt → Observe → Evaluate → Adjust → Repeat**

---

# 🌱 The Goal

The goal of AI-assisted development isn't to remove the human from the development process.

It's to reduce the friction between:

**"I have an idea."**

and

**"I built something that works."**

AI can make the distance between those two points much smaller.

The human still provides the **problem, context, priorities, judgment, and direction.**

---

## About This Playbook

This playbook is based on my own experimentation building small applications, prototypes, automation concepts, and systems with AI coding tools.

The documentation and wording may be refined with AI assistance, but the workflows and principles are based on practical experimentation and iteration.

**Build small. Learn quickly. Iterate deliberately.**

---

### Related

* 🌐 [Twine — Timezone Meeting Planner](https://github.com/weiss-lytics/Systems-Labs/tree/main/twine)
* 📐 [Kiri — Blueprint & Idea Mapping](https://github.com/weiss-lytics/Systems-Labs/tree/main/kiri)
* 🧪 [Systems Lab](https://github.com/weiss-lytics/Systems-Labs)
