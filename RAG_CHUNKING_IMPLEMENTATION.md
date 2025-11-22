# RAG Document Chunking: Implementation Guide

**Practical guide with code examples for implementing optimal chunking strategies**

---

## Quick Start: 5-Minute Setup

### Installation

```bash
# Core RAG libraries
pip install langchain langchain-text-splitters llamaindex

# Vector databases (choose one)
pip install chromadb        # Local, lightweight
pip install pinecone-client # Cloud, scalable
pip install weaviate-client # Advanced search

# Optional: LLM providers for metadata enrichment
pip install openai          # OpenAI embeddings
pip install anthropic       # Anthropic API

# Optional: Code-aware chunking
pip install astchunk
```

### Basic Chunking Pipeline

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. Create splitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=60,
    separators=["\n\n", "\n", " ", ""]
)

# 2. Load document
with open('src/components/Grove.jsx', 'r') as f:
    text = f.read()

# 3. Split into chunks
chunks = splitter.split_text(text)

# 4. Add to vector database
for i, chunk in enumerate(chunks):
    vector_db.add(
        id=f"grove_chunk_{i}",
        text=chunk,
        metadata={"file": "Grove.jsx", "chunk_index": i}
    )

print(f"Created {len(chunks)} chunks")
```

---

## Implementation Strategies by Content Type

### Strategy 1: React Component Chunking

**Best for**: JSX files with imports, styled-components, and complex logic

#### Approach A: LangChain Language-Specific (Recommended)

```python
from langchain_text_splitters import Language, RecursiveCharacterTextSplitter

def chunk_react_component(file_path: str) -> list[dict]:
    """
    Chunk a React component respecting JSX structure.

    Returns: List of chunks with metadata
    """

    with open(file_path, 'r') as f:
        content = f.read()

    # Use JSX-aware splitter
    splitter = RecursiveCharacterTextSplitter.from_language(
        language=Language.JSX,
        chunk_size=350,
        chunk_overlap=50
    )

    chunks = splitter.split_text(content)

    # Enrich with metadata
    component_name = file_path.split('/')[-1].replace('.jsx', '')
    chunks_with_metadata = []

    for i, chunk in enumerate(chunks):
        chunks_with_metadata.append({
            "id": f"{component_name}_chunk_{i}",
            "text": chunk,
            "metadata": {
                "component": component_name,
                "chunk_index": i,
                "file_path": file_path,
                "chunk_type": categorize_chunk(chunk),
                "contains_hooks": contains_hooks(chunk),
                "contains_jsx": contains_jsx(chunk),
                "token_count": estimate_tokens(chunk)
            }
        })

    return chunks_with_metadata

def categorize_chunk(chunk: str) -> str:
    """Categorize what type of code this chunk contains"""
    if "import" in chunk:
        return "imports"
    elif "styled." in chunk:
        return "styled_components"
    elif "useEffect" in chunk or "useState" in chunk:
        return "hooks"
    elif "return (" in chunk:
        return "jsx"
    else:
        return "logic"

def contains_hooks(chunk: str) -> bool:
    hooks = ["useState", "useEffect", "useContext", "useReducer",
             "useCallback", "useMemo", "useRef", "useNavigate"]
    return any(hook in chunk for hook in hooks)

def contains_jsx(chunk: str) -> bool:
    return "<" in chunk and ">" in chunk and "return" in chunk

def estimate_tokens(text: str) -> int:
    """Rough token estimation (1 token ≈ 4 characters)"""
    return len(text) // 4

# Usage
chunks = chunk_react_component('src/components/Projectfiles/Grove.jsx')
for chunk in chunks:
    print(f"Chunk {chunk['id']}: {chunk['metadata']['chunk_type']}")
```

#### Approach B: AST-Based Chunking (More Intelligent)

```python
from astchunk import ChunkGenerator
import json

def chunk_react_with_ast(file_path: str) -> list[dict]:
    """
    Use Abstract Syntax Tree for intelligent React component chunking.
    Respects function/class boundaries perfectly.
    """

    with open(file_path, 'r') as f:
        content = f.read()

    # Create AST-based chunker
    chunker = ChunkGenerator(
        language='javascript',  # Also supports 'jsx' if available
        chunk_size=350,
        overlap=50
    )

    # Generate chunks respecting AST boundaries
    ast_chunks = chunker.chunk_code(content)

    # Convert to our format
    component_name = file_path.split('/')[-1].replace('.jsx', '')
    chunks_with_metadata = []

    for chunk in ast_chunks:
        chunks_with_metadata.append({
            "id": f"{component_name}_ast_chunk_{chunk.start_line}",
            "text": chunk.code,
            "metadata": {
                "component": component_name,
                "file_path": file_path,
                "lines": f"{chunk.start_line}-{chunk.end_line}",
                "node_type": chunk.type,  # "FunctionDeclaration", "VariableDeclaration", etc.
                "token_count": estimate_tokens(chunk.code),
                "is_valid_syntax": True  # AST guarantees validity
            }
        })

    return chunks_with_metadata

# Usage
chunks = chunk_react_with_ast('src/components/Projectfiles/Grove.jsx')
for chunk in chunks:
    print(f"{chunk['metadata']['node_type']}: Lines {chunk['metadata']['lines']}")
```

#### Processing All Components

```python
from pathlib import Path

def process_all_components(components_dir: str) -> list[dict]:
    """Process all React components in a directory"""

    all_chunks = []
    components_path = Path(components_dir)

    # Find all .jsx files
    jsx_files = list(components_path.rglob('*.jsx'))

    for jsx_file in jsx_files:
        print(f"Processing {jsx_file.name}...")
        chunks = chunk_react_component(str(jsx_file))
        all_chunks.extend(chunks)

    print(f"Total chunks created: {len(all_chunks)}")
    return all_chunks

# Usage
all_component_chunks = process_all_components('src/components')

# Store in database
for chunk in all_component_chunks:
    vector_db.add_chunk(
        id=chunk['id'],
        text=chunk['text'],
        metadata=chunk['metadata'],
        embedding=embedding_model.embed(chunk['text'])
    )
```

---

### Strategy 2: Markdown Documentation Chunking

**Best for**: CLAUDE.md, README.md, technical documentation

```python
from langchain_text_splitters import MarkdownHeaderTextSplitter

def chunk_markdown(file_path: str) -> list[dict]:
    """
    Chunk markdown file by headers, preserving hierarchy.

    CLAUDE.md becomes chunks organized by:
    - Level 1: Document title
    - Level 2: Main sections (Codebase Structure, etc.)
    - Level 3: Subsections (Technical Debt, etc.)
    """

    with open(file_path, 'r') as f:
        markdown_content = f.read()

    # Define markdown structure
    headers_to_split_on = [
        ("#", "Document"),      # H1
        ("##", "Section"),      # H2 - main organizational level
        ("###", "Subsection"),  # H3
    ]

    # Create splitter
    md_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        chunk_size=400,
        chunk_overlap=60,
    )

    # Split markdown
    md_chunks = md_splitter.split_text(markdown_content)

    # Enrich metadata
    doc_name = Path(file_path).stem
    chunks_with_metadata = []

    for i, md_chunk in enumerate(md_chunks):
        # Extract metadata from md_chunk.metadata dict
        breadcrumb = " > ".join(
            [md_chunk.metadata.get(key) for key in ["Document", "Section", "Subsection"]
             if md_chunk.metadata.get(key)]
        )

        chunks_with_metadata.append({
            "id": f"{doc_name}_md_chunk_{i}",
            "text": md_chunk.page_content,
            "metadata": {
                "document": doc_name,
                "section": md_chunk.metadata.get("Section"),
                "subsection": md_chunk.metadata.get("Subsection"),
                "breadcrumb": breadcrumb,
                "contains_code": "```" in md_chunk.page_content,
                "contains_table": "|" in md_chunk.page_content,
                "contains_list": "-" in md_chunk.page_content,
                "token_count": estimate_tokens(md_chunk.page_content)
            }
        })

    return chunks_with_metadata

# Usage
claude_chunks = chunk_markdown('CLAUDE.md')
readme_chunks = chunk_markdown('README.md')

print(f"CLAUDE.md: {len(claude_chunks)} chunks")
for chunk in claude_chunks[:3]:
    print(f"  - {chunk['metadata']['breadcrumb']}")
```

---

### Strategy 3: Configuration File Chunking

**Best for**: package.json, vite.config.js, configuration files

```python
import json
from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_config_json(file_path: str) -> list[dict]:
    """
    Smart chunking for JSON config files.
    Splits by logical sections, not randomly.
    """

    with open(file_path, 'r') as f:
        config_content = f.read()

    # Parse to understand structure
    config_data = json.loads(config_content)

    chunks_with_metadata = []
    file_name = Path(file_path).stem

    # Chunk by top-level sections
    for key, value in config_data.items():
        section_text = f'"{key}": {json.dumps(value, indent=2)}'

        # For large sections, split further
        if len(section_text) > 2000:  # 2000 chars ≈ 500 tokens
            sub_splitter = RecursiveCharacterTextSplitter(
                chunk_size=200,
                chunk_overlap=20,
                separators=["\n", " "]
            )
            sub_chunks = sub_splitter.split_text(section_text)
        else:
            sub_chunks = [section_text]

        for sub_i, sub_chunk in enumerate(sub_chunks):
            chunks_with_metadata.append({
                "id": f"{file_name}_config_{key}_{sub_i}",
                "text": sub_chunk,
                "metadata": {
                    "file": file_name,
                    "config_section": key,
                    "file_type": "json_config",
                    "token_count": estimate_tokens(sub_chunk)
                }
            })

    return chunks_with_metadata

# Usage
package_chunks = chunk_config_json('package.json')
print(f"package.json sections: {[c['metadata']['config_section'] for c in package_chunks]}")
```

---

## Metadata Enrichment Pipeline

### Basic Metadata

```python
from datetime import datetime
from pathlib import Path

def add_basic_metadata(chunk: dict, file_info: dict) -> dict:
    """Add foundational metadata to chunk"""

    chunk["metadata"].update({
        "source": {
            "file": file_info["path"],
            "file_type": file_info["type"],  # jsx, md, json
            "repository": "portfolioyush",
            "url": f"https://github.com/Jshengdev/portfolioyush/blob/main/{file_info['path']}"
        },
        "indexed_at": datetime.now().isoformat(),
        "modified_at": file_info.get("modified", datetime.now().isoformat()),
    })

    return chunk
```

### Keyword Extraction

```python
import re
from collections import Counter

def extract_keywords(text: str, top_n: int = 5) -> list[str]:
    """
    Extract keywords from text.
    For production, use: yake, rake, or TextRank
    """

    # Simple approach: extract capitalized terms and frequent words
    words = re.findall(r'\b[A-Z][a-zA-Z]+\b', text)

    # Remove common programming words
    common = {"const", "let", "var", "function", "return", "if", "else",
              "for", "while", "import", "export", "from"}

    filtered = [w for w in words if w not in common]
    counter = Counter(filtered)

    return [word for word, _ in counter.most_common(top_n)]

# Better approach using YAKE
def extract_keywords_with_yake(text: str, top_n: int = 5) -> list[str]:
    """Use YAKE for better keyword extraction"""
    try:
        import yake
        extractor = yake.KeywordExtractor(top=top_n)
        keywords = extractor.extract_keywords(text)
        return [kw[0] for kw in keywords]
    except ImportError:
        print("Install YAKE: pip install yake")
        return extract_keywords(text, top_n)
```

### AI-Generated Metadata (Optional)

```python
from openai import OpenAI

def generate_metadata_with_ai(chunk_text: str, llm_model: str = "gpt-3.5-turbo") -> dict:
    """
    Use LLM to generate intelligent metadata.
    Cost: ~$0.001 per chunk. Use selectively.
    """

    client = OpenAI()

    # Generate summary
    summary_response = client.chat.completions.create(
        model=llm_model,
        messages=[{
            "role": "user",
            "content": f"Summarize this in 1 sentence:\n\n{chunk_text[:500]}"
        }],
        temperature=0.3,
        max_tokens=100
    )
    summary = summary_response.choices[0].message.content

    # Generate potential questions
    questions_response = client.chat.completions.create(
        model=llm_model,
        messages=[{
            "role": "user",
            "content": f"""Given this content, generate 3 specific questions a developer would ask:

{chunk_text[:500]}

Format: 1 question per line, starting with "Q: "
"""
        }],
        temperature=0.5,
        max_tokens=200
    )

    questions_text = questions_response.choices[0].message.content
    questions = [q.replace("Q: ", "").strip() for q in questions_text.split("\n") if q.startswith("Q:")]

    return {
        "summary": summary,
        "potential_questions": questions,
        "generated_at": datetime.now().isoformat()
    }

# Usage (selective - for key chunks only)
if chunk_is_important:  # e.g., component definitions
    ai_metadata = generate_metadata_with_ai(chunk["text"])
    chunk["metadata"].update(ai_metadata)
```

---

## Complete Processing Pipeline

```python
from typing import Generator
import json
from pathlib import Path

class RAGChunkingPipeline:
    """End-to-end document chunking pipeline"""

    def __init__(self, output_dir: str = "chunks_output"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.all_chunks = []

    def process_jsx_files(self, jsx_dir: str) -> int:
        """Process all React components"""
        jsx_path = Path(jsx_dir)
        jsx_files = list(jsx_path.rglob('*.jsx'))

        print(f"Processing {len(jsx_files)} JSX files...")

        for jsx_file in jsx_files:
            print(f"  {jsx_file.name}...", end=" ")
            try:
                chunks = chunk_react_component(str(jsx_file))
                self.all_chunks.extend(chunks)
                print(f"✓ ({len(chunks)} chunks)")
            except Exception as e:
                print(f"✗ {e}")

        return len([c for c in self.all_chunks if "jsx" in c["id"]])

    def process_markdown_files(self, md_files: list[str]) -> int:
        """Process markdown documentation"""
        print(f"Processing {len(md_files)} markdown files...")

        for md_file in md_files:
            print(f"  {Path(md_file).name}...", end=" ")
            try:
                chunks = chunk_markdown(md_file)
                self.all_chunks.extend(chunks)
                print(f"✓ ({len(chunks)} chunks)")
            except Exception as e:
                print(f"✗ {e}")

        return len([c for c in self.all_chunks if "_md_" in c["id"]])

    def process_config_files(self, config_files: list[str]) -> int:
        """Process configuration files"""
        print(f"Processing {len(config_files)} config files...")

        for config_file in config_files:
            print(f"  {Path(config_file).name}...", end=" ")
            try:
                chunks = chunk_config_json(config_file)
                self.all_chunks.extend(chunks)
                print(f"✓ ({len(chunks)} chunks)")
            except Exception as e:
                print(f"✗ {e}")

        return len([c for c in self.all_chunks if "_config_" in c["id"]])

    def enrich_all_metadata(self):
        """Add standard metadata to all chunks"""
        print("Enriching metadata...")

        for chunk in self.all_chunks:
            chunk["metadata"]["rank"] = "unknown"
            chunk["metadata"]["embedding_status"] = "pending"

        print(f"Enriched {len(self.all_chunks)} chunks")

    def save_chunks(self, format: str = "json") -> str:
        """Save chunks to file for inspection/import"""
        output_file = self.output_dir / f"chunks.{format}"

        if format == "json":
            with open(output_file, "w") as f:
                json.dump(self.all_chunks, f, indent=2)

        elif format == "jsonl":  # JSON Lines format
            with open(output_file, "w") as f:
                for chunk in self.all_chunks:
                    f.write(json.dumps(chunk) + "\n")

        print(f"Saved {len(self.all_chunks)} chunks to {output_file}")
        return str(output_file)

    def get_stats(self) -> dict:
        """Get pipeline statistics"""
        return {
            "total_chunks": len(self.all_chunks),
            "jsx_chunks": len([c for c in self.all_chunks if "jsx" in c["id"]]),
            "markdown_chunks": len([c for c in self.all_chunks if "_md_" in c["id"]]),
            "config_chunks": len([c for c in self.all_chunks if "_config_" in c["id"]]),
            "avg_chunk_size": sum(c["metadata"].get("token_count", 0) for c in self.all_chunks) // len(self.all_chunks) if self.all_chunks else 0
        }

    def run(self, jsx_dir: str, md_files: list[str], config_files: list[str]):
        """Run complete pipeline"""
        print("=" * 60)
        print("RAG CHUNKING PIPELINE")
        print("=" * 60)

        self.process_jsx_files(jsx_dir)
        self.process_markdown_files(md_files)
        self.process_config_files(config_files)
        self.enrich_all_metadata()

        stats = self.get_stats()
        print("\nPipeline Statistics:")
        print(f"  Total chunks: {stats['total_chunks']}")
        print(f"  JSX: {stats['jsx_chunks']}")
        print(f"  Markdown: {stats['markdown_chunks']}")
        print(f"  Config: {stats['config_chunks']}")
        print(f"  Avg chunk size: {stats['avg_chunk_size']} tokens")

        output_file = self.save_chunks("json")
        print(f"\nPipeline complete! Chunks saved to {output_file}")

        return self.all_chunks

# Usage
pipeline = RAGChunkingPipeline(output_dir="portfolioyush_chunks")

chunks = pipeline.run(
    jsx_dir="src/components",
    md_files=[
        "CLAUDE.md",
        "README.md",
        "ARCHITECTURE.md",
    ],
    config_files=[
        "package.json",
        "vite.config.js",
    ]
)
```

---

## Vector Database Integration

### Chroma (Local, Lightweight)

```python
import chromadb
from chromadb.config import Settings

def store_chunks_in_chroma(chunks: list[dict]):
    """Store chunks in Chroma vector database"""

    # Initialize Chroma client
    settings = Settings(
        chroma_db_impl="duckdb",
        persist_directory="./portfolioyush_chroma",
        anonymized_telemetry=False,
    )

    client = chromadb.Client(settings)

    # Create collection
    collection = client.get_or_create_collection(
        name="portfolioyush",
        metadata={"hnsw:space": "cosine"}
    )

    # Add chunks
    for chunk in chunks:
        collection.add(
            ids=[chunk["id"]],
            documents=[chunk["text"]],
            metadatas=[chunk["metadata"]],
        )

    print(f"Stored {len(chunks)} chunks in Chroma")
    return collection

# Usage
collection = store_chunks_in_chroma(chunks)

# Query
results = collection.query(
    query_texts=["How are React components structured?"],
    n_results=5,
    where={"file_type": {"$eq": "jsx"}}  # Filter by metadata
)

for result in results["documents"][0]:
    print(result[:100] + "...")
```

### Pinecone (Cloud, Scalable)

```python
from pinecone import Pinecone

def store_chunks_in_pinecone(chunks: list[dict], index_name: str = "portfolioyush"):
    """Store chunks in Pinecone vector database"""

    # Initialize
    pc = Pinecone(api_key="your_api_key")

    # Create index if doesn't exist
    try:
        pc.create_index(
            name=index_name,
            dimension=1536,  # OpenAI embedding dimension
            metric="cosine",
            spec={"serverless": {"cloud": "aws", "region": "us-east-1"}}
        )
    except:
        pass  # Index already exists

    index = pc.Index(index_name)

    # Embed and store
    from openai import OpenAI
    client = OpenAI()

    for i, chunk in enumerate(chunks):
        if i % 100 == 0:
            print(f"Processing chunk {i}/{len(chunks)}...")

        # Get embedding
        response = client.embeddings.create(
            model="text-embedding-ada-002",
            input=chunk["text"]
        )
        embedding = response.data[0].embedding

        # Store in Pinecone
        index.upsert(
            vectors=[(
                chunk["id"],
                embedding,
                chunk["metadata"]
            )]
        )

    print(f"Stored {len(chunks)} chunks in Pinecone index '{index_name}'")
    return index

# Usage
index = store_chunks_in_pinecone(chunks)

# Query
query_embedding = ... # Get embedding for user query
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)
```

---

## Testing & Validation

```python
def validate_chunks(chunks: list[dict]) -> dict:
    """Validate chunk quality"""

    stats = {
        "total": len(chunks),
        "by_type": {},
        "size_distribution": {
            "small": 0,      # <100 tokens
            "medium": 0,     # 100-300 tokens
            "large": 0,      # 300-500 tokens
            "xlarge": 0      # >500 tokens
        },
        "issues": []
    }

    for chunk in chunks:
        # Track by type
        chunk_type = chunk["metadata"].get("chunk_type", "unknown")
        stats["by_type"][chunk_type] = stats["by_type"].get(chunk_type, 0) + 1

        # Track size distribution
        tokens = chunk["metadata"].get("token_count", 0)
        if tokens < 100:
            stats["size_distribution"]["small"] += 1
        elif tokens < 300:
            stats["size_distribution"]["medium"] += 1
        elif tokens < 500:
            stats["size_distribution"]["large"] += 1
        else:
            stats["size_distribution"]["xlarge"] += 1

        # Check for issues
        if len(chunk["text"]) < 50:
            stats["issues"].append(f"Chunk {chunk['id']}: Too short")

        if tokens > 600:
            stats["issues"].append(f"Chunk {chunk['id']}: Too large ({tokens} tokens)")

    return stats

# Usage
stats = validate_chunks(chunks)
print(f"Total chunks: {stats['total']}")
print(f"Size distribution: {stats['size_distribution']}")
if stats['issues']:
    print(f"Issues found: {len(stats['issues'])}")
    for issue in stats['issues'][:5]:
        print(f"  - {issue}")
```

---

## Performance Benchmarking

```python
from timeit import timeit

def benchmark_chunking_methods(large_text: str):
    """Compare different chunking approaches"""

    print("Benchmarking chunking methods...")
    print("=" * 60)

    # Method 1: Fixed-size
    def fixed_size():
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=400,
            chunk_overlap=60
        )
        return splitter.split_text(large_text)

    # Method 2: Semantic
    def semantic():
        from langchain_experimental.text_splitter import SemanticChunker
        from langchain_openai.embeddings import OpenAIEmbeddings
        splitter = SemanticChunker(embeddings=OpenAIEmbeddings())
        return splitter.split_text(large_text)

    # Time them
    fixed_time = timeit(fixed_size, number=1)
    print(f"Fixed-size: {fixed_time:.2f}s")

    # Semantic is slow with embeddings, so skip for demo
    # semantic_time = timeit(semantic, number=1)
    # print(f"Semantic: {semantic_time:.2f}s")

    print("=" * 60)

# Usage
with open('CLAUDE.md', 'r') as f:
    large_text = f.read()

benchmark_chunking_methods(large_text)
```

---

## Quick Reference: Implementation Checklist

```
□ Install dependencies (langchain, llamaindex, vector DB)
□ Choose chunking strategy:
  □ JSX Components: RecursiveCharacterTextSplitter.from_language(Language.JSX)
  □ Markdown: MarkdownHeaderTextSplitter
  □ Config: RecursiveCharacterTextSplitter with logical splits
□ Chunk all documents
□ Add metadata enrichment
□ Test chunk quality
□ Store in vector database
□ Set up retrieval pipeline
□ Benchmark and optimize
□ Deploy to production
```

---

**See RAG_CHUNKING_RESEARCH.md for comprehensive strategy and theory.**
