# 🧠 AI Prompt Patterns & Templates

> A practical collection of prompt structures, patterns, and reusable snippets for working with AI coding tools.

This document contains the prompt patterns I use when working with AI-assisted development tools such as **Claude, ChatGPT, Gemini, and Codex-style coding models**.

The goal is not to create the "perfect prompt."

The goal is to give AI enough **context, requirements, constraints, examples, and expectations** to produce a useful result while keeping the human in control of the development process.

---

# 🧠 Core Principle

## Treat AI as a capable junior developer.

Not a magician.  
Not a search engine.  
Not an unquestionable authority.

AI can help with:

- Exploration
- Planning
- Prototyping
- Implementation
- Debugging
- Refactoring
- UX exploration
- Code review
- Documentation

The human still provides:

- Problem definition
- Requirements
- Priorities
- Context
- Technical judgment
- Validation
- Final decisions

> **AI accelerates the development process. It does not replace the person responsible for the system.**

A useful mental model is:

```text
Human defines the problem
        ↓
AI helps explore the solution
        ↓
AI proposes an implementation
        ↓
Human reviews and tests
        ↓
AI helps refine
        ↓
Human decides what ships
````

---

# 🧩 The Prompt Structure

A strong development prompt does not need every section below.

Use the sections that are relevant to the task.

```text
ROLE

GOAL

CONTEXT
- Who is this for?
- What problem does it solve?
- What platform is being used?

REQUIREMENTS
- What must the system do?

USER FLOW
- How does the user interact with it?

UX REQUIREMENTS
- How should the experience feel?

TECHNICAL CONSTRAINTS
- Technologies
- Libraries
- APIs
- Architecture limitations

FUNCTIONALITY RULES
- Specific behaviors
- Logic
- Edge cases

OUTPUT REQUIREMENTS
- What should the AI produce?

PRIORITIES
- What matters most?
```

The exact structure can change.

The important part is making the **problem, expectations, and boundaries clear**.

---

# 01 — 🧩 App Builder

Use this when starting a new application or prototype.

## Template

```text
You are a senior product engineer and UX designer.

GOAL:
Build [describe what you want to create].

CONTEXT:
Who is this for:
[describe the user]

Problem:
[describe the problem]

Platform:
[web app / browser tool / mobile-friendly web app / etc.]

FEATURES:
1. [feature]
2. [feature]
3. [feature]

UX REQUIREMENTS:
- Simple and intuitive
- Mobile-friendly
- Clear visual hierarchy
- [specific design direction]

TECHNICAL CONSTRAINTS:
- Use [technology]
- No [framework/library/API]
- [other constraints]

FUNCTIONALITY:
- [specific behavior]
- [specific logic]
- [edge cases]

OUTPUT:
- Generate a complete working prototype
- Keep the code readable and maintainable
- Comment important logic
- Explain the implementation briefly after generating it

PRIORITIES:
1. Core functionality
2. Simplicity
3. Usability
4. Visual polish
```

## Example

```text
You are a senior product engineer and UX designer.

Build a simple daily mood and habit tracker.

GOAL:
Help users record daily mood, notes, and habits and review their progress over a week.

TECH:
- HTML
- CSS
- Vanilla JavaScript
- Local Storage
- No external libraries
- No external APIs
- Single HTML file

FEATURES:
- Add daily mood
- Add notes
- Track habits
- Weekly summary
- Persist data locally

UX:
- Minimal
- Calm
- Mobile-first
- Easy to understand
- Clear visual hierarchy

OUTPUT:
- Complete working prototype
- Clean and readable code
- Comment important logic

After generating the prototype, suggest three potential improvements.
```

---

# 02 — 🔄 Iteration

Use this when modifying an existing application.

The goal is to **improve the existing implementation instead of unnecessarily rebuilding it**.

## Template

```text
Review the existing implementation.

Make the following change:

[describe one specific change]

Requirements:
- Keep existing functionality intact
- Do not rewrite the application from scratch
- Do not modify unrelated components
- Keep the existing design language

After making the change:
- Explain what was modified
- Identify anything that should be tested
```

## Example

```text
Improve the existing timezone selector.

Requirements:
- Keep the current timezone conversion logic
- Do not rewrite the application
- Do not change unrelated UI components
- Improve the selector's usability on mobile

After making the change, explain what was modified and what should be tested.
```

---

# 03 — ➕ Feature Expansion

Use this when adding a new feature to an existing application.

## Template

```text
Add the following feature to the existing application.

FEATURE:
[describe feature]

REQUIREMENTS:
- Integrate with the existing architecture
- Preserve all current functionality
- Keep the existing UI consistent
- Avoid unnecessary dependencies
- Do not rewrite unrelated functionality

Before implementing:
Briefly explain how the feature will integrate with the current system.

After implementing:
Explain what changed and what should be tested.
```

## Example

```text
Add search and filtering to the existing task list.

FEATURE:
Allow users to search tasks by keyword and filter them by status.

REQUIREMENTS:
- Integrate with the existing task data
- Preserve current task creation and editing
- Keep the current UI style
- Do not introduce a framework
- Do not rewrite unrelated functionality

Before implementing, briefly explain how the feature will integrate with the existing system.
```

---

# 04 — 🐛 Debugging

Use this when something is not working.

The most important principle is:

> **Give the AI evidence instead of making it guess.**

## Template

```text
Analyze the following issue.

EXPECTED BEHAVIOR:
[what should happen]

ACTUAL BEHAVIOR:
[what is happening]

ERROR:
[paste exact error message]

RECENT CHANGE:
[describe what changed]

CONTEXT:
[relevant code or information]

TASK:
1. Identify the likely cause
2. Explain why it is happening
3. Propose the smallest appropriate fix
4. Implement the fix

Do not rewrite unrelated parts of the application.
```

## Example

```text
Analyze the following issue.

EXPECTED:
Selecting a timezone should update the displayed meeting time.

ACTUAL:
The selected timezone changes, but the displayed time remains unchanged.

ERROR:
[paste console error]

RECENT CHANGE:
I modified the timezone conversion function.

TASK:
Identify the likely cause and propose the smallest appropriate fix.

Do not rewrite unrelated functionality.
```

---

# 05 — 🎨 UI/UX Improvement

Use this when the functionality already works and the goal is visual or interaction improvement.

## Template

```text
Improve the UI/UX of the existing application without changing its functionality.

Focus on:
- Spacing
- Typography
- Visual hierarchy
- Layout
- Responsive behavior
- Interaction states
- Accessibility

Design direction:
[describe the desired visual style]

Keep:
- Existing functionality
- Existing data flow
- Existing core interactions

Avoid:
- Unnecessary UI elements
- Excessive animations
- Unnecessary dependencies
- Complete rewrites

Make only the changes necessary to improve the experience.
```

---

# 06 — 🏗️ Architecture Planning

Use this before implementing a more complex feature or application.

## Template

```text
Before writing code, analyze the requirements and propose an architecture.

Explain briefly:

1. Main components
2. Data structures
3. State management
4. Data flow
5. Key dependencies
6. Important edge cases
7. Potential technical risks

Prioritize:
- Simplicity
- Maintainability
- Clear separation of responsibilities
- Appropriate technology choices

Do not generate the implementation yet.
```

Architecture planning is particularly useful when the project has multiple components, persistent data, APIs, authentication, or more complex state.

---

# 07 — 🔍 Code Review

Use AI as a second-pass reviewer rather than only as a code generator.

## Template

```text
Review the current implementation for:

- Bugs
- Logic issues
- Unnecessary complexity
- Maintainability
- Performance
- Accessibility
- Security and privacy concerns

For each issue:
- Explain the problem
- Explain why it matters
- Suggest an appropriate improvement

Prioritize the findings by importance.

Do not modify the code yet.
```

This separates **analysis from implementation**, making it easier to evaluate proposed changes before they are applied.

---

# 08 — 🧪 Edge Case Analysis

Use this before considering a feature complete.

## Template

```text
Analyze this application for potential edge cases.

Consider:

- Empty input
- Invalid input
- Missing data
- Unexpected user behavior
- Boundary values
- Duplicate data
- Network failures, if applicable
- Storage failures, if applicable
- Responsive behavior
- Accessibility

List the potential edge cases first.

For each one:
- Explain what could happen
- Explain the expected behavior
- Suggest how it should be handled

Do not modify the code yet.
```

---

# 09 — 🧹 Simplification

Use this when an implementation has become unnecessarily complicated.

## Template

```text
Review the current implementation for unnecessary complexity.

Look for:

- Redundant code
- Unnecessary abstractions
- Repeated logic
- Unused variables or functions
- Unnecessary dependencies
- Overly complicated state management
- Opportunities to simplify the data flow

For each suggestion:
- Explain the current approach
- Explain the simpler alternative
- Identify any trade-offs

Do not make changes until the proposed improvements have been reviewed.
```

---

# 🎯 Control Feature Scope

Before asking AI to build additional features, separate them by priority.

| Priority         | Purpose                                     |
| ---------------- | ------------------------------------------- |
| **Must Have**    | Required for the core workflow              |
| **Nice to Have** | Improves the experience but isn't essential |
| **Future**       | Interesting ideas for later iterations      |

This prevents AI-assisted projects from expanding beyond their original purpose.

A prototype should solve **one main problem well** before additional features are introduced.

A useful planning format:

```text
MUST HAVE
- Core workflow
- Essential functionality

NICE TO HAVE
- UX improvements
- Visual enhancements

FUTURE
- Advanced functionality
- Integrations
- Experimental ideas
```

Scope control is especially important when working with AI because it is often easy to keep adding features without validating whether the original problem has actually been solved.

---

# 🧠 Claude-Specific Observations

These observations come from practical experimentation rather than strict rules.

### 1. Give It Structure

Structured prompts generally make requirements easier for the model to follow.

```text
Goal
↓
Requirements
↓
Constraints
↓
Functionality
↓
Output
```

---

### 2. Preserve Existing Functionality

When modifying an existing project, explicitly protect working functionality.

Useful instruction:

```text
Do not rewrite the entire application.

Keep existing functionality intact.
Only modify the components necessary for this request.
```

---

### 3. Work Incrementally

Instead of requesting:

```text
Build the entire application,
add animations,
add storage,
add authentication,
optimize it,
and redesign everything.
```

Break the work into stages:

```text
1. Core functionality
2. Data persistence
3. UX improvements
4. Additional features
5. Optimization
```

Smaller changes make it easier to understand what caused a problem.

---

### 4. Provide Evidence

When troubleshooting, provide:

* Error messages
* Expected behavior
* Actual behavior
* Relevant code
* Recent changes
* Screenshots when useful

Evidence reduces the amount of guessing required.

---

### 5. Ask for Analysis Before Modification

For complex issues, separate analysis from implementation.

```text
Analyze the current implementation first.

Explain:
- What is working
- What is not working
- Likely causes
- Recommended changes

Do not modify the code yet.
```

This gives you an opportunity to review the proposed solution before changes are made.

---

# 🔁 Recommended AI Development Sequence

A practical sequence for building with AI is:

```text
1. Understand
       ↓
2. Plan
       ↓
3. Generate
       ↓
4. Test
       ↓
5. Review
       ↓
6. Iterate
       ↓
7. Refactor
```

The sequence does not have to be strictly linear.

You may return to earlier steps when new information appears.

For example:

```text
Build
 ↓
Test
 ↓
Discover assumption was wrong
 ↓
Return to requirements
 ↓
Adjust
 ↓
Build again
```

That is part of the development process.

---

# 🧩 Reusable Prompt Snippets

These are small building blocks that can be combined with the larger prompt patterns above.

## 🎯 Keep It Simple

```text
Keep the implementation simple and readable.

Avoid unnecessary abstractions, dependencies, and complexity.

Use the simplest approach that satisfies the requirements.
```

---

## 🛡️ Preserve Existing Functionality

```text
Keep all existing functionality intact.

Do not rewrite unrelated parts of the application.

Only modify the components necessary for this change.
```

---

## 🔍 Analyze Before Changing

```text
Before making changes, analyze the current implementation.

Identify:
- What is working
- What is not working
- What may be causing the issue
- What could be simplified

Do not modify the code yet.
```

---

## 🧪 Test Before Iterating

```text
Before making additional changes, verify the current implementation.

Check:
- Core functionality
- User interactions
- Edge cases
- Console errors
- Responsive behavior

Report any issues you find before proceeding.
```

---

## 🏗️ Plan Before Coding

```text
Before writing code, briefly explain:

- The proposed architecture
- The main components
- The data flow
- Important edge cases

Keep the proposed solution as simple as possible.
```

---

## 🎨 UI Polish

```text
Improve the UI without changing the underlying functionality.

Focus on:
- Spacing
- Typography
- Visual hierarchy
- Responsive behavior
- Interaction states

Keep the design clean, minimal, and easy to understand.
```

---

## 🧹 Simplify

```text
Review the current implementation for unnecessary complexity.

Identify opportunities to:
- Remove redundant code
- Simplify logic
- Reduce unnecessary abstractions
- Improve readability

Suggest changes before implementing them.
```

---

## 🐛 Debug With Evidence

```text
Analyze the issue using the evidence provided.

Expected behavior:
[describe expected behavior]

Actual behavior:
[describe actual behavior]

Error:
[paste error]

Recent change:
[describe recent change]

Identify the likely cause before proposing a fix.
```

---

## 🔄 Incremental Changes

```text
Make only this change:

[describe one change]

Do not modify unrelated functionality.

After making the change, explain what was modified and what should be tested.
```

---

## 🎯 Feature Scope

```text
Before implementing additional features, classify them as:

Must Have
Nice to Have
Future

Prioritize the core workflow and avoid expanding the scope unnecessarily.
```

---

## 🔐 Security & Privacy Check

```text
Review the implementation for obvious privacy and security concerns.

Check for:
- Unnecessary data collection
- Exposed credentials or secrets
- Unsafe data handling
- Unnecessary external requests
- Sensitive information exposed to the client

Do not modify the code yet.

Report findings first.
```

---

# 🧪 Combining Prompt Patterns

Prompt patterns are designed to be combined.

For example, a new application might use:

```text
APP BUILDER
+
KEEP IT SIMPLE
+
FEATURE SCOPE
+
MOBILE-FRIENDLY
```

A debugging task might use:

```text
DEBUGGING
+
ANALYZE BEFORE CHANGING
+
DEBUG WITH EVIDENCE
+
PRESERVE EXISTING FUNCTIONALITY
```

A UI improvement might use:

```text
UI/UX IMPROVEMENT
+
PRESERVE EXISTING FUNCTIONALITY
+
KEEP IT SIMPLE
+
INCREMENTAL CHANGES
```

The goal is not to make every prompt longer.

The goal is to provide the **right context for the task**.

---

# 💡 Prompting Principles

Good prompting generally comes down to:

```text
Clear Goal
     +
Relevant Context
     +
Specific Requirements
     +
Useful Constraints
     +
Expected Behavior
     +
Defined Output
     +
Human Review
```

A prompt does not need to be extremely long.

A short prompt with the right information can be more effective than a long prompt containing unnecessary detail.

---

# 🚀 Practical Workflow

When building a small application with an AI coding tool:

```text
1. Brain-dump the idea
        ↓
2. Define the problem
        ↓
3. Control feature scope
        ↓
4. Structure the requirements
        ↓
5. Ask AI to plan when needed
        ↓
6. Generate the prototype
        ↓
7. Test the result
        ↓
8. Analyze problems
        ↓
9. Make small changes
        ↓
10. Review the implementation
        ↓
11. Refactor where necessary
        ↓
12. Validate the final result
```

The important part is that **AI generation is only one step in the process**.

---

# 📚 Prompt Library Philosophy

Over time, useful prompt patterns can become a personal toolkit.

Save patterns that repeatedly help with:

* UI design
* Architecture
* Debugging
* Refactoring
* Scope control
* Security reviews
* Accessibility
* Testing
* Documentation

Instead of trying to remember the perfect wording every time, build a library of **reusable patterns that can be adapted to different projects.**

The library should evolve through experimentation.

---

# 🌱 Final Principle

Don't chase the perfect prompt.

Good AI-assisted development is usually:

```text
Prompt
  ↓
Observe
  ↓
Evaluate
  ↓
Adjust
  ↓
Test
  ↓
Repeat
```

The skill is not simply knowing what to ask AI.

It is knowing:

**what to ask, why to ask it, what to verify, and when not to use the generated solution.**

> **Build with AI. Think for yourself. Test everything that matters.**
