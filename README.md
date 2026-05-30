# Synapse Teams
### Visual Team Intelligence Platform

> Synapse Teams helps organizations manage team workloads, customer operations, onboarding progression, recruitment pipelines, live SLA escalations, and cross-functional collaboration through an integrated, interactive visual workspace.

---

## 🚀 Key Features

*   **Command Center (`/dashboard`)**: Instant overview of organizational pulse, team satisfaction heatmap, recent activity trackers, and KPI sparkline trendlines.
*   **Team Intelligence (`/team`)**: Skill profile matrix, task balance dials, department growth charts, and team-comparison Radar charts.
*   **Recruitment Hub (`/recruitment`)**: Custom drag-and-drop Kanban pipeline board with candidate scorecards, evaluation summaries, and interview calendar indices.
*   **Onboarding Center (`/onboarding`)**: Interactive syllabi, completion progress gauges, readiness index calculations, and mentor assignments.
*   **Escalation Workspace (`/escalations`)**: Urgency-vs-Impact 2x2 priority matrix with active SLA countdown timers and assignment drawers.
*   **Knowledge Graph (`/knowledge`)**: Interactive visual directory mapping documents, processes, teams, and training manuals using `@xyflow/react`.
*   **Collaboration Board (`/collaboration`)**: Enhancements board with upvoting mechanics, ideas creation form, and pins panel.
*   **Analytics Center (`/analytics`)**: Tabbed telemetry viewer displaying productivity trends, recruitment throughput funnel, and incident ticket statistics.
*   **AI Operations Assistant (`/ai-assistant`)**: Direct console chatbot answering natural language workspace prompts, paired with a live telemetry warning dashboard.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **Styles**: Tailwind CSS v4 (Custom HSL tokens in `app/globals.css`)
*   **State Management**: Zustand v5
*   **Graph Engine**: `@xyflow/react` v12 (React Flow)
*   **Charts**: Recharts
*   **Animations**: Framer Motion

---

## 📂 Folder Architecture

```
synapse-teams/
├── app/
│   ├── (app)/                       # Workspace Shell
│   │   ├── layout.tsx               # Sidebar & Topbar
│   │   ├── dashboard/page.tsx       # Command Center
│   │   ├── team/page.tsx            # Team Intelligence
│   │   ├── recruitment/page.tsx     # Recruitment Hub
│   │   ├── onboarding/page.tsx      # Onboarding Center
│   │   ├── escalations/page.tsx     # Escalations Workspace
│   │   ├── knowledge/page.tsx       # Knowledge Canvas
│   │   ├── collaboration/page.tsx   # Feature Board
│   │   ├── analytics/page.tsx       # Analytics Center
│   │   └── ai-assistant/page.tsx    # Operations Copilot
│   ├── globals.css                  # Custom Design System Tokens
│   ├── layout.tsx                   # Font & Metatags Setup
│   └── page.tsx                     # Landing Page Showcase
├── components/
│   └── layout/                      # Navigation Shell
│       ├── command-palette.tsx      # Ctrl+K Palette
│       ├── sidebar.tsx              # Collapsible Sidebar
│       └── topbar.tsx               # Breadcrumb Header
├── lib/
│   ├── mock-data.ts                 # Full Demo telemetry
│   ├── store.ts                     # State stores
│   └── utils.ts                     # String, Sparkline compilers
└── types/
    └── index.ts                     # Strict Types declarations
```

---

## ⚙️ Local Development Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Run project compiler build**:
    ```bash
    npm run build
    ```

Open `http://localhost:3000` to interact with the dashboard.
Use `Ctrl + K` inside the workspace to access the navigation Command Palette.
