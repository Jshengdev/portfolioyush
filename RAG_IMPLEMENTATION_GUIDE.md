# RAG Implementation Guide
## Working Code Examples for Portfolio Documentation

**Date**: November 22, 2025
**Target**: Node.js-based portfolio website
**Complexity**: Beginner-friendly, production-ready

---

## Table of Contents

1. [Solution 1: Simplest (Text-based RAG)](#solution-1-simplest)
2. [Solution 2: Recommended (ChromaDB Local)](#solution-2-recommended)
3. [Solution 3: Advanced (PostgreSQL + pgvector)](#solution-3-advanced)
4. [Integration with Portfolio Website](#integration-with-portfolio)
5. [Deployment Guide](#deployment)

---

## Solution 1: Simplest - Text-Based RAG

### Why This?
- ✅ Zero database setup
- ✅ Works offline
- ✅ Perfect for static documentation
- ✅ Cost: ~$0.01/query
- ✅ Setup: 10 minutes

### How It Works

```
Your docs (4KB-1MB)
    ↓
Embed in Claude's context window (200K tokens = ~500K characters)
    ↓
Claude reads all docs + question
    ↓
Returns answer
```

### Implementation

**1. Install dependencies**:
```bash
npm install @anthropic-ai/sdk dotenv
```

**2. Create `.env`**:
```
ANTHROPIC_API_KEY=sk-ant-...
```

**3. Implementation** (`src/rag-simple.js`):

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

class SimpleDocumentRAG {
  constructor() {
    this.client = new Anthropic();
    this.docs = {};
    this.context = '';
  }

  // Load all documentation files
  loadDocumentation(docsPath = '.') {
    console.log('Loading documentation...');

    const files = [
      'CLAUDE.md',
      'README.md',
      'ARCHITECTURE.md'
    ];

    for (const file of files) {
      const filepath = path.join(docsPath, file);
      if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf-8');
        this.docs[file] = content;
        console.log(`✓ Loaded ${file} (${content.length} chars)`);
      }
    }

    // Combine all docs into context
    this.context = Object.entries(this.docs)
      .map(([name, content]) => `## File: ${name}\n${content}`)
      .join('\n\n---\n\n');

    // Check token count
    const estimatedTokens = Math.ceil(this.context.length / 4); // Rough estimate
    console.log(`Total context: ~${estimatedTokens} tokens`);
    if (estimatedTokens > 150000) {
      console.warn('⚠️ Context may exceed 200K token limit');
    }
  }

  // Query documentation with Claude
  async query(question, options = {}) {
    const {
      model = 'claude-3-5-sonnet-20241022',
      maxTokens = 1024,
      temperature = 0.3
    } = options;

    const systemPrompt = `You are a helpful assistant for Johnny Sheng's portfolio website.
You have access to the complete portfolio documentation.

When answering questions:
1. Use the documentation provided
2. Be specific and reference file names
3. If information isn't in docs, say so clearly
4. For code questions, provide context and line numbers if available
5. Be concise but thorough`;

    const userPrompt = `${this.context}

---

User Question: ${question}

Please answer based on the documentation above.`;

    try {
      const message = await this.client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      });

      return {
        answer: message.content[0].text,
        stopReason: message.stop_reason,
        usage: message.usage
      };
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  // Interactive REPL
  async interactive() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\n📚 Portfolio Documentation RAG');
    console.log('Type "exit" to quit\n');

    const askQuestion = () => {
      rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
          console.log('Goodbye!');
          rl.close();
          return;
        }

        if (!input.trim()) {
          askQuestion();
          return;
        }

        try {
          console.log('\nAssistant: Thinking...');
          const result = await this.query(input);
          console.log('\nAssistant:', result.answer);
          console.log(`\n[Tokens used: ${result.usage.input_tokens} input, ${result.usage.output_tokens} output]\n`);
        } catch (error) {
          console.error('Error:', error.message);
        }

        askQuestion();
      });
    };

    askQuestion();
  }
}

// CLI usage
async function main() {
  const rag = new SimpleDocumentRAG();

  // Load documentation from current directory
  rag.loadDocumentation();

  // Check if question provided as CLI argument
  if (process.argv[2]) {
    const question = process.argv.slice(2).join(' ');
    const result = await rag.query(question);
    console.log('\n🤖 Answer:\n');
    console.log(result.answer);
    console.log(`\nTokens: ${result.usage.input_tokens + result.usage.output_tokens}`);
  } else {
    // Interactive mode
    await rag.interactive();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SimpleDocumentRAG;
```

**4. Usage**:

```bash
# Interactive mode
node src/rag-simple.js

# Single query
node src/rag-simple.js "Where is the Cursor component defined?"

# Programmatic
const RAG = require('./src/rag-simple');
const rag = new RAG();
rag.loadDocumentation();
const result = await rag.query("What is the health score?");
```

### Expected Output

```
You: Where is the Cursor component defined?