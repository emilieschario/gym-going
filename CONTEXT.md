# Emilie Went to the Gym Today

A simple Next.js website that displays whether Emilie went to the gym on specific dates, visualized as a calendar with YES/NO indicators.

## Purpose

Track and display gym attendance data for January 2026 using data from a public Google Sheet. The calendar shows an "X" for days with YES (gym attendance) and leaves blank days with NO.

## Features

- Calendar view for January 2026
- Data sourced from Google Sheets (with demo data fallback)
- Visual indicators: "X" for YES, blank for NO
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: Bun

## Data Source

Google Sheet: https://docs.google.com/spreadsheets/d/1hjp8Ba90tuxwUuPHekV3xg2z1lX73gI0aZfwSIxSKJc/edit?gid=0#gid=0

CSV Export URL for data:
```
https://docs.google.com/spreadsheets/d/1hjp8Ba90tuxwUuPHekV3xg2z1lX73gI0aZfwSIxSKJc/export?format=csv&gid=0
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with Tailwind CSS
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main page with calendar
├── components/
│   └── Calendar.tsx     # Calendar component
└── lib/
    └── gym-data.ts      # Google Sheets data fetching
```

## Architectural Decisions

1. **Server Components**: Used by default for data fetching
2. **Client Component for Calendar**: Interactive calendar component marked with "use client"
3. **Direct CSV Fetching**: Using Google Sheets CSV export format for simple data retrieval
4. **Tailwind CSS v4**: Using `@import "tailwindcss"` as per v4 convention

## Data Format

Expected Google Sheet format:
- Column A: Date (YYYY-MM-DD format)
- Column B: YES/NO value

## Changes

- Initial implementation with January 2026 calendar
- Fetched data from Google Sheets CSV export
- Visual calendar with X indicators for YES answers
- Added fallback demo data for when Google Sheet is empty or unavailable
