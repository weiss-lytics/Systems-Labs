# 🧠 AI Development

> A practical collection of frameworks, workflows, and prompt patterns for AI-assisted product development.

This folder documents how I use AI coding tools to move from **idea → requirements → prototype → validation → iteration**.

It is based on hands-on experimentation building small applications, prototypes, workflow tools, and systems with AI-assisted development.

The focus is not on generating code as quickly as possible.

The focus is on using AI while maintaining:

- Clear problem definition
- Product thinking
- UX awareness
- Technical constraints
- Controlled iteration
- Testing and validation
- Technical judgment
- Documentation

---

## 🧭 What This Folder Covers

The documentation is organized into three layers:

```text
                    AI DEVELOPMENT
                          │
            ┌─────────────┼─────────────┐
            ↓             ↓             ↓
        HOW I THINK   HOW I WORK   HOW I PROMPT
            │             │             │
            ↓             ↓             ↓
   Product Engineering   AI-Assisted   Prompt Patterns
         Loop            Playbook       & Templates
````

Each document answers a different question.

| Document                             | Purpose                                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| **Product Engineering Loop**         | How I approach building products and systems                 |
| **AI-Assisted Development Playbook** | How I incorporate AI into the development process            |
| **AI Prompt Patterns & Templates**   | How I structure prompts and communicate with AI coding tools |

---

# 🌸 01 — Product Engineering Loop

**From idea → system → prototype → product.**

The **Product Engineering Loop** is my broader framework for turning problems and ideas into usable digital products.

It combines:

* Product thinking
* UX / design
* Systems thinking
* Analytics
* Prototyping
* Software development
* Validation
* Documentation

The loop is:

```text
Discover
   ↓
Model
   ↓
Prototype
   ↓
Build
   ↓
Validate
   ↓
Iterate
   ↓
Engineer
   ↓
Ship
   ↓
Document
   ↺
```

The framework emphasizes **building to learn**, validating ideas before over-engineering them, and allowing the technology to be determined by the problem.

📄 **Read:** [`product-engineering-loop.md`](./ai-development/product-engineering-loop.md)

---

# 🤖 02 — AI-Assisted Development Playbook

**How I use AI during development.**

This playbook focuses specifically on the workflow of building applications with AI coding tools.

It covers:

* Idea refinement
* Requirements
* User flows
* Prompt design
* AI-assisted implementation
* Testing
* Debugging
* Incremental iteration
* Code review
* Version preservation
* Technical judgment

The basic workflow is:

```text
Idea
 ↓
Refine
 ↓
Design
 ↓
Build
 ↓
Validate
 ↓
Iterate
```

The key principle is:

> **AI generates. I inspect. I test. I question. I decide.**

AI is treated as a development partner rather than an unquestionable source of truth.

📄 **Read:** [`ai-assisted-development-playbook.md`](./ai-development/ai-assisted-development-playbook.md)

---

# 🧩 03 — AI Prompt Patterns & Templates

**Practical patterns for communicating with AI coding tools.**

This document contains reusable prompt structures for common development tasks.

Examples include:

* App building
* Iteration
* Feature expansion
* Debugging
* UI/UX improvement
* Architecture planning
* Code review
* Edge-case analysis
* Simplification
* Scope control

It also includes reusable prompt snippets for:

* Preserving existing functionality
* Keeping implementations simple
* Analyzing before modifying
* Debugging with evidence
* Planning before coding
* UI polish
* Incremental changes
* Security and privacy checks

The goal is not to create the longest possible prompt.

The goal is to provide the **right context, constraints, and expectations for the task.**

📄 **Read:** [`ai-prompt-patterns.md`](./ai-development/ai-prompt-patterns.md)

---

# 🧠 The Overall Philosophy

These documents are connected.

```text
PRODUCT THINKING
      ↓
What problem are we solving?
      ↓
PRODUCT ENGINEERING LOOP
      ↓
How should we approach building it?
      ↓
AI-ASSISTED DEVELOPMENT
      ↓
Where can AI help?
      ↓
PROMPT PATTERNS
      ↓
How should we communicate the task?
      ↓
BUILD
      ↓
TEST
      ↓
REVIEW
      ↓
ITERATE
      ↓
LEARN
```

AI is only one part of the process.

The human remains responsible for understanding the problem, defining priorities, evaluating trade-offs, and deciding what should ultimately be built.

---

# 🛠️ Tools

The workflow can be adapted across different AI tools.

| Tool                         | Typical Use                                           |
| ---------------------------- | ----------------------------------------------------- |
| **ChatGPT**                  | Brainstorming, requirements refinement, analysis      |
| **Gemini**                   | Exploration, research, alternative approaches         |
| **Claude**                   | AI-assisted application development and iteration     |
| **Codex-style coding tools** | Code generation, modification, debugging              |
| **Git / GitHub**             | Version control, experimentation, and project history |

The tool is less important than understanding **when and how to use it**.

---

# 🔬 What I Practice Through These Workflows

AI-assisted development gives me an opportunity to practice several areas simultaneously:

### Product Thinking

* Problem definition
* User needs
* Feature prioritization
* Scope control
* Product validation

### UX / Design

* User flows
* Information architecture
* Interaction design
* Visual hierarchy
* Usability

### Technical Thinking

* Architecture
* Data structures
* Technical constraints
* Debugging
* Refactoring
* Performance
* Security and privacy

### Analytics Thinking

* Data quality
* Measurement
* Validation
* System behavior
* Evidence-based decision making

### AI-Assisted Development

* Prompt design
* Requirements translation
* AI-assisted implementation
* Iterative development
* AI-assisted code review
* AI-assisted debugging

---

# 🎯 A Few Principles I Keep Coming Back To

### Start with the problem.

Technology should serve the problem.

### Control the scope.

A prototype should solve one main problem well before expanding.

### Give AI boundaries.

Constraints help prevent unnecessary complexity.

### Build incrementally.

Small changes are easier to understand, test, and reverse.

### Test what AI generates.

Generated code is not automatically correct.

### Preserve working states.

Experiments should remain reversible.

### Use AI for analysis, not just generation.

AI can help identify issues, explore alternatives, and challenge assumptions.

### Keep systems understandable.

Complexity should be earned by actual requirements.

### Document the thinking.

The reasoning behind a system is often as valuable as the implementation itself.

---

# 🌱 Why I Document This

I started experimenting with AI-assisted development to make it easier to turn ideas into working prototypes.

Over time, the process became more than simply:

```text
Prompt → Code
```

It became:

```text
Problem
   ↓
Understand
   ↓
Model
   ↓
Prototype
   ↓
Build
   ↓
Test
   ↓
Analyze
   ↓
Iterate
   ↓
Engineer
   ↓
Document
```

These documents capture that evolution.

They are both a **working reference** and a record of what I am learning through building.

---

# 🧪 Example Projects

These practices are applied across projects in the Systems Lab.

| Project          | What It Explores                             |
| ---------------- | -------------------------------------------- |
| **Twine**        | Timezone logic, UX, client-side systems      |
| **Kiri**         | Product thinking, information architecture   |
| **Shiori**       | State management, local-first UX             |
| **Michi**        | Interaction design, productivity             |
| **Kiro**         | Local processing, privacy-first architecture |
| **Sora**         | Educational systems, SQL learning            |
| **Money Garden** | Data modeling, analytics, automation         |

The projects differ in purpose and technology.

The underlying approach remains:

> **Understand → Model → Prototype → Build → Validate → Iterate.**

---

# 📚 Documentation Map

If you're new to this folder, start here:

### 🧭 Want to understand my overall approach?

→ [`product-engineering-loop.md`](./ai-development/product-engineering-loop.md)

### 🤖 Want to understand how I use AI while building?

→ [`ai-assisted-development-playbook.md`](./ai-development/ai-assisted-development-playbook.md)

### 🧩 Want practical prompts and templates?

→ [`ai-prompt-patterns.md`](./ai-development/ai-prompt-patterns.md)

---

# ♻️ The Loop Continues

The frameworks here are not meant to be fixed rules.

They evolve as I:

* Build more projects
* Encounter new technical problems
* Test different AI workflows
* Discover better approaches
* Learn from failures
* Refine my process

> **Build something. Learn from it. Improve it. Repeat.**

---

## 🌸 About

This documentation represents my personal approach to **AI-assisted product development and rapid prototyping**.

The wording and documentation may be refined with AI assistance, but the workflows, experiments, decisions, and lessons come from hands-on practice.

**AI helps me move faster.
I still decide where to go.**
