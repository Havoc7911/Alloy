# Alloy Workspace - Node Categories

## Overview
Alloy Workspace uses six intuitive, operational node categories that correspond to the core workflow steps. This guide explains each category, its purpose, typical nodes, and implementation details.

## Category Mapping

| User-facing | Internal | Purpose |
|---|---|---|
| Collect | Source | Bring data/content into the graph |
| Edit | Transform | Change, convert, compute, enrich |
| Route | Process | Decide paths, approvals, timing, branching |
| Save | Storage | Persist state/artifacts for reuse |
| Send | Sink | Deliver outputs anywhere |
| Automate | Automation | Run automatically on schedule or event |

## Detailed Categories

### 1. Collect (Source)
**Purpose**: Bring information into the graph from external sources.

**Use Cases**:
- Import files from cloud storage
- Fetch data from APIs
- Collect form submissions
- Read from databases
- Pull messages from services

**Typical Node Types**:
- Collect File
- Collect API
- Collect Form
- Collect Database
- Collect Message

**Icon**: Inbox tray / download-to-tray

---

### 2. Edit (Transform)
**Purpose**: Modify, convert, calculate, enrich, or transform content.

**Use Cases**:
- Format text, dates, numbers
- Convert between file types
- Apply AI/ML processing
- Filter and map data
- Calculate or aggregate
- Summarize content

**Typical Node Types**:
- Edit Text
- Edit Format
- Edit with AI
- Edit Data
- Filter/Map
- Compute

**Icon**: Pencil or wand

---

### 3. Route (Process)
**Purpose**: Decide where work goes and when (routing, approvals, delays, branching).

**Use Cases**:
- Conditional logic (if/else)
- Approval workflows
- Timed delays or waits
- Split/merge execution paths
- Parallel processing

**Typical Node Types**:
- Route: If/Else
- Route: Approve
- Route: Wait/Delay
- Route: Split
- Route: Merge

**Icon**: Branching arrows or signpost

---

### 4. Save (Storage)
**Purpose**: Store and persist results so they can be reused, audited, or resumed later.

**Use Cases**:
- Cache intermediate results
- Store to cloud/local storage
- Write to database
- Archive outputs
- Maintain history

**Typical Node Types**:
- Save Local
- Save Cloud
- Save to Database
- Save Snapshot

**Icon**: Disk or database cylinder

---

### 5. Send (Sink)
**Purpose**: Deliver outputs to people, services, devices, other apps, or other graphs.

**Use Cases**:
- Send email notifications
- Post to chat/messaging
- Upload to cloud drives
- Trigger webhooks
- Send to devices
- Export to other apps

**Typical Node Types**:
- Send Email
- Send Message
- Send Webhook
- Send to Drive
- Send to Device
- Send Graph

**Icon**: Paper plane or outbox tray

---

### 6. Automate (Automation)
**Purpose**: Make workflows run automatically based on schedules or events.

**Use Cases**:
- Run on a schedule (daily, weekly, etc.)
- Trigger on external events
- Monitor for changes
- Loop/iterate over items

**Typical Node Types**:
- Automate: Schedule
- Automate: Event
- Automate: Monitor
- Automate: Loop

**Icon**: Clock + bolt or play button + loop

---

## Left Panel Ordering
The recommended left-panel (Library) ordering:

**Collect** → **Edit** → **Route** → **Save** → **Send** → **Automate**

This flows left-to-right on the canvas, matching how users naturally think about workflows.

## Node Naming Convention
All nodes follow the pattern: `[Category]: [Function]` or `[Category] [Function]`

Examples:
- Collect File
- Edit Text
- Route: If/Else
- Save Cloud
- Send Email
- Automate: Schedule

## Color Coding (Reference)
Each category has a soft tint applied to:
- Node header strip
- Small icon badge
- Selection highlights

See `ALLOY-THEME-TOKENS.md` for exact color values.
