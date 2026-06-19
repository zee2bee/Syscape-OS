# 🖥️ Syscape OS

> A browser-based WebOS experience that transforms a developer portfolio into an interactive operating system environment.

![Syscape OS Banner](./app/icon.png)

[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Language](https://img.shields.io/badge/Language-JavaScript%20ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Animation](https://img.shields.io/badge/Animation-Framer%20Motion-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![State](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)

---

## 📌 Overview

**Syscape OS** is an interactive browser-based operating system simulation designed as a creative developer portfolio experience.

Instead of a traditional scrolling portfolio, Syscape OS presents projects, utilities, and personal information inside a fully interactive desktop environment featuring draggable windows, a custom terminal, system applications, persistent settings, and a futuristic UI experience.

The project combines modern frontend technologies with OS-inspired interaction patterns to create a unique portfolio platform.

---

# ✨ Features

## 🪟 Window Management System

A custom desktop window engine powering the entire environment.

Features:

- Dynamic window focus handling
- Automatic `z-index` management
- Drag-and-drop window movement
- Responsive viewport constraints
- Minimize, maximize, and close controls
- Multi-window interaction support

---

## 💻 Terminal Application (`Terminal.exe`)

A built-in command-line interface that allows users to interact with the system.

Available commands:

```bash
help
about
projects
notes
canvas
calculator
tictactoe
clear

Capabilities:

Command parsing system
Application launching through commands
System information output
Interactive terminal history
🧩 Built-in Applications
📝 CyberNotes

A lightweight note-taking environment.

Features:

Real-time text editing
Character and line statistics
Local persistence
Clean terminal-inspired interface
🎨 NeonCanvas

An interactive drawing application.

Features:

HTML5 Canvas API integration
Mouse and touch support
Custom brush size control
Multiple color options
Local drawing persistence
🧮 ALU Calculator

A calculator inspired by computer arithmetic units.

Features:

Basic arithmetic operations
Floating-point calculations
Calculation history
Multi-step expression handling
❌ TicTacToe AI

A playable TicTacToe engine with AI decision-making.

Features:

Player vs computer mode
Strategic move selection
Win/draw detection
Interactive game interface

🛠️ Tech Stack
Frontend
Next.js — Application framework and rendering architecture
JavaScript (ES6+) — Core application logic
Tailwind CSS — UI styling and responsive layouts
Framer Motion — Animations and interaction effects
Zustand — Global state management
Forms & Validation
React Hook Form
Zod

Used for handling setup flows and structured user input validation.

Storage
Browser LocalStorage API

Used for:

Theme preferences
Notes
Canvas data
User customization settings
🎨 Assets & Tools
VS Code — Development environment
Flaticon — Icon resources
Gradient Magic — Background design inspiration
🚀 Installation & Setup
Prerequisites

Make sure you have:

Node.js v18+
npm

installed on your machine.

1. Clone Repository
git clone https://github.com/your-username/syscape-os.git

cd syscape-os
2. Install Dependencies
npm install
3. Start Development Server
npm run dev

Open:

http://localhost:3000

Your local Syscape OS environment will now be running.

4. Create Production Build
npm run build

This generates an optimized production-ready build.

🌐 Deployment

Syscape OS uses an automated deployment workflow.

Deployment pipeline:

GitHub Repository
        ↓
Continuous Deployment
        ↓
Production Build
        ↓
Optimized Asset Delivery
        ↓
Live Deployment

Every verified production update automatically triggers:

Application rebuild
Asset optimization
Deployment to edge infrastructure
Live version refresh
📂 Project Goals

Syscape OS was built to explore:

Creative portfolio experiences
Desktop-style web interfaces
Interactive UI architecture
Browser-based application systems
Modern frontend engineering patterns
📜 License

This project is available for personal and educational use.

⭐ If you like the project, consider giving it a star!
