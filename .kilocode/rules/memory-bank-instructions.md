# Memory Bank Instructions

This document provides instructions on how to initialize and maintain the Memory Bank for this project.

## What is Memory Bank?

Memory Bank is a set of markdown files that help Kilo Code understand the context of your project. These files contain:
- Project briefs and overviews
- Technical decisions and architecture
- Progress tracking and current state
- Product context and goals

## Steps to Initialize

1. **Create folder structure:**
   - Create `.kilocode/rules/memory-bank/` folder
   - Add `brief.md` with project overview

2. **Switch to Architect mode:**
   - This provides better project analysis capabilities

3. **Initialize Memory Bank:**
   - Ask Kilo Code to "initialize memory bank"
   - Kilo Code will analyze the project and create additional files

4. **Review and Update:**
   - Check generated files for accuracy
   - Update any incorrect information
   - Add missing context as needed

## Memory Bank Files

After initialization, the memory bank typically contains:
- `brief.md` - Project overview and goals
- `productContext.md` - Product requirements and user context
- `activeContext.md` - Current work and state
- `systemPatterns.md` - Technical patterns and architecture
- `progress.md` - What's done and what's planned

## Maintenance

- Update files when major changes occur
- Keep `activeContext.md` current during active development
- Document key decisions in `systemPatterns.md`
