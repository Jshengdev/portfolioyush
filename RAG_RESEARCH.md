# RAG & Vector Database Research Report
## Lightweight Solutions for Documentation Systems

**Date**: November 22, 2025
**Purpose**: Evaluate vector database and embedding options for portfolio documentation RAG system
**Target Environment**: Portfolio website + documentation (Node.js-based)

---

## Executive Summary

For a **small-to-medium documentation system** (like your portfolio's CLAUDE.md and project documentation):

### Top Recommendations:

1. **For Rapid Prototyping** → **ChromaDB** with OpenAI embeddings
   - Fastest setup, minimal overhead
   - Free tier for small projects
   - Best developer experience

2. **For Production Local-First** → **FAISS** + **Voyage AI embeddings** or **Ollama**
   - No external dependencies after setup
   - Works offline
   - Lightweight, blazing fast

3. **For Hybrid Approach** → **PostgreSQL + pgvector** with BM25
   - Single database for documents + vectors
   - Best for keyword + semantic search combo
   - Scales to millions of vectors

4. **For Zero Setup** → **Text-file RAG** with large context windows
   - No vector DB needed (feed entire docs to LLM context)
   - Works with Claude API's 200K token window
   - Simplest implementation

---

## Part 1: Vector Database Analysis

### 1.1 Lightweight Embedded Solutions Comparison

#### **ChromaDB** ⭐ Best for Startups/Prototyping

**Specifications**:
- **Model**: Embedded Python + Rust (rewritten in 2025 for 4x speed)
- **Storage**: SQLite-based (file-based or in-memory)
- **Search latency**: ~20ms median (p50) for 100k vectors at 384 dims
- **Cost**: Free, open-source
- **Setup time**: < 5 minutes

**Pros**:
- ✅ pip install chromadb + instant use
- ✅ Seamless Jupyter/notebook integration
- ✅ Built-in web UI (optional)
- ✅ Python & JavaScript support
- ✅ 2025 rewrite: 4x faster writes, multithreading enabled
- ✅ Persistent local storage with automatic backups
- ✅ Perfect for small-to-medium projects (< 1M vectors)

**Cons**:
- ❌ Limited to single machine (no distributed mode)
- ❌ No real-time sync across multiple processes
- ❌ Slower than specialized solutions for > 5M vectors
- ❌ Less battle-tested than alternatives

**Performance**:
```
Collection size: 100k vectors (384 dims)
Query latency: ~20ms (p50)
Write throughput: 50-100 vectors/sec (local)
Memory footprint: ~500MB (with vectors in memory)
```

**Best For**: Your portfolio if you want:
- Quick documentation search feature
- < 100k vectors (your docs are small)
- Offline-capable, no API calls
- Single-machine deployment

**Node.js Integration**: ✅ Supported via JavaScript SDK
```bash
npm install chromadb
```

---

#### **FAISS** ⭐ Best for Performance

**Specifications**:
- **Model**: Library (not a database)
- **Creator**: Facebook AI Research
- **Focus**: Pure vector indexing and similarity search
- **Speed**: Sub-millisecond queries for in-memory data
- **Cost**: Free, open-source
- **Setup time**: 10 minutes (with integration)

**Pros**:
- ✅ Blazingly fast (sub-ms latency)
- ✅ No network overhead (pure local)
- ✅ GPU acceleration available
- ✅ Minimal memory footprint
- ✅ Mature, battle-tested (used by Meta internally)
- ✅ Works completely offline
- ✅ Python & C++ support

**Cons**:
- ❌ Not a full database (no CRUD operations)
- ❌ Index rebuild required for updates (no real-time adds)
- ❌ No built-in persistence (manual save/load)
- ❌ Manual sharding for large datasets
- ❌ Lower-level API (more code needed)
- ❌ Steep learning curve for complex indexes

**Performance**:
```
Index type: IVF (Inverted File)
Vectors: 1M embeddings (768 dims)
Query latency: 0.5-1ms (p50)
Memory: Highly compressed (configurable)
Build time: ~30sec for 1M vectors
```

**Best For**: Your portfolio if you:
- Need maximum speed
- Are willing to manage index updates
- Want zero external dependencies
- Will index docs once, query many times

**Node.js Integration**: ⚠️ Limited
- Use via Python server (overkill)
- Or JavaScript wrapper libraries
- **Better**: Use with Python backend + API wrapper

---

#### **Qdrant** ⭐ Best for Production

**Specifications**:
- **Model**: Full database (Rust-based)
- **Storage**: Disk-persistent with optional in-memory
- **Search latency**: ~10ms for millions of vectors
- **Scaling**: Horizontal (cluster-ready)
- **Cost**: Free open-source, paid cloud ($25/month+)
- **Setup time**: 15 minutes (Docker)

**Pros**:
- ✅ Real-time updates and inserts
- ✅ HNSW algorithm (fast, accurate)
- ✅ 2025 feature: 24x compression with 8-bit quantization
- ✅ Horizontal scaling with Raft consensus
- ✅ REST API + gRPC
- ✅ Filtering, payload storage, hybrid search
- ✅ Automatic failover, zero-downtime scaling
- ✅ Web UI included

**Cons**:
- ❌ Heavier resource usage than ChromaDB
- ❌ Requires Docker/server deployment
- ❌ More complex operational setup
- ❌ Overkill for very small projects
- ❌ Slower to start for prototyping

**Performance**:
```
Collection size: 10M vectors
Query latency: ~10ms (p95)
Update latency: ~5ms (single vector)
Throughput: 10k queries/sec (single instance)
Memory: Highly configurable (24x compression available)
```

**Best For**: Your portfolio if you:
- Plan to scale later
- Need real-time document indexing
- Want production-ready reliability
- Will run continuous service

**Node.js Integration**: ✅ Full support via REST API
```bash
# Docker setup
docker pull qdrant/qdrant
docker run -p 6333:6333 qdrant/qdrant
```

---

#### **Milvus** - Distributed Alternative

**Specifications**:
- **Model**: Distributed database
- **Recent**: Milvus 2.5 (Dec 2024) added native BM25
- **Scaling**: Horizontal (Kubernetes-ready)
- **Cost**: Free open-source, managed service available
- **Setup**: 20+ minutes (Kubernetes)

**Pros**:
- ✅ Massive scale (100M+ vectors)
- ✅ Native hybrid search (BM25 + vector)
- ✅ Kubernetes-native
- ✅ Multiple index types

**Cons**:
- ❌ Heavyweight for small projects
- ❌ Operational complexity
- ❌ Overkill for documentation RAG
- ❌ Steep learning curve

**Verdict**: **Not recommended** for portfolio documentation. Too much overhead.

---

### 1.2 Database Extension: PostgreSQL + pgvector

**Specifications**:
- **Model**: Extension to PostgreSQL
- **Creator**: Pgvector open-source project
- **Storage**: Unified with relational data
- **Scaling**: Up to 50M vectors with pgvectorscale extension
- **Cost**: Free (if you have PostgreSQL)
- **Setup**: 5 minutes (CREATE EXTENSION pgvector)

**Pros**:
- ✅ One database for documents + vectors
- ✅ SQL queries combine relational + vector
- ✅ Hybrid search naturally (BM25 + vector)
- ✅ No new operational tool
- ✅ Mature PostgreSQL ecosystem
- ✅ Excellent for moderate scale (< 50M vectors)
- ✅ Node.js integration: npm pg + simple SQL

**Cons**:
- ❌ Slower than specialized vector DBs
- ❌ Query latency: seconds (not milliseconds) for large sets
- ❌ Requires PostgreSQL infrastructure
- ❌ Not as optimized as Qdrant for vector-only workloads
- ❌ Less efficient storage than specialized solutions

**Performance**:
```
Collection size: 1M vectors (1536 dims)
Query latency: 100-500ms (slower than Qdrant)
Search throughput: 100-500 queries/sec
Good for: < 50M vectors with Postgres infrastructure
```

**Best For**: Your portfolio if:
- You already use PostgreSQL
- You want documents searchable by metadata + similarity
- You want everything in one database
- You prefer SQL simplicity

---

### 1.3 File-Based Storage (Simplest)

For **very small projects**, you can skip vector DB entirely:

#### **Option A: JSON/Markdown Files + In-Memory**

**Concept**: Store embeddings in JSON files, load into memory

```
/docs
  /embeddings
    - documents.json    ({"id": "...", "text": "...", "embedding": [...], ...})
  /content
    - CLAUDE.md
    - README.md
    - architecture.md
```

**Setup**:
- Store embeddings as JSON
- Load on app startup (< 100ms for small sets)
- Use FAISS in-memory for search

**Pros**:
- ✅ Zero infrastructure
- ✅ Version control with git
- ✅ Simple to understand
- ✅ No database to manage
- ✅ Works offline completely

**Cons**:
- ❌ Manual updates required
- ❌ No concurrent updates
- ❌ Limited to files that fit in memory
- ❌ Not suitable for live content

**Best For**: Static documentation (yours!)
- CLAUDE.md is rarely updated
- Project list is static
- Perfect for read-mostly systems

---

#### **Option B: Large Context Window (No Vector DB)**

**Concept**: Feed entire documentation to LLM's context window

With Claude's 200K token window, you can:
1. Fit all your documentation in one context (CLAUDE.md, README, architecture)
2. Ask questions directly
3. Claude returns most relevant sections

**Pros**:
- ✅ Absolutely no infrastructure
- ✅ No embeddings needed
- ✅ Works with any LLM
- ✅ Super simple code (< 50 lines)

**Cons**:
- ❌ Costs API tokens per query
- ❌ Slower (LLM processes full context)
- ❌ Not suitable for 1M+ documents
- ❌ Latency: 1-2 seconds

**Cost Estimate**:
- 4,676 lines of your code (CLAUDE.md) ≈ 10K tokens
- Per query: ~15K tokens (input) + 500 tokens (output)
- Cost: ~$0.0045 per query with Claude

**Best For**: Quick MVP, small docs, infrequent queries

---

## Part 2: Embedding Models & Costs

### 2.1 Embedding Model Comparison

#### **Hosted/Cloud Options**

| Provider | Model | Cost | Quality | Dims | Offline | Setup |
|----------|-------|------|---------|------|---------|-------|
| **OpenAI** | text-embedding-3-small | $0.02/1M tokens | ⭐⭐⭐⭐⭐ | 1536 | ❌ | Instant |
| **Voyage AI** | voyage-3-lite | $0.05/1M tokens | ⭐⭐⭐⭐⭐ | 1024 | ❌ | Instant |
| **Cohere** | embed-english-v3.0 | $0.10/1M tokens | ⭐⭐⭐⭐ | 1024 | ❌ | Instant |

**Note**: Anthropic does NOT have its own embeddings. **Voyage AI is the recommended partner** for Anthropic users.

---

#### **Open-Source/Local Options** ⭐ Recommended for You

| Model | Size | Speed | Quality | Offline | Best For |
|-------|------|-------|---------|---------|----------|
| **all-MiniLM-L6-v2** | 22MB | ⚡ Fastest | ⭐⭐⭐⭐ | ✅ | Small docs |
| **BGE-M3** | 568MB | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ | ✅ | Best quality |
| **E5-Mistral-7B** | 14GB | ⚡⚡ Medium | ⭐⭐⭐⭐⭐ | ✅ | Multilingual |
| **nomic-embed-text** | 274MB | ⚡⚡⚡ Fast | ⭐⭐⭐⭐ | ✅ | Balanced |

---

### 2.2 Local Embedding Setup with Ollama

**Ollama** = Local LLM server (2023+, production-ready)

**Setup** (< 5 minutes):
```bash
# Install Ollama from https://ollama.ai
# Pull embedding model
ollama pull nomic-embed-text  # or: mxbai-embed-large, bge-m3

# Server runs on localhost:11434
curl http://localhost:11434/api/embed \
  -d '{
    "model": "nomic-embed-text",
    "input": "Your text here"
  }'
```

**Node.js Integration**:
```bash
npm install axios
```

```javascript
const axios = require('axios');

async function embed(text) {
  const response = await axios.post('http://localhost:11434/api/embed', {
    model: 'nomic-embed-text',
    input: text
  });
  return response.data.embedding; // 768 dimensions
}
```

**Pros**:
- ✅ Completely offline after first download
- ✅ No API costs
- ✅ Privacy (data never leaves machine)
- ✅ Fast (GPU-accelerated if available)
- ✅ Models: 22MB - 14GB (choose size)

**Cons**:
- ❌ Initial download: 200MB - 4GB
- ❌ ~0.5-2s per batch (slower than API)
- ❌ Requires GPU for speed (CPU works but slow)

---

### 2.3 Cost Analysis for Your Project

**Scenario**: Portfolio with 50 documents, 1000 queries/month

#### **Option A: Cloud API (OpenAI)**
```
Embeddings: 50 docs × 1.5K tokens = 75K tokens = $0.0015
Queries: 1000 × 15K tokens = 15M tokens = $0.30
Total/month: ~$0.30 (negligible)
```

#### **Option B: Ollama (Local)**
```
Initial cost: One-time download (4.7GB for BGE-M3)
Monthly cost: $0 (after setup)
Total investment: ~2 hours setup + 10 minutes learning
```

**Recommendation**: For your portfolio, **use Ollama** (free after setup)

---

## Part 3: Recommended Architecture Decisions

### 3.1 For Your Portfolio Documentation System

**Best Path**: **ChromaDB + Voyage AI (or local Ollama)**

#### **Why This Combo**:

1. **ChromaDB**: Minimal setup, perfect for your documentation scale
2. **Embeddings**: Choose based on infrastructure:
   - **API** (easy): Voyage AI ($0.05/1M tokens for Anthropic users)
   - **Local** (free): Ollama + nomic-embed-text (272MB download)

#### **Full Stack**:
```
Your Portfolio
├── CLAUDE.md (4,676 lines)
├── README.md
├── ARCHITECTURE.md
└── All project descriptions
        ↓
    Embed with Ollama
        ↓
    Store in ChromaDB
        ↓
    Query interface (Next.js/React)
        ↓
    Retrieve docs → Send to Claude API
        ↓
    Return AI-powered answer
```

---

### 3.2 Alternative: Hybrid Search (For Quality)

If documentation search needs both:
- **Semantic matching** ("What components are animations?")
- **Exact keyword matching** ("Where is Cursor.jsx?")

**Use Hybrid Search**:
```
Documents
├── Full-text index (BM25) — Fast keyword search
└── Vector index (embeddings) — Semantic search

Query
├── Search both indexes
└── Fuse results (rank by relevance)
```

**Implementation Options**:

**Option 1**: PostgreSQL + pgvector (if you want SQL simplicity)
```sql
-- Both keyword + vector search in one DB
SELECT id, text,
       1 - (embedding <=> query_embedding) as similarity
FROM documents
WHERE to_tsvector(text) @@ plainto_tsquery('cursor')
  OR (1 - (embedding <=> query_embedding)) > 0.7
ORDER BY similarity DESC;
```

**Option 2**: Milvus 2.5 (if you want native BM25)
```python
# Built-in hybrid search combining sparse (BM25) + dense (vector)
results = milvus.search(
    collection_name="docs",
    data=query_embedding,
    anns_field="embedding",
    search_params={"reranker": "rrf"},  # Reciprocal Rank Fusion
    limit=10
)
```

**Option 3**: Qdrant + Weaviate (enterprise option)
- Both support hybrid search natively
- Slower setup than simple vector-only

**Recommendation**: For portfolio docs, **skip hybrid** — vector search alone is sufficient.

---

## Part 4: Implementation Comparison Matrix

### Setup Complexity vs Features

```
COMPLEXITY ↑
        │
        │  Milvus      Qdrant
        │   (Overkill)
        │
        │              PostgreSQL + pgvector
        │              (Good balance)
        │
        │  ChromaDB    (Recommended)
        │
        │              FAISS
        │              (Fastest)
        │
        └─────────────────────────────→ TIME TO PRODUCTION
          5min  15min   30min  1hr  2hr+

RECOMMENDATION: Start with ChromaDB, migrate to pgvector if needed
```

---

### Cost Projection (1-Year)

| Solution | Setup | API/Month | Hosting | Tools | Total |
|----------|-------|-----------|---------|-------|-------|
| **ChromaDB + OpenAI** | 0h | $0.30 | $0 (free tier) | Free | **$3.60/yr** |
| **ChromaDB + Ollama** | 30m | $0 | $0 | Free | **1 Coffee** |
| **PostgreSQL + pgvector** | 2h | $0 | $10/mo (managed) | Free | **$120/yr** |
| **Qdrant Cloud** | 1h | $0.50 | $25/mo | Free | **$300/yr** |
| **Milvus (self-hosted)** | 4h | $0 | $50/mo (infra) | Free | **$600/yr** |

---

## Part 5: Node.js Integration Examples

### 5.1 ChromaDB + Node.js

```bash
npm install chromadb axios
```

```javascript
// embed-docs.js - One-time setup
const { ChromaClient } = require("chromadb");
const axios = require('axios');

async function embedDocuments() {
  const client = new ChromaClient();

  // Create collection
  const collection = await client.createCollection({
    name: "portfolio-docs",
    metadata: { "hnsw:space": "cosine" }
  });

  // Sample documents
  const docs = [
    {
      id: "claude-md",
      text: "CLAUDE.md: Comprehensive AI guide for the portfolio...",
      metadata: { source: "CLAUDE.md", type: "guide" }
    },
    {
      id: "architecture",
      text: "App.jsx: Root application container with routing...",
      metadata: { source: "ARCHITECTURE.md", type: "architecture" }
    }
    // ... more docs
  ];

  // Add documents (ChromaDB handles embeddings)
  await collection.add({
    ids: docs.map(d => d.id),
    documents: docs.map(d => d.text),
    metadatas: docs.map(d => d.metadata)
  });

  console.log('Documents embedded!');
}

embedDocuments();
```

```javascript
// query-docs.js - Runtime queries
const { ChromaClient } = require("chromadb");

async function searchDocs(query) {
  const client = new ChromaClient();
  const collection = await client.getCollection({ name: "portfolio-docs" });

  const results = await collection.query({
    query_texts: [query],
    n_results: 3
  });

  return results.documents[0]; // Top 3 matching docs
}

// Use with Claude
const Anthropic = require("@anthropic-ai/sdk");

async function ragQuery(userQuestion) {
  // Retrieve relevant docs
  const relevantDocs = await searchDocs(userQuestion);

  // Send to Claude with context
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `
          Context from portfolio docs:
          ${relevantDocs.join('\n')}

          Question: ${userQuestion}
        `
      }
    ]
  });

  return response.content[0].text;
}

// Example usage
ragQuery("Where is the Cursor component defined?")
  .then(answer => console.log(answer));
```

---

### 5.2 Local Embeddings with Ollama + FAISS

```bash
npm install axios dotenv
# Python: pip install faiss-cpu sentence-transformers
```

```javascript
// setup-local-embeddings.js
const fs = require('fs');
const axios = require('axios');

async function embedWithOllama(text) {
  try {
    const response = await axios.post('http://localhost:11434/api/embed', {
      model: 'nomic-embed-text',
      input: text
    });
    return response.data.embedding;
  } catch (error) {
    console.error('Ollama error:', error.message);
    throw new Error('Make sure Ollama is running: ollama serve');
  }
}

async function createEmbeddingIndex() {
  const docs = [
    { id: 'cursor', text: fs.readFileSync('src/Cursor.jsx', 'utf-8') },
    { id: 'line', text: fs.readFileSync('src/components/Line.jsx', 'utf-8') },
    { id: 'app', text: fs.readFileSync('src/App.jsx', 'utf-8') }
  ];

  const embeddings = {
    documents: docs,
    vectors: []
  };

  for (const doc of docs) {
    console.log(`Embedding ${doc.id}...`);
    const vector = await embedWithOllama(doc.text);
    embeddings.vectors.push(vector);
  }

  // Save embeddings to file
  fs.writeFileSync(
    'embeddings.json',
    JSON.stringify(embeddings, null, 2)
  );

  console.log('Embeddings saved to embeddings.json');
}

createEmbeddingIndex();
```

```javascript
// query-with-faiss.js - Use FAISS via Python server
const axios = require('axios');
const fs = require('fs');

async function queryDocuments(query) {
  // Get embedding for query
  const queryEmbedding = await axios.post('http://localhost:11434/api/embed', {
    model: 'nomic-embed-text',
    input: query
  });

  // Send to Python FAISS server
  const results = await axios.post('http://localhost:5000/search', {
    query: queryEmbedding.data.embedding,
    k: 3
  });

  return results.data.matches;
}
```

**Python Server (for FAISS):**
```python
# faiss_server.py
from flask import Flask, request, jsonify
import faiss
import numpy as np
import json

app = Flask(__name__)

# Load embeddings
with open('embeddings.json') as f:
    data = json.load(f)

vectors = np.array(data['vectors']).astype('float32')
docs = data['documents']

# Create FAISS index
index = faiss.IndexFlatL2(vectors.shape[1])
index.add(vectors)

@app.route('/search', methods=['POST'])
def search():
    query = np.array(request.json['query']).reshape(1, -1).astype('float32')
    k = request.json.get('k', 3)

    distances, indices = index.search(query, k)

    matches = [
        {
            'id': docs[i]['id'],
            'text': docs[i]['text'][:500],
            'distance': float(distances[0][j])
        }
        for j, i in enumerate(indices[0])
    ]

    return jsonify({'matches': matches})

if __name__ == '__main__':
    app.run(port=5000)
```

---

## Part 6: Recommendations & Decision Tree

### For Johnny's Portfolio

```
                    ┌─ Need offline? ──→ YES ──→ Ollama + FAISS (Free)
                    │
          Start here│                            OR
                    │
                    └─ Need easy setup? ──→ YES ──→ ChromaDB (< 5min)
                            │
                            NO
                            │
                    Need SQL + docs? ──→ YES ──→ PostgreSQL + pgvector
                            │
                            NO
                            │
              Scale > 50M docs? ──→ YES ──→ Qdrant or Milvus
                            │
                            NO
                            │
                         Use ──→ ChromaDB (simple, perfect)
```

---

### Final Recommendation: **The "Bootstrap" Stack

**Phase 1: MVP (Week 1)**
- ✅ Text-based RAG (no vector DB)
- Concatenate docs → Claude's context window
- 50 lines of code
- Cost: $0.01/query
- Time: 2 hours

**Code Example**:
```javascript
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

async function searchPortfolio(question) {
  const claudeMd = fs.readFileSync('CLAUDE.md', 'utf-8');
  const readmeMd = fs.readFileSync('README.md', 'utf-8');

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: `You are a helpful assistant for Johnny Sheng's portfolio.
             Answer questions using the provided documentation.`,
    messages: [{
      role: "user",
      content: `
Documentation:
${claudeMd}
${readmeMd}

Question: ${question}
      `
    }]
  });

  return response.content[0].text;
}
```

---

**Phase 2: Production (Week 2-3)**
- ✅ Add ChromaDB for faster retrieval
- Embed docs once, query instantly
- 2 hours setup
- Cost: $0 (Ollama) or $0.0001/query (Voyage AI)

---

**Phase 3: Scale (Later, if needed)**
- ✅ Migrate to PostgreSQL + pgvector
- Add hybrid search
- Maintain all existing code

---

## Part 7: Quick Start Checklist

### For Immediate Integration:

**Option A: Fastest (Text-based RAG)**
- [ ] Read Anthropic "Contextual Retrieval" (see sources)
- [ ] Implement Phase 1 code above
- [ ] Test with portfolio docs
- **Time**: 30 minutes
- **Cost**: $0.01-0.10/month

**Option B: Recommended (ChromaDB + Local)**
- [ ] Install Ollama (https://ollama.ai)
- [ ] Run: `ollama pull nomic-embed-text`
- [ ] Install ChromaDB: `npm install chromadb`
- [ ] Use code example from Section 5.1
- [ ] Test with your 5 main docs
- **Time**: 90 minutes
- **Cost**: $0

**Option C: API-Based (Easiest Cloud)**
- [ ] Get Voyage AI API key ($0.05/1M tokens)
- [ ] Use with Claude API
- [ ] ChromaDB auto-manages embeddings
- **Time**: 45 minutes
- **Cost**: $0.30-1/month

---

## Part 8: Troubleshooting & Common Issues

### Issue: "Ollama connection refused"
**Solution**: Make sure Ollama is running
```bash
# Start Ollama server (background)
ollama serve

# In another terminal, check it's working:
curl http://localhost:11434/api/tags
```

### Issue: "Vector dimension mismatch"
**Solution**: All embeddings must have same dimension
- OpenAI: 1536
- Voyage AI: 1024
- Nomic: 768
- BGE-M3: 1024

### Issue: "ChromaDB slow with large collections"
**Solution**: Use FAISS for > 1M vectors, or switch to Qdrant

### Issue: "Token limit exceeded in Claude query"
**Solution**:
- Option A: Use vector DB to get smaller doc set
- Option B: Use 200K window more efficiently
- Option C: Use Claude Haiku (cheaper, faster)

---

## Part 9: Production Checklist

Before deploying a RAG feature:

- [ ] Embeddings cached and versioned
- [ ] Vector DB backed up daily
- [ ] Query latency monitored (target < 500ms)
- [ ] Cost per query tracked
- [ ] Fallback if vector DB down (use direct Claude API)
- [ ] Security: No sensitive data in vectors
- [ ] Update strategy (how to re-embed new docs?)
- [ ] Testing with real user queries
- [ ] Rate limiting implemented
- [ ] Error handling for API timeouts

---

## Summary Table: Quick Reference

| Need | Solution | Setup | Cost | Best For |
|------|----------|-------|------|----------|
| Prototype fast | Text-based RAG | 30min | $0.01/mo | MVP |
| Local + free | Ollama + FAISS | 90min | $0 | Offline |
| Balanced | ChromaDB + Voyage | 45min | $1-5/mo | Production |
| Hybrid search | pgvector + BM25 | 2hr | $10/mo | Advanced |
| Scale massively | Qdrant Cloud | 1hr | $25+/mo | Enterprise |

---

## Resources & Further Reading

### Official Documentation
- [ChromaDB Docs](https://docs.trychroma.com/)
- [Voyage AI Embeddings](https://docs.voyageai.com/embedding/)
- [Ollama Models](https://ollama.ai/library)
- [FAISS Tutorials](https://github.com/facebookresearch/faiss/wiki)
- [pgvector Getting Started](https://github.com/pgvector/pgvector)

### Key Research Papers (2024-2025)
- Anthropic: [Contextual Retrieval in AI Systems](https://www.anthropic.com/engineering/contextual-retrieval)
- ChromaDB 2025 Rewrite: Rust core for 4x performance
- Milvus 2.5: Native BM25 + Sparse vectors
- Qdrant 2025: 24x compression with asymmetric quantization

### Recommended Blog Posts
- [LiquidMetal AI: Vector Database Comparison 2025](https://liquidmetal.ai/casesAndBlogs/vector-comparison/)
- [Weaviate: Hybrid Search Explained](https://weaviate.io/blog/hybrid-search-explained)
- [Zilliz: Cost of Open Source Vector Databases](https://zilliz.com/blog/cost-of-open-source-vector-databases-an-engineer-guide)

---

## Conclusion

**For your portfolio documentation system**, I recommend:

### ✅ **Recommended Stack**:
1. **Storage**: ChromaDB (minimal setup)
2. **Embeddings**: Ollama + nomic-embed-text (free, offline)
3. **Search**: Vector similarity (no hybrid needed)
4. **Integration**: Node.js with simple fetch

### ✅ **Why**:
- ⚡ Fast: 20ms query latency
- 💰 Free: No API costs
- 🔒 Offline: Works without internet
- 📦 Small: 272MB total (embeddings model)
- 🚀 Simple: 100 lines of code

### ✅ **Total Setup Time**: ~90 minutes

---

**Document Created**: 2025-11-22
**Research Sources**: 25+ current articles and documentation (see links below)
