from typing import TypedDict
from libretranslate import translate
from extract import split_articles
from database import PineconeDatabase
from model import Gemini
import os
from types_def import SchemaWithCategory

INPUT_FOLDER = "PDF_text_not_cleaned"


class Article(TypedDict):
  number: int
  content: str


if __name__ == "__main__":
  gemini = Gemini()
  db = PineconeDatabase("moroccan-law-db-final")

  if not os.path.exists(INPUT_FOLDER):
    print(f"Input folder '{INPUT_FOLDER}' does not exist.")
    exit(1)

  for i, filename in enumerate(os.listdir(INPUT_FOLDER)):
    if not filename.endswith(".txt"):
      continue

    input_path = os.path.join(INPUT_FOLDER, filename)
    with open(input_path, "r", encoding="utf-8") as file:
      text = file.read()

    articles = split_articles(text)
    print(f"Processing file {i + 1}: {filename} with {len(articles)} articles.")
    if len(articles) == 0:
      print(f"No articles found in {filename}. Skipping.")
      continue
    translated_articles: list[str] = []

    for idx, article in enumerate(articles, start=1):
      translated_article = translate(article)
      translated_articles.append(translated_article)

    print(f"Translating {len(articles)} articles in {filename}...")
    embedded_articles = gemini.embed_content(translated_articles)
    print(f"Embedding {len(embedded_articles)} articles in {filename}...")

    filename = filename[:-4]
    filename = translate(filename)
    l: list[SchemaWithCategory] = []
    for idx, (article, embedding) in enumerate(
      zip(translated_articles, embedded_articles), start=1
    ):
      ret = SchemaWithCategory(
        id=f"{filename.replace(' ', '_')}_{idx}",
        vector=embedding,
        metadata={
          "chunk_text": article,
          "category": filename,
        },
      )
      l.append(ret)

    print(f"Upserting {len(l)} articles to the database...")
    db.upsert(l)
    print(f"Processed {filename} with {len(l)} articles.")
