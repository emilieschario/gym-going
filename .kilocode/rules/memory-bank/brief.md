# Project Brief: Did Emilie Go to the Gym?

## Overview
A simple, modern web application that tracks Emilie's gym attendance for January 2026. The app fetches data from a Google Sheet and displays it in a beautiful calendar format.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime:** Bun
- **Deployment:** GitHub Actions for automated updates

## Core Features
1. **Today's Status:** Shows whether Emilie went to the gym today with a clear status badge
2. **Monthly Calendar:** Visual calendar showing gym days (emerald) and rest days (gray)
3. **Progress Tracking:** Progress bar showing percentage of gym days completed
4. **Auto-Update:** Data refreshes from Google Sheets via GitHub Actions

## Design Goals
- Clean, modern, mobile-first design
- Emerald/teal color scheme
- Subtle animations and gradients
- Excellent readability on all devices

## Data Source
- Google Sheets CSV export
- Spreadsheet ID: `1hjp8Ba90tuxwUuPHekV3xg2z1lX73gI0aZfwSIxSKJc`
- Format: Date (YYYY-MM-DD), Boolean (TRUE = gym day)
