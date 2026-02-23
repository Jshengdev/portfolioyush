# Canary Landing Page — Story & Style Optimization

**Date**: 2026-02-23
**Approach**: "Tighten & Breathe"
**Audience**: Dual — pitch competition judges + developer prospects

## Problem

The page has 7 content sections with two key issues:
1. **Redundancy**: Solution and LiveFeed both show NotifCards with observed/flagged/blocked actions
2. **Monotony**: NotifCards appear in 5 of 7 sections; uniform section padding creates metronomic rhythm

## Changes

### 1. Merge Solution + LiveFeed → one section (7 → 6 sections)

**New Solution layout:**
- Left column: section label, headline, body copy, SDK code snippet (from old Solution)
- Right column: live feed ticker with cycling NotifCards (from old LiveFeed)
- Dark theme, `solution-grid` layout preserved

**Removed:** LiveFeed.jsx as a standalone section. Its `useLiveFeedTicker` + `initialFeedItems` move into Solution.

### 2. Vary section padding for visual rhythm

| Section | Padding | Rationale |
|---------|---------|-----------|
| Hero | 7rem 3rem 4rem (unchanged) | Grand entrance |
| Problem | **5.5rem** 3rem | More whitespace = more gravity for the pain |
| Solution | **5rem** 3rem | Generous — centerpiece section |
| HowItWorks | **3.5rem** 3rem | Compact utility section |
| Market | 4.5rem (unchanged) | Standard |
| CTA | 5rem (unchanged) | Already custom |

### 3. Market section — replace NotifCard with text callout

Remove the red `MARKET_SIGNAL` NotifCard. Replace with inline text using `StatHighlight`:
> **78.6%** of enterprises have blocked agent deployment. The trust gap is the market.

### 4. CTA headline copy

Change: "Help us make agents trustworthy." → "Deploy agents with confidence."

### 5. Section order (final)

```
Nav → Hero → Problem → Solution (merged) → HowItWorks → Market → CTA → Footer
```

## Files affected

- `CanaryApp.jsx` — remove LiveFeed import/render
- `Solution.jsx` — absorb live feed ticker, initialFeedItems, right-column redesign
- `Market.jsx` — replace NotifCard with StatHighlight text
- `CallToAction.jsx` — update headline copy
- `canary.css` — section-specific padding overrides
- `LiveFeed.jsx` — can be deleted after merge (or kept as dead code for reference)

## Not changing

- Hero section (strong as-is)
- Problem section (strong as-is, only gets more padding)
- HowItWorks content (only padding change)
- Footer
- All hooks, design-system components, and canvas effects
