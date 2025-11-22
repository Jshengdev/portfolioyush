# RAG Quick Start Guide
## Get Started in 30 Minutes

For your portfolio documentation system, here are the three solutions ranked by complexity:

---

## 1. SIMPLEST: Text-Based RAG (30 minutes)

### Setup

```bash
npm install @anthropic-ai/sdk dotenv
```

### Code

```javascript
// rag.js
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

async function searchDocs(question) {
  const docs = fs.readFileSync('CLAUDE.md', 'utf-8');

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: "Answer questions about Johnny Sheng's portfolio using the provided documentation.",
    messages: [{
      role: "user",
      content: `Documentation:\n${docs}\n\nQuestion: ${question}`
    }]
  });

  return response.content[0].text;
}

// Run
searchDocs("Where is the Cursor component?")
  .then(answer => console.log(answer));
```

### Cost
- **Setup**: 30 minutes
- **Monthly**: ~$0.50-5 (depends on usage)
- **Speed**: 1-2 seconds per query

### When to Use
✅ Perfect for your portfolio documentation
✅ No database needed
✅ Works with 1-10MB of docs

---

## 2. RECOMMENDED: ChromaDB + Ollama (90 minutes)

### Install

```bash
# Node.js
npm install chromadb axios

# Python embedding server (Ollama)
# Download from https://ollama.ai
# Then: ollama pull nomic-embed-text
```

### Start Ollama

```bash
# Terminal 1
ollama serve
```

### One-Time Setup (Terminal 2)

```bash
# Embed your docs
node embed-and-search.js --embed
```

### Code

```javascript
// embed-and-search.js
const axios = require('axios');
const fs = require('fs');
const { ChromaClient } = require('chromadb');
const Anthropic = require('@anthropic-ai/sdk');

// Embed documents with Ollama
async function embedDocs() {
  const client = new ChromaClient();
  const collection = await client.getOrCreateCollection({
    name: 'portfolio'
  });

  const docs = [
    { id: '1', text: fs.readFileSync('CLAUDE.md', 'utf-8') },
    { id: '2', text: fs.readFileSync('README.md', 'utf-8') },
    { id: '3', text: fs.readFileSync('ARCHITECTURE.md', 'utf-8') }
  ];

  for (const doc of docs) {
    // Get embedding from Ollama
    const response = await axios.post('http://localhost:11434/api/embed', {
      model: 'nomic-embed-text',
      input: doc.text
    });

    // Add to ChromaDB
    await collection.add({
      ids: [doc.id],
      embeddings: [response.data.embedding],
      documents: [doc.text]
    });
  }

  console.log('✓ Documents embedded');
}

// Search and answer
async function search(query) {
  const client = new ChromaClient();
  const collection = await client.getCollection({ name: 'portfolio' });

  // Get query embedding
  const response = await axios.post('http://localhost:11434/api/embed', {
    model: 'nomic-embed-text',
    input: query
  });

  // Search
  const results = await collection.query({
    query_embeddings: [response.data.embedding],
    n_results: 3
  });

  const context = results.documents[0].join('\n\n');

  // Ask Claude
  const anthropic = new Anthropic();
  const answer = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Context:\n${context}\n\nQuestion: ${query}`
    }]
  });

  return answer.content[0].text;
}

// CLI
if (process.argv[2] === '--embed') {
  embedDocs().catch(console.error);
} else if (process.argv[2]) {
  const query = process.argv.slice(2).join(' ');
  search(query).then(answer => console.log(answer));
} else {
  console.log('Usage: node rag.js [--embed|<query>]');
}
```

### Run

```bash
# First time: embed docs
node embed-and-search.js --embed

# Then: ask questions
node embed-and-search.js "Where is Line.jsx?"
```

### Cost
- **Setup**: 90 minutes
- **Monthly**: $0 (completely free after Ollama download)
- **Speed**: ~20ms search + ~1sec Claude response

### Why This?
✅ **Fastest**: 20ms vector search
✅ **Free**: $0/month
✅ **Offline**: Works without internet
✅ **Best UX**: Real retrieval-based search

---

## 3. PRODUCTION: PostgreSQL + pgvector

### Setup

```bash
# Start PostgreSQL
brew services start postgresql@15

# Enable pgvector
psql -d postgres -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Schema

```sql
CREATE TABLE docs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  embedding vector(768)
);
CREATE INDEX ON docs USING ivfflat (embedding vector_cosine_ops);
```

### Query

```javascript
const { Pool } = require('pg');

async function search(query) {
  const pool = new Pool({
    connectionString: 'postgresql://localhost/yourdb'
  });

  // Get embedding
  const embResponse = await axios.post('http://localhost:11434/api/embed', {
    model: 'nomic-embed-text',
    input: query
  });

  // Search
  const result = await pool.query(
    'SELECT content FROM docs ORDER BY embedding <=> $1 LIMIT 3',
    [embResponse.data.embedding]
  );

  // Return to Claude
  const context = result.rows.map(r => r.content).join('\n');
  // ... send to Claude API
}
```

### Cost
- **Setup**: 4 hours
- **Monthly**: $10-50 (for managed PostgreSQL)
- **Speed**: 100-500ms queries

---

## Decision Tree

```
Need something NOW? → Solution 1 (Text-based)
                        ✅ 30 minutes
                        ✅ $0.01/query

Need speed + free? → Solution 2 (ChromaDB + Ollama)
                        ✅ 90 minutes
                        ✅ 20ms search
                        ✅ $0/month

Need production → Solution 3 (PostgreSQL + pgvector)
ready?              ✅ 4 hours
                    ✅ Scales to millions
                    ✅ Hybrid search
```

---

## My Recommendation for Your Portfolio

**Start with Solution 1** (text-based):
- Takes 30 minutes
- Costs almost nothing
- Perfect for portfolio docs

**After 2 weeks**, upgrade to **Solution 2** (ChromaDB + Ollama):
- Takes 1 hour to upgrade
- Much faster search (20ms vs 2sec)
- Completely free

**If docs grow** (100K+ vectors), move to **Solution 3** (PostgreSQL):
- Not needed for years probably
- More infrastructure overhead

---

## Testing

```bash
# Solution 1 - Quick test
node rag.js "What components are used?"

# Solution 2 - Full example
node embed-and-search.js --embed
node embed-and-search.js "How does the cursor work?"

# Solution 3 - SQL test
psql -c "SELECT COUNT(*) FROM docs;"
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `ECONNREFUSED` (Ollama) | Run `ollama serve` first |
| Token limit exceeded | Use vector DB instead of text-based |
| Slow searches | Make sure ChromaDB is indexed |
| Missing `nodemon`? | Install: `npm install -D nodemon` |

---

## Next Steps

1. Pick **Solution 1** (easiest)
2. Run it once to test
3. Decide if you want to upgrade later

Total time to working RAG: **30 minutes** ⚡

See full details in: `RAG_RESEARCH.md`
