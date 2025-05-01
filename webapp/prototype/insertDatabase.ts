import { PineconeDatabase } from "./database";
import { Gemini } from "./model";

import { type SchemaWithCategory } from "./types";

const gemini = new Gemini();

const texts = ["hi", "hello", "goodbye friend"];

const embeddings = await gemini.embedContent(texts);

const database = new PineconeDatabase("moroccan-law-db");

// Step 4: Prepare data to upsert into Pinecone
const embReady: SchemaWithCategory[] = texts.map((text, idx) => ({
  id: `text-${idx}`,
  vector: embeddings[idx]!,
  metadata: {
    chunk_text: text,
    category: "greeting",
  },
}));

database.upsert(embReady);
