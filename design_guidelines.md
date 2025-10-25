# Design Guidelines: Professional Energy Billing Management System

## Design Approach

**System Selected**: Modern Enterprise Design System
**Inspiration**: Linear (data efficiency) + Stripe Dashboard (professional polish) + Vercel (clean minimalism)

**Core Principles**:
- Information density over decoration - every pixel serves the business user
- Scanning efficiency for rapid data processing
- Professional credibility appropriate for energy industry B2B context
- Consistent, predictable patterns across all modules

---

## Typography System

**Font Families**:
- Primary: Inter (via Google Fonts CDN) - exceptional legibility at small sizes, excellent for data tables
- Monospace: JetBrains Mono - for numeric data, codes, technical identifiers

**Hierarchy**:
- Page Titles: text-2xl (24px), font-semibold, tracking-tight
- Section Headers: text-xl (20px), font-semibold
- Card Titles: text-base (16px), font-medium
- Body/Table Text: text-sm (14px), font-normal
- Captions/Meta: text-xs (12px), font-normal
- Numeric Data: Monospace font, tabular-nums for alignment

**Special Formatting**:
- Currency values: Monospace, font-medium, larger relative size
- Status badges: text-xs, font-semibold, uppercase tracking
- Table headers: text-xs, font-medium, uppercase tracking-wide

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Micro spacing (gaps, padding): 2, 4
- Component spacing: 6, 8
- Section spacing: 12, 16
- Page margins: 16, 24

**Container Strategy**:
- App Shell: Full viewport height with sidebar navigation
- Main Content: max-w-7xl with px-6 lg:px-8 horizontal padding
- Cards/Panels: Consistent p-6 internal padding
- Data Tables: Minimal padding (p-4) to maximize information density

**Grid Systems**:
- Dashboard Stats: 4-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Forms: 2-column layouts (grid-cols-1 md:grid-cols-2) with full-width where logical
- Data Tables: Full-width with horizontal scroll on mobile
- Filters: Horizontal flex layouts with gap-4

---

## Navigation Architecture

**Sidebar Navigation** (Primary):
- Fixed left sidebar, w-64, full height
- Logo/brand at top (h-16)
- Navigation items with icons (Lucide React icons via CDN)
- Group related sections with subtle dividers (border-t, my-4)
- Active state: filled background, icon and text treatment
- Collapsed mobile state with hamburger toggle

**Navigation Items Structure**:
```
Dashboard (LayoutDashboard icon)
---
Consumers (Users icon)
Units (Building2 icon)  
Plants (Sun icon)
---
Billing (FileText icon)
  └─ Upload Invoices
  └─ Send Emails
  └─ Records
---
Reports (BarChart3 icon)
Settings (Settings icon)
```

**Top Bar**:
- Fixed, h-16, border-b
- Breadcrumb navigation (left)
- Search (center, when applicable)
- User menu + notifications (right)

---

## Component Library

### Dashboard Components

**Stat Cards**:
- Consistent height, p-6 padding
- Icon in top-left (h-8 w-8, within p-2 rounded background)
- Large metric value (text-3xl, font-bold, monospace)
- Label below (text-sm, font-medium)
- Optional trend indicator (percentage change with arrow icon)

**Alert Sections**:
- Horizontal cards with icon, message, count badge
- Warning state for overdue items
- Info state for upcoming due dates
- Clickable to expand details

**Recent Activity Table**:
- Zebra striping (alternate row backgrounds)
- Compact row height (h-12) for density
- Status badges in dedicated column
- Hover state reveals row actions
- Sort headers with arrow indicators

### Data Tables

**Standard Table Pattern**:
- Full-width container with overflow-x-auto
- Sticky header with border-b-2
- Cell padding: px-4 py-3 (compact but readable)
- Right-align numeric columns
- Action column (fixed right) with icon buttons
- Row hover: subtle background change
- Empty state: centered icon + message

**Table Features**:
- Search bar above table (w-full md:w-96)
- Filter chips/badges showing active filters
- Pagination below (showing "X-Y of Z results")
- Rows per page selector
- Bulk selection with checkboxes (when applicable)

### Forms

**Form Layout**:
- Vertical label placement for scanning efficiency
- Input fields: h-10, rounded-md, border
- Full-width on mobile, 2-column on desktop where logical
- Required field indicators (asterisk)
- Helper text below inputs (text-xs)
- Error states: red border + error message
- Success states: green checkmark icon

**Form Groups**:
- Related fields grouped in cards with headers
- Spacing between groups: mt-8
- Submit actions in sticky footer (border-t, p-4)

**Special Input Types**:
- File Upload: Drag-and-drop zone with dashed border, p-8 padding
- Date Pickers: Calendar icon, proper date formatting
- Select Dropdowns: Chevron icon, keyboard navigation
- Multi-select: Chip-based display of selected items

### Cards & Panels

**Standard Card**:
- Rounded-lg, border, shadow-sm
- Header: p-6, border-b, flex justify-between
- Body: p-6
- Footer (optional): p-6, border-t, actions right-aligned

**Stat Card Variant**:
- No internal borders
- Icon + value + label vertical stack
- Hover: subtle shadow increase

**List Card**:
- Items with border-b except last
- Item padding: px-6 py-4
- Clickable items: hover background change + cursor-pointer

### Dialogs & Modals

**Modal Pattern**:
- Overlay: semi-transparent backdrop
- Content: max-w-2xl, centered, shadow-xl
- Header: sticky, border-b, close button
- Body: scrollable, p-6
- Footer: sticky, border-t, actions right-aligned

**Toast Notifications**:
- Fixed bottom-right position
- Auto-dismiss after 5s
- Success/Error/Info variants
- Icon + message + optional action

### Buttons

**Button Hierarchy**:
- Primary: Solid fill, medium weight, h-10 px-6
- Secondary: Outline variant
- Ghost: Text-only for tertiary actions
- Icon-only: Square (h-10 w-10) for toolbars

**Button Groups**:
- Primary action rightmost
- Destructive actions separated with gap
- Cancel/back actions leftmost

### Badges & Status Indicators

**Status Badges**:
- Small (text-xs px-2 py-1), rounded-full
- Pending: neutral tone
- Paid: success tone
- Overdue: destructive tone
- Processing: info tone with animated pulse

**Count Badges**:
- Circular, minimal size
- Positioned absolute on parent (top-right for icons)

### File Upload Zone

**Upload Interface**:
- Large drop zone (min-h-64)
- Dashed border-2
- Center-aligned icon (h-12 w-12)
- Instructional text
- File type + size restrictions shown
- Selected files list below with progress bars

**Progress Indicators**:
- Linear progress bar (h-1)
- Percentage text (monospace)
- Success checkmark or error icon when complete

### Email Composer

**Composition Interface**:
- Recipient selection with checkboxes
- Filter tabs (Pending/Paid/Overdue)
- Rich text editor with toolbar
- Preview pane (side-by-side on desktop)
- Attachment indicator
- Send button with confirmation dialog

---

## Data Visualization

**Charts** (using Recharts):
- Line charts for trends (energy consumption over time)
- Bar charts for comparisons (monthly billing)
- Pie/donut for distribution (energy sources)
- Consistent height: h-80
- Tooltips on hover
- Legend below chart

**Metrics Display**:
- Large numeric values with units
- Trend arrows (up/down with percentage)
- Sparkline charts for mini-trends

---

## Responsive Behavior

**Breakpoints**:
- Mobile: Base styles, single column
- Tablet (md): 2-column grids, visible sidebar
- Desktop (lg): Full multi-column layouts, expanded features

**Mobile Adaptations**:
- Hamburger menu for navigation
- Stacked cards instead of grid
- Horizontal scroll for tables
- Bottom sheet for filters
- Simplified chart views

---

## Empty States

**Pattern**:
- Centered vertically and horizontally
- Icon (h-16 w-16, muted)
- Heading (text-lg, font-medium)
- Description text
- Primary action button

---

## Loading States

- Skeleton screens matching final layout
- Shimmer animation effect
- Spinner for button actions
- Progress bar for file uploads
- Table rows: 5-8 skeleton rows matching structure

---

## Accessibility

- Focus visible rings on all interactive elements
- ARIA labels on icon-only buttons
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Keyboard navigation for all workflows
- Screen reader announcements for status changes