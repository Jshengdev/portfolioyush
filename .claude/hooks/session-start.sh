#!/bin/bash
# .claude/hooks/session-start.sh
# Loads context when Claude Code session starts

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
CONTEXT_DIR="$PROJECT_DIR/.claude/context"

echo "🚀 Starting Claude Code session for portfolioyush"
echo ""

# Display project quick facts
echo "📊 Project Quick Facts:"
echo "  • React 18.2.0 + Vite 6.0.7"
echo "  • 16 active components, 4,676 lines"
echo "  • Build: 797KB (227KB gzip), 15 chunks"
echo "  • Health Score: 9.5/10"
echo "  • Status: Production-ready (Wave 1-7 complete)"
echo ""

# Load knowledge base if it exists
if [ -f "$CONTEXT_DIR/knowledge/knowledge-base.md" ]; then
    echo "📚 Loading knowledge base..."
    cat "$CONTEXT_DIR/knowledge/knowledge-base.md"
    echo ""
fi

# Show recent git activity
echo "📝 Recent Git Activity:"
git log --oneline -5 2>/dev/null || echo "  No git history available"
echo ""

# Show current branch
BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$BRANCH" ]; then
    echo "🌿 Current Branch: $BRANCH"
    echo ""
fi

# Show git status summary
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l)
MODIFIED=$(git diff --name-only 2>/dev/null | wc -l)
STAGED=$(git diff --cached --name-only 2>/dev/null | wc -l)

if [ "$UNTRACKED" -gt 0 ] || [ "$MODIFIED" -gt 0 ] || [ "$STAGED" -gt 0 ]; then
    echo "⚠️  Git Status:"
    [ "$STAGED" -gt 0 ] && echo "  • $STAGED file(s) staged"
    [ "$MODIFIED" -gt 0 ] && echo "  • $MODIFIED file(s) modified"
    [ "$UNTRACKED" -gt 0 ] && echo "  • $UNTRACKED file(s) untracked"
    echo ""
fi

# Show available slash commands
echo "⚡ Available Commands:"
echo "  • /load/component <name>  - Load component context"
echo "  • /load/context <topic>   - Load topical context"
echo "  • /search/code <query>    - Semantic code search"
echo "  • /analyze/performance    - Performance analysis"
echo "  • /docs/update            - Update documentation"
echo ""

# Show recent research if available
RESEARCH_COUNT=$(find "$PROJECT_DIR" -maxdepth 1 -name "RAG_*.md" -o -name "EMBEDDING_*.md" -o -name "METADATA_*.md" 2>/dev/null | wc -l)
if [ "$RESEARCH_COUNT" -gt 0 ]; then
    echo "📖 RAG Research Available: $RESEARCH_COUNT documents"
    echo "  → Start with: RAG_SUMMARY.md"
    echo ""
fi

echo "✅ Context loaded. Ready to code!"
echo ""

exit 0
