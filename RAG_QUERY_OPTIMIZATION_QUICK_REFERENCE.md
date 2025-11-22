# RAG Query Optimization - Quick Reference

## 1. Query Techniques Summary

| Technique | Effort | Impact | Best For | When |
|-----------|--------|--------|----------|------|
| **Query Normalization** | ⭐ | +2-3% | All | Always |
| **Multi-Query Expansion** | ⭐⭐ | +8-10% | General queries | Most cases |
| **Intent Detection** | ⭐⭐ | +3-5% | Diverse query types | When different intents exist |
| **Query Decomposition** | ⭐⭐⭐ | +10-15% | Complex multi-part queries | >8 words, multiple topics |
| **HyDE (Hypothetical Answers)** | ⭐⭐⭐ | +8-12% | Semantic retrieval | When meaning matters |

---

## 2. Retrieval Architecture Quick Decision Tree

```
Your query: Does your RAG need optimization?

├─ YES: Do you have <100 documents?
│  ├─ YES: Single-stage embedding search is fine
│  │        (No reranking needed)
│  └─ NO:  Proceed to multi-stage...
│
├─ Setup retrieval stack:
│  ├─ Stage 1: Embedding search (top-100)
│  ├─ Stage 2: Keyword search (BM25) (top-100)
│  ├─ Stage 3: Combine with RRF → top-50
│  ├─ Stage 4: Rerank with Cross-Encoder → top-10
│  └─ Stage 5: Generate answer
│
├─ Hybrid search? YES (always recommended)
│  ├─ Semantic: Vector embeddings
│  ├─ Keyword: BM25
│  └─ Combine: Reciprocal Rank Fusion
│
├─ Need exact match capability?
│  ├─ YES: Include keyword search
│  ├─ NO:  Semantic search sufficient
│
└─ Latency constraint?
   ├─ <200ms: Skip reranking, use embedding only
   ├─ 200-500ms: Use lightweight reranker (BGE-base)
   └─ >500ms: Can use expensive models (LLM ranker)
```

---

## 3. Query Enhancement Checklist

**Before Retrieval:**
- [ ] Lowercase and trim whitespace
- [ ] Expand abbreviations (auth → authentication)
- [ ] Fix typos (async → asynchronous)
- [ ] Detect intent
- [ ] Generate 3-5 variants
- [ ] Decompose if >10 words

**During Retrieval:**
- [ ] Run keyword + semantic search in parallel
- [ ] Fuse results with RRF
- [ ] Apply metadata filters
- [ ] Deduplicate documents

**After Retrieval:**
- [ ] Rerank with cross-encoder
- [ ] Return top-5 to top-10
- [ ] Include relevance scores
- [ ] Collect user feedback

---

## 4. Model Selection Guide

### Embedding Models
```
Use Case: Dense vector representations for semantic search

Best Options:
1. BAAI/bge-base-en-v1.5 (Recommended)
   - Size: 237MB
   - Dimension: 768
   - Performance: 63.3 NDCG@10
   - Speed: ~100 embedding/sec

2. OpenAI text-embedding-3-small
   - Cost: $0.02 per 1M tokens
   - Dimension: 512
   - Performance: Good (proprietary)

3. Sentence-BERT (all-mpnet-base-v2)
   - Size: 420MB
   - Free/open-source
   - Good general performance

For domain-specific: Fine-tune on your data
```

### Reranker Models
```
Use Case: Score relevance of query-document pairs

Best Options:
1. BAAI/bge-reranker-base (Recommended)
   - Size: 336MB
   - Latency: 5ms per document
   - Performance: 97% on BEIR
   - Cost: Free (self-hosted)

2. BAAI/bge-reranker-large
   - Size: 1.2GB
   - Latency: 15ms per document
   - Performance: 99% on BEIR
   - Cost: Free (self-hosted)

3. GPT-4 as Reranker
   - Cost: High ($0.01-0.03 per query)
   - Performance: ~99.5%
   - Good for: Final ranking of top-5 results
   - Only use for top results (expensive)

For domain-specific: Fine-tune cross-encoder on your data
```

---

## 5. Hybrid Search Implementation

### Option A: Elasticsearch (Production)
```json
{
  "query": {
    "hybrid": {
      "queries": [
        {
          "multi_match": {
            "query": "async await",
            "fields": ["title^2", "content"]
          }
        },
        {
          "knn": {
            "field": "embedding",
            "query_vector": [0.1, 0.2, ...],
            "k": 100
          }
        }
      ]
    }
  }
}
```

### Option B: Python Libraries
```python
# 1. LangChain Ensemble
from langchain.retrievers import EnsembleRetriever
ensemble = EnsembleRetriever(
    retrievers=[keyword_retriever, semantic_retriever],
    weights=[0.4, 0.6]
)

# 2. Manual RRF
def rrf_fusion(keyword_results, semantic_results, k=60):
    scores = {}
    for i, doc in enumerate(keyword_results):
        scores[doc.id] = 1/(k + i)
    for i, doc in enumerate(semantic_results):
        scores[doc.id] = scores.get(doc.id, 0) + 1/(k + i)
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
```

---

## 6. Reranking Pipeline

```python
def rerank(query, documents, top_k=5):
    # Load reranker (do once)
    reranker = CrossEncoder("BAAI/bge-reranker-base")

    # Prepare pairs
    pairs = [[query, doc.content[:512]] for doc in documents]

    # Score (batch processing is faster)
    scores = reranker.predict(pairs, batch_size=32)

    # Sort and return
    sorted_docs = sorted(
        zip(documents, scores),
        key=lambda x: x[1],
        reverse=True
    )

    return [doc for doc, _ in sorted_docs[:top_k]]
```

---

## 7. Intent Categories & Actions

```
PROCEDURAL ("How to...", "implement")
└─ Action: Return tutorials, guides, step-by-step
   Filters: content_type: ["tutorial", "guide"]
   Variants: "Step by step guide to...", "How to..."

TROUBLESHOOTING ("fix", "error", "bug")
└─ Action: Return error solutions, workarounds
   Filters: content_type: ["solution", "error"]
   Variants: "Fix...", "Debug...", "Error: ..."

CODE_SEARCH ("code", "example", "snippet")
└─ Action: Return code examples, implementations
   Filters: content_type: ["code"], has_code: true
   Variants: "Code example of...", "Implement..."

COMPARATIVE ("vs", "difference")
└─ Action: Return comparisons, pros/cons
   Filters: content_type: ["comparison"]

FACTUAL ("what", "define", "explain")
└─ Action: Return definitions, explanations
   Filters: content_type: ["article", "definition"]
```

---

## 8. Query Variants Generation Patterns

### Pattern 1: Simple Expansion
```python
variants = [
    query,  # Original
    f"{query} tutorial",  # Add context
    f"{query} example",  # Add context
    f"{query} code implementation",  # Add context
]
```

### Pattern 2: Intent-Based
```python
if "how" in query.lower():
    variants = [
        query,
        f"Step-by-step: {query}",
        f"Best practices for {query}",
    ]
```

### Pattern 3: Synonym-Based
```python
synonyms = {
    "implement": ["build", "create", "develop", "code"],
    "bug": ["error", "issue", "problem"],
}

variants = [query]
for word, syns in synonyms.items():
    for syn in syns[:2]:
        variants.append(query.replace(word, syn))
```

### Pattern 4: Decomposition
```python
# For: "How to implement JWT with refresh tokens?"
# Break into:
queries = [
    "JWT token generation",
    "Refresh token implementation",
    "Token validation",
    "Security best practices",
]
```

---

## 9. Metadata Schema (For Code/Docs)

```python
metadata = {
    # Content
    "content_type": "tutorial",  # [tutorial, code, api, article, error]
    "language": "javascript",    # [python, js, go, rust, etc]
    "framework": "react",         # [react, vue, express, etc]

    # Quality
    "quality_score": 0.95,        # 0.0-1.0
    "has_code": True,
    "is_official": True,

    # Temporal
    "published_date": "2023-01-15",
    "updated_date": "2025-11-20",
    "version": "5.0.0",

    # Difficulty
    "difficulty": "intermediate",  # [beginner, intermediate, advanced]

    # Source
    "source": "github",           # [official_docs, github, blog, forum]
}
```

---

## 10. Performance Tuning Parameters

### Latency vs Quality Trade-off
```
High Quality (Slow):
- Retrieval k: 100-500
- Reranker candidates: 50
- Reranker model: large
- Total latency: 1-2s
- NDCG: ~0.85

Balanced (Recommended):
- Retrieval k: 50-100
- Reranker candidates: 20
- Reranker model: base
- Total latency: 300-500ms
- NDCG: ~0.80

Fast (Real-time):
- Retrieval k: 20-30
- No reranking
- Skip decomposition
- Total latency: <100ms
- NDCG: ~0.65
```

### Cost vs Quality Trade-off
```
Low Cost:
- Self-hosted embeddings
- BM25 + vector (no reranker)
- Total cost: <$0.0001/query

Medium Cost (Recommended):
- Self-hosted embeddings
- Self-hosted reranker
- Total cost: <$0.0002/query

High Cost:
- API embeddings (OpenAI)
- API reranker (LLM)
- Total cost: $0.01+/query
```

---

## 11. Evaluation Metrics

| Metric | Formula | Target | When |
|--------|---------|--------|------|
| **Recall@10** | relevant_in_top_10 / total_relevant | >0.80 | Completeness |
| **Precision@5** | relevant_in_top_5 / 5 | >0.70 | Top-5 quality |
| **MRR** | 1/rank_first_relevant | >0.70 | First result matters |
| **NDCG@10** | discounted_gains / ideal_gains | >0.75 | Overall ranking |
| **F1@5** | 2*(P*R)/(P+R) | >0.60 | Balanced metric |

### How to Calculate NDCG@10:
```python
def ndcg_at_k(predicted_ids, relevant_ids, k=10):
    # DCG: Discounted Cumulative Gain
    relevances = [1 if id in relevant_ids else 0
                  for id in predicted_ids[:k]]
    dcg = sum(rel / (i + 2) for i, rel in enumerate(relevances))

    # iDCG: Ideal DCG
    ideal = [1] * len(relevant_ids) + [0] * (k - len(relevant_ids))
    idcg = sum(rel / (i + 2) for i, rel in enumerate(ideal))

    return dcg / idcg if idcg > 0 else 0
```

---

## 12. Common Pitfalls & Fixes

| Problem | Cause | Solution |
|---------|-------|----------|
| **Low precision** | Too many candidates | Increase reranker top_k, add filters |
| **Low recall** | Document set too small | Expand query variants, decompose |
| **Slow retrieval** | Too many rerank candidates | Reduce k in stage 1, use base model |
| **High cost** | API calls for everything | Self-host models, batch queries |
| **Inconsistent results** | Keyword-only search | Add semantic search, use hybrid |
| **Hallucinations** | Retrieved docs not relevant | Improve retrieval (metrics) first |

---

## 13. Quick Implementation Template

```python
# Minimal working implementation

from langchain.retrievers import EnsembleRetriever, BM25Retriever
from langchain.vectorstores import Pinecone
from sentence_transformers import CrossEncoder

# 1. Setup
keyword_ret = BM25Retriever.from_documents(docs)
vector_ret = Pinecone(...).as_retriever()

ensemble = EnsembleRetriever(
    retrievers=[keyword_ret, vector_ret],
    weights=[0.5, 0.5]
)

reranker = CrossEncoder('BAAI/bge-reranker-base')

# 2. Retrieve
def retrieve(query):
    # Multi-query expansion
    queries = [query, f"{query} example", f"{query} tutorial"]

    # Get candidates
    all_docs = []
    for q in queries:
        docs = ensemble.get_relevant_documents(q)
        all_docs.extend(docs)

    # Deduplicate
    unique = {d.metadata['id']: d for d in all_docs}
    candidates = list(unique.values())[:20]

    # Rerank
    scores = reranker.predict([[query, d.page_content] for d in candidates])
    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)

    return [d for d, _ in ranked[:5]]

# Done! ~100 lines for production-quality retrieval
```

---

## 14. Decision Flowchart for Query Handling

```
Query received
├─ Short (< 5 words)?
│  ├─ Add expansion variants
│  └─ Use basic search
│
├─ Complex (5-10 words)?
│  ├─ Detect intent
│  ├─ Apply intent-based filters
│  └─ Expand with variants
│
├─ Very complex (> 10 words)?
│  ├─ Decompose into sub-queries
│  ├─ Retrieve for each
│  ├─ Merge & deduplicate
│  └─ Rerank merged results
│
└─ Search strategy
   ├─ Retrieve with variants
   ├─ Fuse keyword + semantic (RRF)
   ├─ Apply metadata filters
   ├─ Rerank top candidates
   └─ Return top-5
```

---

## 15. When to Use Each Technique

| Situation | Technique | Rationale |
|-----------|-----------|-----------|
| New RAG system | Start with hybrid + RRF | Best baseline, simple to implement |
| Low recall (<0.70) | Query expansion | Broader coverage |
| Low precision (<0.70) | Add reranking | Better filtering |
| Complex questions | Query decomposition | Handle multi-part Q |
| Diverse intents | Intent detection | Optimize per intent |
| High latency | Reduce candidates | Fewer docs to rerank |
| High cost | Self-host models | Remove API calls |
| Niche domain | Fine-tune reranker | Adapt to your data |
| User feedback available | Train custom models | Learn from interactions |

---

## 16. Recommended Tools by Use Case

### Prototyping (2-3 weeks)
- Framework: **LlamaIndex**
- Embedding: **OpenAI API**
- Reranker: **BGE or LLM**
- Hosting: **Cloud (AWS/GCP)**

### Production (3-6 months)
- Framework: **LangChain**
- Embedding: **Self-hosted BGE**
- Reranker: **Self-hosted BGE**
- Hosting: **Self-hosted**

### Research (Experimentation)
- Framework: **DSPy**
- Embedding: **Fine-tuned**
- Reranker: **Fine-tuned**
- Hosting: **Local + Experiments**

---

## 17. Success Metrics Target

```
Baseline System:
├─ NDCG: 0.65
├─ Latency: 250ms
├─ Cost/query: $0.001

Target After Optimization:
├─ NDCG: 0.80+ (✅ +23%)
├─ Latency: 300-500ms (✅ acceptable)
├─ Cost/query: $0.0002 (✅ better)

Phases:
├─ Week 1: Hybrid + RRF → NDCG 0.72
├─ Week 2: Query variants → NDCG 0.76
├─ Week 3: Reranking → NDCG 0.80
└─ Week 4: Fine-tuning → NDCG 0.82-0.85
```

---

## 18. Troubleshooting Checklist

Retrieval quality too low?
- [ ] Check document quality (no noise)
- [ ] Increase k (candidates)
- [ ] Use more query variants
- [ ] Add decomposition
- [ ] Check metadata relevance
- [ ] Verify reranker is working
- [ ] Fine-tune on your data

Too slow?
- [ ] Reduce k (candidates)
- [ ] Reduce reranker candidates
- [ ] Use smaller model
- [ ] Parallelize operations
- [ ] Add caching
- [ ] Profile bottleneck

Too expensive?
- [ ] Self-host models
- [ ] Reduce API calls
- [ ] Batch queries
- [ ] Cache embeddings
- [ ] Reduce candidates

---

## 19. Key Papers & Resources

**Query Rewriting**: HyDE, RQ-RAG, RaFe
**Multi-Stage**: FunnelRAG, ColBERT
**Hybrid**: OpenSearch, Elasticsearch docs
**Intent**: Recent intent detection NLP papers
**Evaluation**: BEIR benchmark

---

## 20. Implementation Checklist

- [ ] Week 1: Hybrid search (keyword + semantic + RRF)
- [ ] Week 2: Query expansion (3-5 variants)
- [ ] Week 2: Reranking (BGE-base)
- [ ] Week 3: Intent detection
- [ ] Week 3: Metadata filtering
- [ ] Week 4: Query decomposition
- [ ] Week 4: Feedback collection
- [ ] Week 5: Monitoring & tuning
- [ ] Week 6: Optimization for production
- [ ] Week 7: Documentation & handoff

**Expected**: 20-30% improvement in NDCG
**Effort**: 4-6 weeks full-time
**Cost**: <$1000 for self-hosted

---
