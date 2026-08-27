# 🌸 Product Engineering Loop

> **From idea → system → prototype → product.**

The **Product Engineering Loop** is my personal framework for turning ideas, problems, and observations into usable digital products.

It evolved from a traditional **design → development → deployment** workflow into a more iterative process that combines:

**Product Thinking + UX + Systems Thinking + Analytics + Prototyping + AI-Assisted Development + Engineering + Documentation**

I don't treat the first version of an application as the final product.

I treat it as a way to **learn, validate assumptions, and improve the system.**

---

## 🧭 The Loop

```text
💡 DISCOVER
     ↓
🌸 MODEL
     ↓
🧪 PROTOTYPE
     ↓
🛠️ BUILD
     ↓
🔬 VALIDATE
     ↓
🔁 ITERATE
     ↓
🏗️ ENGINEER
     ↓
🚀 SHIP
     ↓
📝 DOCUMENT
     ↺
```

The process is intentionally iterative.

Not every project needs to go through every stage with the same level of depth. A small prototype may stop after validation, while a product intended for real users may continue through engineering and deployment.

---

# 01 — 💡 Discover

## Idea / Problem

Everything starts with a question, observation, frustration, or idea.

Before thinking about technology, I try to understand:

* What problem am I solving?
* Who experiences the problem?
* Why does it matter?
* Is this actually worth building?
* What would a useful solution look like?
* What assumptions am I making?

The goal is not to start coding immediately.

The goal is to understand **why the product should exist.**

> **Start with the problem, not the technology.**

---

# 02 — 🌸 Model

## Product Blueprint

Once the problem is clear, I translate the idea into a structured blueprint.

Depending on the project, this may include:

* Product vision
* Target users
* Core use cases
* Features
* Requirements
* User flows
* Constraints
* Data considerations
* Technical considerations
* Success criteria
* Future possibilities

The blueprint becomes the working context for design, prototyping, and development.

---

## 🎯 Control Feature Scope

Before building, I separate features into:

| Priority         | Purpose                                     |
| ---------------- | ------------------------------------------- |
| **Must Have**    | Required for the core workflow              |
| **Nice to Have** | Improves the experience but isn't essential |
| **Future**       | Interesting ideas for later iterations      |

This prevents AI-assisted and personal projects from expanding beyond their original purpose.

A prototype should solve **one main problem well** before additional features are introduced.

> **Scope is a design decision, not just a development limitation.**

---

## 🧠 Define the System Before the Code

For projects with more complex logic, I identify important system concepts early:

* Inputs
* Outputs
* Data structures
* User states
* Business rules
* Dependencies
* Edge cases
* Constraints

This helps turn a vague product idea into something that can actually be implemented and tested.

---

# 03 — 🧪 Prototype

## User Flow → Information Architecture → Interactive Prototype

Before committing heavily to implementation, I explore how the product should work.

Depending on the project, this can include:

* User flows
* Information architecture
* Wireframes
* Interaction design
* Design system decisions
* Interactive prototypes
* Technical experiments

The purpose is to answer:

> **Does this idea make sense when someone actually uses it?**

Not every idea needs a polished high-fidelity design before development.

The amount of design depends on the complexity and uncertainty of the product.

---

# 04 — 🛠️ Build

## Sandbox MVP

I build the smallest functional version that can prove the concept.

The implementation depends on the problem rather than forcing a particular technology.

For smaller tools, this may involve:

* HTML
* CSS
* Vanilla JavaScript
* Browser APIs
* Local Storage

For more complex products, the architecture may evolve toward:

* React
* APIs
* Databases
* Authentication
* Cloud services
* Automation
* Analytics pipelines

The principle is:

> **Use the simplest technology that appropriately solves the problem.**

The goal of the sandbox MVP is not to build the perfect architecture.

It is to create something **functional enough to learn from.**

---

# 🤖 AI-Assisted Development

AI coding tools can accelerate parts of the development process, but I treat them as **development partners rather than autonomous developers.**

My general AI-assisted workflow is:

```text
Brain Dump
    ↓
Requirement Refinement
    ↓
Structured Prompt
    ↓
AI Prototype / Implementation
    ↓
Review
    ↓
Test
    ↓
Analyze
    ↓
Iterate
```

I use AI tools for activities such as:

* Requirement refinement
* Product exploration
* UX exploration
* Architecture discussion
* Prototype generation
* Code generation
* Debugging
* Refactoring
* Code review
* Documentation

The important distinction is that AI generates suggestions and implementations.

**I still decide what should be built, how it should behave, and whether the implementation is appropriate.**

For more detail, see:

**[AI-Assisted Development Playbook](../ai-assisted-development-playbook/)**

---

# 05 — 🔬 Validate

## Test + Analyze

Once something works, I don't immediately consider it finished.

I test the product from both a **user** and **system** perspective.

Questions include:

### User

* Does the core workflow make sense?
* Is the interaction intuitive?
* Is the information easy to understand?
* Where does the user experience friction?

### System

* Does the logic behave correctly?
* What happens with unexpected input?
* Where can the system fail?
* Is the data handled correctly?
* Are there unnecessary dependencies?
* Can the implementation be simplified?

### Product

* Does this actually solve the original problem?
* Are the assumptions still valid?
* Is the feature worth keeping?
* What did I learn?

This is where my analytics background naturally becomes part of the development process.

> **Build → observe → analyze → learn.**

---

# 06 — 🔁 Iterate

## Version Iterations

The first working version is a **learning artifact**, not necessarily the final product.

```text
v0.1
 ↓
Learn
 ↓
v0.2
 ↓
Improve
 ↓
v0.3
 ↓
Refine
 ↓
Production Candidate
```

Iteration may involve:

* Removing unnecessary features
* Improving UX
* Refactoring code
* Changing architecture
* Improving accessibility
* Improving performance
* Adding useful functionality
* Reconsidering assumptions

I prefer making **small, controlled changes** rather than changing many unrelated things at once.

This makes the system easier to understand, test, and troubleshoot.

> **Every iteration should have a reason.**

---

# 07 — 🏗️ Engineer

## Production MVP

Once a concept has been validated, I can decide whether it deserves a more robust implementation.

This is where engineering considerations become more important:

* Architecture
* Maintainability
* Data modeling
* APIs
* Security
* Performance
* Scalability
* Cloud infrastructure
* Observability
* Automation
* Testing

The question changes from:

> **"Can I make this work?"**

to:

> **"How should this system work properly?"**

The engineering effort should be proportional to the actual requirements.

Not every prototype needs production infrastructure.

---

# 08 — 🚀 Ship

## Deployment

The validated product is prepared for real use.

Depending on the project, this may involve:

* Hosting
* Domain configuration
* Environment configuration
* Production builds
* Analytics
* Monitoring
* Documentation
* Versioning

Deployment is not necessarily the end of the process.

It creates another opportunity to observe how the product behaves outside the development environment.

---

# 09 — 📝 Document

## Case Study / Engineering Notes

Every meaningful project should leave behind more than source code.

Documentation captures:

* The original problem
* Product goals
* User flow
* Technical approach
* Architecture
* Key decisions
* Challenges
* Trade-offs
* What changed during iteration
* What was learned
* Future improvements

The goal is to communicate not only:

> **"I built this."**

but:

> **"Here is how I thought about building this."**

---

# 🚦 Decision Gates

The loop is not simply a checklist.

Each stage should answer a question before the project moves forward.

| Stage         | Question                                         |
| ------------- | ------------------------------------------------ |
| **Discover**  | Is this problem worth solving?                   |
| **Model**     | Do I understand what needs to be built?          |
| **Prototype** | Does the proposed experience make sense?         |
| **Build**     | Can the core concept work?                       |
| **Validate**  | Does it actually work and solve the problem?     |
| **Iterate**   | What should change based on what I learned?      |
| **Engineer**  | Does this need a more robust architecture?       |
| **Ship**      | Is it ready for real use?                        |
| **Document**  | Can someone understand how and why it was built? |

These decision points help prevent **building for the sake of building.**

---

# 🧠 Core Principles

### 1. Start with the problem

Technology is a means, not the starting point.

### 2. Control the scope

A focused solution is better than an overloaded prototype.

### 3. Prototype before over-engineering

Validate the idea before investing heavily in infrastructure.

### 4. Build to learn

An MVP is an experiment, not necessarily a finished product.

### 5. Let the problem determine the stack

Don't use a technology simply because it is fashionable.

### 6. Complexity should be earned

Introduce complexity when the requirements justify it.

### 7. Iterate deliberately

Every version should teach something.

### 8. Keep systems understandable

A system should be understandable to the person building, maintaining, and using it.

### 9. Treat AI as an accelerator, not an authority

AI can generate code and ideas, but technical judgment remains human responsibility.

### 10. Document decisions, not just features

The reasoning behind a system is often more valuable than the feature list.

### 11. Treat design and engineering as connected

Good products require both **how something works** and **how something feels to use.**

---

# 🧩 From My Old Workflow to My Current Workflow

My original process was primarily focused on creating polished interfaces:

```text
Product Blueprint
      ↓
User Flow
      ↓
Information Architecture
      ↓
Design System
      ↓
High-Fidelity Design
      ↓
Implementation
      ↓
Animation
      ↓
Deployment
      ↓
Case Study
```

As I built more projects, the process evolved.

The biggest change was moving **discovery, scope control, validation, and iteration earlier in the process.**

My current approach is:

```text
Problem
   ↓
Product Blueprint
   ↓
Scope
   ↓
User Flow / IA
   ↓
Prototype
   ↓
Sandbox MVP
   ↓
Test & Analyze
   ↓
Iterate
   ↓
Production MVP
   ↓
Deploy
   ↓
Document
```

The difference is intentional.

I am no longer optimizing only for **building something polished.**

I am optimizing for building something:

**Useful → Understandable → Testable → Maintainable → Technically Defensible**

---

# 🛠️ Example Projects

This methodology can be applied to projects across different domains.

| Project          | Problem / Focus             | What It Explores                                |
| ---------------- | --------------------------- | ----------------------------------------------- |
| **Twine**        | Timezone coordination       | Timezone logic, UX, client-side systems         |
| **Kiri**         | Structured ideation         | Product thinking, information architecture      |
| **Shiori**       | Lightweight task management | State management, local-first UX                |
| **Michi**        | Focus and productivity      | Interaction design, gamification                |
| **Kiro**         | Receipt organization        | Local-first architecture, OCR concepts, privacy |
| **Sora**         | SQL learning                | Educational systems, game mechanics             |
| **Money Garden** | Personal finance tracking   | Data modeling, analytics, automation            |

These projects may look different on the surface.

The underlying process remains consistent:

**Understand → Model → Prototype → Build → Validate → Iterate**

---

# 🌱 Why I Use This Approach

I enjoy building software, but I am equally interested in understanding:

* Why a system should exist
* How its pieces connect
* How users interact with it
* How data moves through it
* Where complexity can be reduced
* How the system can be improved

This framework allows me to combine:

```text
Product Thinking
       +
UX / Design
       +
Systems Thinking
       +
Analytics
       +
AI-Assisted Development
       +
Software Development
       +
Documentation
```

The result is not simply a collection of applications.

It becomes a **laboratory for learning how to design, build, analyze, and engineer systems.**

---

# ♻️ The Loop Never Really Ends

A product can always generate new questions.

```text
DISCOVER
   ↓
MODEL
   ↓
PROTOTYPE
   ↓
BUILD
   ↓
VALIDATE
   ↓
ITERATE
   ↓
ENGINEER
   ↓
SHIP
   ↓
DOCUMENT
   │
   └──────────────→ DISCOVER
```

A shipped product creates new observations.

Those observations create new problems.

New problems create new iterations.

> **Build something. Learn from it. Improve it. Repeat.**

That is the loop.

---

# 📚 Related Documentation

* **[AI-Assisted Development Playbook](https://github.com/weiss-lytics/Systems-Labs/blob/main/ai-development/ai-assisted-development-playbook.md)**
  Practical guidance for prompting, AI-assisted prototyping, iterative development, troubleshooting, and AI code review.

* **[Systems Lab](https://github.com/weiss-lytics/Systems-Labs)**
  Experimental applications and prototypes built using this methodology.

---
