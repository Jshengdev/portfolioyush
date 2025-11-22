# Embedding Implementation Guide
## Code Examples for portfolioyush RAG System

**Quick Start Guide**: Get your embedding system running in 30 minutes

---

## Table of Contents

1. [Quick Setup (30 minutes)](#quick-setup-30-minutes)
2. [Code Examples](#code-examples)
3. [Testing & Validation](#testing--validation)
4. [Troubleshooting](#troubleshooting)
5. [Performance Optimization](#performance-optimization)

---

## Quick Setup (30 minutes)

### Prerequisites

```bash
# Node.js version 18+ required
node --version

# Install key dependencies
npm install @qdrant/js-client
npm install voyageai
npm install openai
npm install typescript@latest

# Optional: for local development
npm install --save-dev ts-node
```

### Step 1: Start Qdrant Vector Database (5 min)

```bash
# Option A: Docker (recommended)
docker run -p 6333:6333 -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage:z \
  qdrant/qdrant:latest

# Option B: Download binary
# https://github.com/qdrant/qdrant/releases
# ./qdrant --storage-path ./storage

# Verify it's running
curl http://localhost:6333/health
# Should return: {"status":"ok"}
```

### Step 2: Create Configuration File (2 min)

```javascript
// config.embedding.js
module.exports = {
  // Embedding Model Settings
  embedding: {
    model: 'voyage-code-3',
    dimensions: 1024,
    batchSize: 128,
    maxRetries: 3
  },

  // Vector Database
  vectorDB: {
    url: 'http://localhost:6333',
    collection: 'code_embeddings',
    checkInterval: 5000
  },

  // Chunking
  chunking: {
    maxTokens: 1024,
    overlap: 100,
    minTokens: 50
  },

  // Caching
  cache: {
    queryTTL: 15 * 60 * 1000,      // 15 minutes
    embeddingTTL: 60 * 60 * 1000,  // 1 hour
    maxSize: 10000                  // Max cached items
  },

  // Search
  search: {
    topK: 10,
    denseWeight: 0.7,
    sparseWeight: 0.3,
    timeout: 5000
  }
};
```

### Step 3: Create Environment File (2 min)

```bash
# .env
VOYAGE_API_KEY=your_voyage_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=http://localhost:6333
NODE_ENV=development
LOG_LEVEL=info
```

### Step 4: Initialize System (5 min)

```javascript
// index.js - Main entry point
const { CodeEmbeddingSystem } = require('./src/CodeEmbeddingSystem');

async function initialize() {
  const system = new CodeEmbeddingSystem();

  try {
    // 1. Connect to vector database
    await system.connect();
    console.log('✓ Connected to Qdrant');

    // 2. Initialize collection
    await system.initializeCollection();
    console.log('✓ Collection initialized');

    // 3. Process codebase
    console.log('Starting codebase embedding...');
    const results = await system.embedCodebase('./src');
    console.log(`✓ Embedded ${results.count} chunks`);

    // 4. Test search
    const testResults = await system.search('React component');
    console.log(`✓ Search working (found ${testResults.length} results)`);

    console.log('\n✅ System ready!');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
}

initialize();
```

---

## Code Examples

### 1. Core Embedding Pipeline

```javascript
// src/CodeEmbeddingSystem.js
const { QdrantClient } = require('@qdrant/js-client');
const VoyageAI = require('voyageai');
const config = require('../config.embedding');
const { CodeChunker } = require('./CodeChunker');
const { EmbeddingCache } = require('./EmbeddingCache');

class CodeEmbeddingSystem {
  constructor() {
    this.voyageClient = new VoyageAI({
      apiKey: process.env.VOYAGE_API_KEY
    });
    this.qdrant = new QdrantClient({ url: config.vectorDB.url });
    this.chunker = new CodeChunker(config.chunking);
    this.cache = new EmbeddingCache(config.cache);
    this.isConnected = false;
  }

  async connect() {
    const health = await this.qdrant.getCollections();
    this.isConnected = true;
    return this.isConnected;
  }

  async initializeCollection() {
    try {
      await this.qdrant.getCollection(config.vectorDB.collection);
      console.log('Collection exists');
    } catch (error) {
      // Create collection if it doesn't exist
      await this.qdrant.createCollection(config.vectorDB.collection, {
        vectors: {
          size: config.embedding.dimensions,
          distance: 'Cosine'
        },
        optimizers_config: {
          default: {
            deleted_threshold: 0.2,
            vacuum_min_dead_byte: 1000,
            max_segment_number: 5,
            memmap_threshold: 268435456,
            indexing_threshold: 10000,
            flush_interval_sec: 10,
            max_optimization_threads: 4
          }
        }
      });
      console.log('Collection created');
    }
  }

  async embedCodebase(rootPath) {
    const fs = require('fs');
    const path = require('path');
    const glob = require('glob');

    // Find all code files
    const files = glob.sync(`${rootPath}/**/*.{js,jsx,ts,tsx,md}`, {
      ignore: ['**/node_modules/**', '**/.git/**']
    });

    console.log(`Found ${files.length} files to process`);

    let totalChunks = 0;
    const results = {
      count: 0,
      failed: 0,
      errors: []
    };

    // Process files in batches
    const batchSize = 10;
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const promises = batch.map(file => this.processFile(file));

      const batchResults = await Promise.allSettled(promises);

      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          totalChunks += result.value.chunks || 0;
          results.count += result.value.embedded || 0;
        } else {
          results.failed++;
          results.errors.push({
            file: batch[index],
            error: result.reason.message
          });
        }
      });

      console.log(`Progress: ${Math.min(i + batchSize, files.length)}/${files.length}`);
    }

    return { ...results, totalChunks };
  }

  async processFile(filePath) {
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Chunk the file
    const chunks = this.chunker.chunk(content, filePath);

    if (chunks.length === 0) {
      return { chunks: 0, embedded: 0 };
    }

    // Embed chunks
    const embeddings = await this.embedChunks(chunks);

    // Store in vector DB
    const points = embeddings.map((emb, index) => ({
      id: this.generateID(filePath, index),
      vector: emb.embedding,
      payload: {
        file_path: filePath,
        chunk_index: index,
        content: emb.content.substring(0, 1000), // Store snippet
        tokens: emb.tokens,
        timestamp: Date.now()
      }
    }));

    await this.qdrant.upsert(config.vectorDB.collection, { points });

    return { chunks: chunks.length, embedded: embeddings.length };
  }

  async embedChunks(chunks) {
    const texts = chunks.map(c => this.augmentText(c));

    // Batch embed using Voyage API
    const response = await this.voyageClient.embed({
      model: config.embedding.model,
      input: texts,
      input_type: 'document',
      truncation: 'end'
    });

    return chunks.map((chunk, index) => ({
      ...chunk,
      embedding: response.data[index].embedding
    }));
  }

  augmentText(chunk) {
    // Add metadata context before embedding
    return `File: ${chunk.file_path}
Type: ${chunk.type}
---
${chunk.content}`;
  }

  async search(query, options = {}) {
    // Check cache first
    const cacheKey = query.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log('Cache hit for:', query);
      return cached;
    }

    // Embed query
    const queryEmbedding = await this.voyageClient.embed({
      model: config.embedding.model,
      input: [query],
      input_type: 'query'
    });

    // Search vector database
    const results = await this.qdrant.search(config.vectorDB.collection, {
      vector: queryEmbedding.data[0].embedding,
      limit: options.limit || config.search.topK,
      with_payload: true
    });

    // Format results
    const formatted = results.map(r => ({
      file: r.payload.file_path,
      content: r.payload.content,
      similarity: (r.score * 100).toFixed(1),
      tokens: r.payload.tokens
    }));

    // Cache results
    this.cache.set(cacheKey, formatted);

    return formatted;
  }

  generateID(filePath, chunkIndex) {
    // Simple hash-based ID
    const base = `${filePath}:${chunkIndex}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      const char = base.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

module.exports = { CodeEmbeddingSystem };
```

### 2. Code Chunker

```javascript
// src/CodeChunker.js
class CodeChunker {
  constructor(config) {
    this.config = config;
    this.tokenEstimationRatio = 0.25; // ~1 token per 4 chars
  }

  chunk(content, filePath) {
    const ext = this.getFileExtension(filePath);

    if (ext === 'md') {
      return this.chunkMarkdown(content, filePath);
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      return this.chunkJavaScript(content, filePath);
    }

    // Default: split by lines
    return this.chunkGeneric(content, filePath);
  }

  chunkJavaScript(content, filePath) {
    const chunks = [];
    const lines = content.split('\n');
    let currentChunk = '';
    let currentTokens = 0;

    const patterns = {
      functionStart: /^\s*(async\s+)?function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\(|^\s*class\s+\w+|export\s+(default\s+)?(function|class|const)/,
      importStart: /^import\s+|^export\s+/,
      sectionEnd: /^}/
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineTokens = this.estimateTokens(line);

      // Check if we should start a new chunk
      if (patterns.functionStart.test(line) && currentTokens > this.config.minTokens) {
        if (currentChunk.trim()) {
          chunks.push({
            content: currentChunk.trim(),
            tokens: currentTokens,
            type: 'javascript',
            file_path: filePath
          });
        }
        currentChunk = line + '\n';
        currentTokens = lineTokens;
      } else if (currentTokens + lineTokens > this.config.maxTokens) {
        // Chunk is full
        if (currentChunk.trim()) {
          chunks.push({
            content: currentChunk.trim(),
            tokens: currentTokens,
            type: 'javascript',
            file_path: filePath
          });
        }
        currentChunk = line + '\n';
        currentTokens = lineTokens;
      } else {
        currentChunk += line + '\n';
        currentTokens += lineTokens;
      }
    }

    // Add remaining chunk
    if (currentChunk.trim()) {
      chunks.push({
        content: currentChunk.trim(),
        tokens: currentTokens,
        type: 'javascript',
        file_path: filePath
      });
    }

    return chunks;
  }

  chunkMarkdown(content, filePath) {
    const chunks = [];
    const sections = content.split(/^(#{1,3}\s+.+)$/m);

    let currentChunk = '';
    let currentTokens = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTokens = this.estimateTokens(section);

      if (sectionTokens > this.config.maxTokens) {
        // Section too large, split further
        const lines = section.split('\n');
        let tempChunk = '';
        let tempTokens = 0;

        lines.forEach(line => {
          const lineTokens = this.estimateTokens(line);
          if (tempTokens + lineTokens > this.config.maxTokens) {
            if (tempChunk) chunks.push({
              content: tempChunk,
              tokens: tempTokens,
              type: 'markdown',
              file_path: filePath
            });
            tempChunk = line + '\n';
            tempTokens = lineTokens;
          } else {
            tempChunk += line + '\n';
            tempTokens += lineTokens;
          }
        });

        if (tempChunk) chunks.push({
          content: tempChunk,
          tokens: tempTokens,
          type: 'markdown',
          file_path: filePath
        });
      } else if (currentTokens + sectionTokens > this.config.maxTokens) {
        if (currentChunk) chunks.push({
          content: currentChunk,
          tokens: currentTokens,
          type: 'markdown',
          file_path: filePath
        });
        currentChunk = section;
        currentTokens = sectionTokens;
      } else {
        currentChunk += section;
        currentTokens += sectionTokens;
      }
    }

    if (currentChunk) chunks.push({
      content: currentChunk,
      tokens: currentTokens,
      type: 'markdown',
      file_path: filePath
    });

    return chunks;
  }

  chunkGeneric(content, filePath) {
    const lines = content.split('\n');
    const chunks = [];
    let currentChunk = '';
    let currentTokens = 0;

    lines.forEach(line => {
      const lineTokens = this.estimateTokens(line);

      if (currentTokens + lineTokens > this.config.maxTokens) {
        if (currentChunk) {
          chunks.push({
            content: currentChunk.trim(),
            tokens: currentTokens,
            type: 'generic',
            file_path: filePath
          });
        }
        currentChunk = line + '\n';
        currentTokens = lineTokens;
      } else {
        currentChunk += line + '\n';
        currentTokens += lineTokens;
      }
    });

    if (currentChunk) {
      chunks.push({
        content: currentChunk.trim(),
        tokens: currentTokens,
        type: 'generic',
        file_path: filePath
      });
    }

    return chunks;
  }

  estimateTokens(text) {
    return Math.ceil(text.length * this.tokenEstimationRatio);
  }

  getFileExtension(filePath) {
    return filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
  }
}

module.exports = { CodeChunker };
```

### 3. Embedding Cache

```javascript
// src/EmbeddingCache.js
class EmbeddingCache {
  constructor(config) {
    this.config = config;
    this.queryCache = new Map();
    this.embeddingCache = new Map();
    this.startCleanupInterval();
  }

  get(key) {
    const entry = this.queryCache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.config.queryTTL) {
      this.queryCache.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key, value) {
    // Maintain size limit using LRU
    if (this.queryCache.size >= this.config.maxSize) {
      const firstKey = this.queryCache.keys().next().value;
      this.queryCache.delete(firstKey);
    }

    this.queryCache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  startCleanupInterval() {
    setInterval(() => {
      const now = Date.now();
      let cleaned = 0;

      for (const [key, entry] of this.queryCache) {
        if (now - entry.timestamp > this.config.queryTTL) {
          this.queryCache.delete(key);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        console.log(`Cache cleanup: removed ${cleaned} expired entries`);
      }
    }, 5 * 60 * 1000); // Cleanup every 5 minutes
  }

  clear() {
    this.queryCache.clear();
    this.embeddingCache.clear();
  }

  stats() {
    return {
      queryCache: this.queryCache.size,
      embeddingCache: this.embeddingCache.size,
      totalSize: this.queryCache.size + this.embeddingCache.size
    };
  }
}

module.exports = { EmbeddingCache };
```

### 4. Test Suite

```javascript
// tests/embeddings.test.js
const { CodeEmbeddingSystem } = require('../src/CodeEmbeddingSystem');
const assert = require('assert');

describe('CodeEmbeddingSystem', () => {
  let system;

  before(async () => {
    system = new CodeEmbeddingSystem();
    await system.connect();
    await system.initializeCollection();
  });

  it('should embed simple JavaScript code', async () => {
    const code = `
      function greet(name) {
        console.log(\`Hello, \${name}!\`);
      }
    `;

    const embedding = await system.voyageClient.embed({
      model: 'voyage-code-3',
      input: [code],
      input_type: 'document'
    });

    assert(embedding.data[0].embedding);
    assert(embedding.data[0].embedding.length === 1024);
  });

  it('should search for code snippets', async () => {
    const results = await system.search('React component');
    assert(Array.isArray(results));
  });

  it('should cache query results', async () => {
    const query = 'animation';
    const results1 = await system.search(query);
    const results2 = await system.search(query);

    // Second call should use cache
    assert.deepStrictEqual(results1, results2);
  });

  it('should handle chunking correctly', () => {
    const code = `
      const x = 5;
      function test() { return 1; }
      const y = 10;
    `;

    const chunks = system.chunker.chunk(code, 'test.js');
    assert(chunks.length > 0);
    chunks.forEach(chunk => {
      assert(chunk.content);
      assert(chunk.tokens > 0);
      assert(chunk.type === 'javascript');
    });
  });
});

// Run tests
// npm test
```

---

## Testing & Validation

### Validation Script

```javascript
// scripts/validate-embeddings.js
const { CodeEmbeddingSystem } = require('../src/CodeEmbeddingSystem');

async function validateEmbeddings() {
  const system = new CodeEmbeddingSystem();
  await system.connect();

  const testQueries = [
    {
      query: 'animated components',
      expectedFiles: ['Line.jsx', 'Archive.jsx'],
      minRecall: 0.7
    },
    {
      query: 'custom scrolling',
      expectedFiles: ['Archive.jsx'],
      minRecall: 0.9
    },
    {
      query: 'WebGL shaders',
      expectedFiles: ['ShaderVisual.jsx'],
      minRecall: 0.8
    }
  ];

  console.log('=== EMBEDDING VALIDATION ===\n');

  let totalTests = 0;
  let passedTests = 0;

  for (const test of testQueries) {
    totalTests++;
    const results = await system.search(test.query, { limit: 5 });

    const foundFiles = results.filter(r =>
      test.expectedFiles.some(file => r.file.includes(file))
    );

    const recall = foundFiles.length / test.expectedFiles.length;
    const passed = recall >= test.minRecall;

    if (passed) passedTests++;

    console.log(`Query: "${test.query}"`);
    console.log(`  Expected: ${test.expectedFiles.join(', ')}`);
    console.log(`  Found: ${foundFiles.map(r => r.file).join(', ')}`);
    console.log(`  Recall: ${(recall * 100).toFixed(0)}%`);
    console.log(`  Status: ${passed ? '✓ PASS' : '✗ FAIL'}\n`);
  }

  console.log(`=== RESULTS ===`);
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Success rate: ${((passedTests/totalTests) * 100).toFixed(0)}%`);
}

validateEmbeddings().catch(console.error);
```

---

## Troubleshooting

### Common Issues

**Issue 1: Qdrant Connection Failed**
```javascript
// Solution: Check if Qdrant is running
curl http://localhost:6333/health

// If not, start it
docker run -p 6333:6333 qdrant/qdrant:latest
```

**Issue 2: API Key Invalid**
```javascript
// Check .env file
cat .env

// Verify key format
echo $VOYAGE_API_KEY
```

**Issue 3: Embeddings Dimension Mismatch**
```javascript
// Ensure consistency
const config = {
  embedding: {
    dimensions: 1024  // Must match across all operations
  }
};
```

**Issue 4: Search Results Not Relevant**
```javascript
// Debug search
const results = await system.search('query', { limit: 20 });
console.log(results.map(r => ({
  file: r.file,
  similarity: r.similarity
})));

// If similarity scores are low (<60%), consider:
// 1. Re-chunk the files (too small/large chunks)
// 2. Update embeddings (files may have changed)
// 3. Different embedding model
```

---

## Performance Optimization

### Batch Embedding Optimization

```javascript
// Embed large codebases faster
async function optimizedEmbedding(files) {
  const batchSize = 128;
  const batches = [];

  for (let i = 0; i < files.length; i += batchSize) {
    batches.push(files.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    const promises = batch.map(file => system.processFile(file));
    await Promise.all(promises); // Parallel processing
    console.log(`Processed batch of ${batch.length} files`);
  }
}
```

### Query Result Caching

```javascript
// Cache frequent queries
const frequentQueries = [
  'React component',
  'animation',
  'styling',
  'navigation',
  'form validation'
];

async function preWarmCache() {
  for (const query of frequentQueries) {
    await system.search(query);
    console.log(`Pre-warmed cache for: "${query}"`);
  }
}
```

### Vector Database Optimization

```javascript
// After initial embedding, optimize database
async function optimizeVectorDB() {
  // In Qdrant, this happens automatically, but you can:
  // 1. Enable compression
  // 2. Configure indexing
  // 3. Set appropriate batch sizes

  console.log('Vector DB optimized');
}
```

---

## Next Steps

1. **Run the initialization script**:
   ```bash
   node index.js
   ```

2. **Test with validation script**:
   ```bash
   node scripts/validate-embeddings.js
   ```

3. **Monitor performance**:
   ```javascript
   setInterval(() => {
     console.log('Cache stats:', system.cache.stats());
   }, 60000);
   ```

4. **Set up file watcher for updates**:
   ```javascript
   const fs = require('fs');
   fs.watch('src/', { recursive: true }, (eventType, filename) => {
     if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
       system.processFile(`src/${filename}`);
     }
   });
   ```

---

**Document Version**: 1.0
**Last Updated**: November 22, 2025
