from model import Gemini
from database import PineconeDatabase
from embedding import model
import asyncio
import os


async def main():
  DOCUMENT_FOLDER = "PDF_texts"
  gemini = Gemini()
  pc_db = PineconeDatabase("law-documents")

  user_query = "ما هي عقوبة غسيل الأموال"
  user_embedding = model.encode(user_query).tolist()
  print("User query embedding generated")

  result = pc_db.query(user_embedding, top_k=1)[0]
  print("Query result:", result)

  filename = result["metadata"]["filename"]
  print("Filename:", filename)

  file_path = os.path.join(DOCUMENT_FOLDER, filename)
  with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

  prompt = f"""
  You are a legal assistant. You have access to a document that contains legal information.
  The document is as follows:
  {text}
  Please answer the following question based on the document:
  {user_query}
  """
  response = gemini.prompt(prompt)
  async for chunk in response:
    print(chunk, end="")


if __name__ == "__main__":
  asyncio.run(main())
