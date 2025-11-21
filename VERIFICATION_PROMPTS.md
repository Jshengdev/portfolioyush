# Wave Verification - Quick Start Prompt

## Copy-Paste This Into New Claude Session

```
I need you to verify completion of portfolio optimization waves.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush

**Your Verification Guide**: /WAVE_VERIFICATION.md

**Instructions**:
1. Read the WAVE_VERIFICATION.md file
2. Check "Current Wave" status at the top (starts with Wave 1)
3. Run all verification commands for that wave
4. Mark each task as ✅ Complete or ❌ Failed
5. Update the wave status and "Current Wave" tracker
6. Report results to me

**After each wave**:
- Update "Current Wave" marker to next wave
- Update "Wave Status Overview" table
- Save the updated WAVE_VERIFICATION.md file

**Start now**: Begin verifying the current wave.
```

---

## Alternative: Specific Wave Verification

If you want to verify a specific wave (not sequential):

```
I need you to verify completion of Wave {N} from the portfolio optimization.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush
**Verification Guide**: /WAVE_VERIFICATION.md

Read the verification guide and execute all checks for Wave {N} only.
Mark each task status and report results.
```

Replace `{N}` with 1, 2, 3, 4, 5, 6, or 7.

---

## Ongoing Tracking Prompt

For a session that tracks multiple waves:

```
You are my wave completion tracker for the portfolio optimization project.

**Repository**: /Users/johnnysheng/Documents/GitHub/portfolioyush
**Tracking File**: /WAVE_VERIFICATION.md

**Your role**: 
- Keep WAVE_VERIFICATION.md updated
- Verify each task as I complete waves
- Update "Current Wave" status
- Maintain the progress percentage
- Alert me when ready to move to next wave

Start by reading the current state of WAVE_VERIFICATION.md and tell me:
1. Which wave we're currently on
2. How many tasks are complete
3. What the next verification step is
```

---

## File Location

**Verification Tracker**: `/Users/johnnysheng/Documents/GitHub/portfolioyush/WAVE_VERIFICATION.md`

This file contains:
- ✅ Agent instructions at the top
- ✅ Wave status overview table
- ✅ Detailed verification steps for each wave (1-7)
- ✅ Bash commands to verify each task
- ✅ Progress tracking checkboxes
- ✅ Troubleshooting section
- ✅ Final metrics comparison
- ✅ Quick command reference

---

## Workflow

1. **Start new chat** with verification prompt above
2. **Agent verifies current wave** using commands in WAVE_VERIFICATION.md
3. **Update checkboxes** as tasks complete
4. **Agent updates "Current Wave"** when wave completes
5. **Repeat** for each wave (1-7)

The WAVE_VERIFICATION.md file is your **single source of truth** for progress tracking!
