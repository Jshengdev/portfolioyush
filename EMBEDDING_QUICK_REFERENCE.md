# Embedding Strategy Quick Reference
## One-Page Decision Guide for portfolioyush

---

## TL;DR - The Answers You Need

### Which Embedding Model?
**Answer**: **VoyageAI Code-3** (primary) or **Jina Code V2** (budget)
- Why: Built specifically for code, 85-90% accuracy on code search
- Alternative: OpenAI text-embedding-3-large (if already using OpenAI)

### How Many Dimensions?
**Answer**: **1024 dimensions**
- Why: Sweet spot between 88% accuracy and 4ms latency
- Storage: Only 650 KB for entire codebase

### Dense or Sparse Search?
**Answer**: **Hybrid (70% dense + 30% sparse)**
- Dense vectors: Find semantically similar code (even with different syntax)
- Sparse (BM25): Catch exact component names and keywords
- Result: Best of both worlds

### How to Update Embeddings?
**Answer**: **File watcher + daily refresh**
- Primary: Monitor src/ directory, re-embed changed files
- Backup: Full refresh every 24 hours
- Cost: Negligible (<$0.01/month)

### What About Images/Diagrams?
**Answer**: **Phase 1 → Phase 2 approach**
- Phase 1: Claude vision API summarizes images → embed as text
- Phase 2: Direct multi-modal embeddings (when mature)

### How Fast Will Search Be?
**Answer**: **<50ms with caching**
- Embedding generation: 4ms
- Vector search: 10ms
- Query result cache: <1ms (if cached)

---

## Quick Decision Tree

```
Do you have code files to search?
├─ YES → Use VoyageAI Code-3 (code-specific)
└─ NO → Use OpenAI text-embedding-3-large

Is latency critical (<100ms)?
├─ YES → Use 1024 dims (faster) + aggressive caching
└─ NO → Use 1536 dims (more accurate)

Do you have exact keywords/component names?
├─ YES → Add BM25 sparse search (30% weight)
└─ NO → Pure dense search is fine

Do you need to search images/diagrams?
├─ YES → Use image summarization (Phase 1) or multi-modal (Phase 2)
└─ NO → Focus on code and documentation

Do you have budget constraints?
├─ YES → Use open-source Jina Code V2 or Nomic Embed
└─ NO → VoyageAI Code-3 is worth the cost
```

---

## What to Implement First (Priority Order)

### Week 1: Foundation (8-12 hours)
1. ✅ Set up Qdrant vector database
2. ✅ Implement code chunker (1024 token chunks)
3. ✅ Create embedding pipeline (VoyageAI Code-3)
4. ✅ Store initial embeddings
5. ✅ Validate with test queries

**Deliverable**: Full codebase embedded and searchable

### Week 2: Polish (4-6 hours)
1. ✅ Implement hybrid search (dense + sparse)
2. ✅ Add query result caching (15 min TTL)
3. ✅ Set up file watcher for updates
4. ✅ Create monitoring dashboard

**Deliverable**: Production-ready search with 85%+ accuracy

### Week 3: Enhancement (4-8 hours)
1. ✅ Fine-tune chunk sizes based on testing
2. ✅ Add cross-encoder re-ranking (optional)
3. ✅ Implement daily full refresh
4. ✅ Document usage patterns

**Deliverable**: Optimized for portfolioyush use cases

### Week 4+: Multi-Modal (4-6 hours)
1. ✅ Implement Claude vision API integration
2. ✅ Summarize component screenshots
3. ✅ Embed image summaries
4. ✅ Enable visual search

**Deliverable**: Search by visual design and screenshots

---

## Cost Estimation

### One-Time Costs
| Item | Cost | Notes |
|------|------|-------|
| Initial codebase embedding | $0.0036 | 180k tokens × $0.02/1M |
| Qdrant setup | $0 | Self-hosted or free tier |
| Development time | $2000-3000 | 40-60 engineer hours |
| **Total** | **~$2000-3000** | |

### Monthly Costs (Ongoing)
| Item | Cost | Notes |
|------|------|-------|
| API calls (queries) | $0.001-0.01 | Depends on usage |
| File updates | <$0.001 | ~50 tokens/day |
| Storage | $0 | 650 KB fits anywhere |
| Infrastructure | $0-50 | Self-hosted or free tier |
| **Total** | **<$1/month** | |

**ROI**: Pay for itself in 1-2 weeks of productivity gains

---

## File Chunking Reference

### JavaScript/JSX
```
Optimal chunk size: 500-1000 tokens (~2000-4000 chars)
Strategy: Split by function/component declarations
Example: Grove.jsx → 6 chunks (imports, component, sections)
```

### Markdown Documentation
```
Optimal chunk size: 300-800 tokens (~1200-3200 chars)
Strategy: Split by heading level (H1, H2, H3)
Example: CLAUDE.md → 30+ chunks (by major sections)
```

### Styled-Components
```
Optimal chunk size: 150-300 tokens (~600-1200 chars)
Strategy: Group related components
Example: sharedStyles.js → 5 chunks (layouts, typography, cards)
```

### Configuration Files
```
Optimal chunk size: 100-200 tokens (~400-800 chars)
Strategy: By configuration section
Example: vite.config.js → 3 chunks (plugins, build, dev)
```

---

## Metadata to Embed

### Essential (Include Always)
- File path: `src/components/Archive.jsx`
- File type: `jsx`
- Component name: `Archive`
- Component type: `page` or `widget`

### Recommended (If Available)
- Purpose: "Horizontal scrolling project gallery"
- Dependencies: `["projectParty", "sharedStyles"]`
- Complexity: `medium`
- Last modified: ISO timestamp

### Optional (Nice to Have)
- Author/team
- Review status
- Test coverage
- Performance impact

**Embedding pattern**: Prepend metadata to code before embedding
```
// File: src/components/Archive.jsx
// Type: jsx | Component: Archive
// Purpose: Horizontal scrolling gallery
// Dependencies: projectParty, sharedStyles

[ACTUAL CODE HERE]
```

---

## Search Query Examples

### What Users Might Ask

| User Query | What They Need | Expected Results |
|-----------|-----------------|-------------------|
| "animated components" | Components with animations | Line.jsx, AppSlider.jsx, Archive.jsx |
| "smooth scrolling" | Custom scroll implementation | Archive.jsx custom scroll code |
| "styled components" | Styling patterns | sharedStyles.js, project pages |
| "WebGL backgrounds" | 3D graphics code | ShaderVisual.jsx |
| "project navigation" | Navigation components | Projects.jsx, NextProject.jsx |
| "form handling" | Form logic | Contact.jsx |
| "responsive design" | Mobile-friendly patterns | All components with @media |

**Accuracy target**: ✓ Find correct file in top 3 results for 85%+ of queries

---

## Performance Benchmarks

### Query Performance
```
Query latency breakdown:
├─ Embedding query:     4 ms
├─ Vector search:      10 ms
├─ Ranking:             2 ms
└─ Formatting:          1 ms
─────────────────────────────
Total:                ~17 ms

With caching:
├─ Cache lookup:      <1 ms
└─ If hit:            <1 ms total
─────────────────────────────
Total with cache:    <1 ms (90% hit rate assumed)
```

### Storage Performance
```
Vector storage:
├─ Embeddings: 650 KB (160 chunks × 1024 dims × 4 bytes)
├─ Metadata:  50 KB
├─ Index:     100 KB
└─ Total:     ~1 MB
```

### Memory Usage
```
Cache memory:
├─ Query cache (10k): 10 MB
├─ Embedding cache:   50 MB
└─ Total:             ~60 MB (acceptable)
```

---

## Key Success Metrics

### Track These Numbers

```
✓ Embedding Coverage
  Target: >95% of source files embedded
  Current: ? (measure after initial embedding)

✓ Search Accuracy (Recall)
  Target: >85% of queries find relevant results
  Current: ? (validate with test queries)

✓ Query Latency
  Target: <50ms average with caching
  Current: ? (benchmark after deployment)

✓ Cache Hit Rate
  Target: >30% of queries served from cache
  Current: ? (monitor usage patterns)

✓ Update Latency
  Target: File changes re-embedded <5 seconds
  Current: ? (depends on file watcher)
```

---

## Common Pitfalls to Avoid

### ❌ Don't Do This

1. **Use general text embeddings for code**
   - They perform 15-20% worse on code
   - Code-specific models are more cost-effective

2. **Chunk files too small (<100 tokens)**
   - Loss of context
   - Too many embeddings to manage
   - Slower search results

3. **Chunk files too large (>2000 tokens)**
   - Lose semantic precision
   - Hard to find specific functions
   - Higher latency

4. **Ignore sparse search completely**
   - Component names are crucial
   - Exact keyword matching matters
   - BM25 is fast and reliable

5. **Update embeddings too frequently**
   - Every change = extra API cost
   - Batch updates every 30-60 seconds
   - Daily full refresh is sufficient

6. **Store full code in vector DB**
   - Wastes storage
   - Store snippets only
   - Keep reference to source file

7. **Skip caching**
   - Same queries repeated frequently
   - Cache results (15 min TTL)
   - Massive latency improvement

---

## Validation Checklist

Before going to production:

- [ ] All code files embedded successfully
- [ ] Vector database contains >150 chunks
- [ ] Test queries return relevant results
- [ ] Search latency <50ms with caching
- [ ] Cache hit rate >30%
- [ ] File watcher monitoring src/ changes
- [ ] Daily refresh scheduled
- [ ] Monitoring dashboard set up
- [ ] Error handling implemented
- [ ] Documentation complete

---

## Tools & Services Quick Links

### Embedding Models
- **VoyageAI Code-3**: https://www.voyageai.com/
- **Jina Code V2**: https://jina.ai/products/embeddings/
- **OpenAI Embeddings**: https://openai.com/api/
- **Vertex AI Google**: https://cloud.google.com/vertex-ai

### Vector Databases
- **Qdrant**: https://qdrant.tech/ (recommended for this project)
- **Pinecone**: https://www.pinecone.io/
- **Weaviate**: https://weaviate.io/
- **Milvus**: https://milvus.io/

### Semantic Search Frameworks
- **LangChain**: https://www.langchain.com/
- **LlamaIndex**: https://www.llamaindex.ai/
- **Haystack**: https://haystack.deepset.ai/

---

## Decision: What to Build vs Buy?

### Build In-House (Recommended for portfolioyush)
**Why**:
- ✅ Full control over implementation
- ✅ Understanding of your specific needs
- ✅ No vendor lock-in
- ✅ Cost-effective for small codebases
- ✅ Easy to customize and experiment

**Effort**: 40-60 hours (1-2 weeks)

### Use Managed Service
**Examples**:
- GitHub Copilot (code search built-in)
- Replit Ghost Writer
- Various RAG platforms

**Why not**:
- ❌ Limited customization
- ❌ Less control over embeddings
- ❌ May not optimize for JavaScript/React
- ❌ Vendor lock-in risk

**Recommendation**: Build in-house for portfolioyush

---

## Next Actions

### For the Team
1. [ ] Review EMBEDDING_STRATEGY_RESEARCH.md (30 min)
2. [ ] Review EMBEDDING_IMPLEMENTATION_GUIDE.md (1 hour)
3. [ ] Decide: Build in-house or use service? (15 min)
4. [ ] Schedule implementation sprint (1-2 weeks)

### For Implementation Lead
1. [ ] Set up development environment
2. [ ] Clone/install dependencies
3. [ ] Run initial embedding (overnight)
4. [ ] Validate with test queries
5. [ ] Document any learnings

### For Project Manager
1. [ ] Estimate: 40-60 engineer hours
2. [ ] Timeline: 1-2 weeks for full implementation
3. [ ] Cost: ~$2000-3000 (one-time) + <$1/month
4. [ ] ROI: Productivity gains, better code discoverability

---

## FAQ - Quick Answers

**Q: Will this slow down my application?**
A: No. Embeddings are computed separately. Search is <50ms.

**Q: How much storage do I need?**
A: ~1-10 MB total (embeddings + index). Very lightweight.

**Q: Can I use this with existing code search?**
A: Yes! Hybrid approach (semantic + keyword) is better than either alone.

**Q: What if my code changes?**
A: File watcher re-embeds automatically. Typical latency: <5 seconds.

**Q: Do I need a GPU?**
A: No. CPU-only is fine. GPU makes it faster (optional).

**Q: Can I deploy this to production?**
A: Yes. All technologies are production-ready and proven at scale.

**Q: What's the biggest cost driver?**
A: API calls for embedding. Budget: <$1/month for typical usage.

**Q: How accurate is semantic search really?**
A: 85-95% recall for well-chunked code. Better with metadata augmentation.

---

**Version**: 1.0
**Last Updated**: November 22, 2025
**Status**: Ready to Share with Team
