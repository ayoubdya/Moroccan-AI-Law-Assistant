import asyncio
from model import Gemini
from extract import clean_text, chunk_text
from database import PineconeDatabase
from types_def import SchemaWithCategory
from embedding import model


def test3():
  pc_db = PineconeDatabase("law-documents")
  input = "في حالة تغيب المستشار المعين"
  input = "ما هي القوانين المتعلقة البصمة؟"
  input = "ماذا تفعل في حالة وقوع حادث"
  input = "ما هي عقوبة غسيل الأموال"
  input = "ماهي عقوبة القتل في القانون؟"
  input = "ما هي القوانين المتعلقة بالجرائم الإلكترونية؟"
  input_embedding: list[float] = model.encode(
    input, show_progress_bar=True, device="cuda"
  ).tolist()
  result = pc_db.query(input_embedding, top_k=5)
  text = ""
  for result in result:
    filename = result["metadata"]["filename"]
    score = result["score"]
    text += f"{filename}\n{score}#############################\n\n"

  print(text)


def test1():
  gemini = Gemini()
  pc_db = PineconeDatabase("law-arabic2")
  # Uncomment to create a new index
  # pc_db.create_index("law-arabic2")
  # exit(0)

  test_chunks = [
    {"chunk_text": "اكتمل بناء برج إيفل عام 1889، ويقع في باريس، فرنسا"},
    {"chunk_text": "اكتمل بناء برج إيفل عام 1889، ويقع في باريس، فرنسا إلى طاقة"},
    {"chunk_text": "طوّر ألبرت أينشتاين نظرية النسبية"},
    {"chunk_text": "تُعتبر الميتوكوندريا غالبًا مصدر الطاقة للخلية"},
    {"chunk_text": "كتب شكسبير العديد من المسرحيات الشهيرة، بما في ذلك هاملت وماكبث"},
    # ... additional test chunks would go here
  ]

  chunk_embeddings = gemini.embed_content(
    [chunk["chunk_text"] for chunk in test_chunks]
  )
  print("Chunk embeddings", len(chunk_embeddings))

  chunk_data: list[SchemaWithCategory] = [
    {
      "id": f"chunk-{index}",
      "vector": embedding,
      "metadata": {"chunk_text": test_chunks[index]["chunk_text"], "category": "law"},
    }
    for index, embedding in enumerate(chunk_embeddings)
  ]
  print("Chunk data", len(chunk_data))

  pc_db.upsert(chunk_data)
  print("Data upserted to Pinecone")

  user_query = "ما هي الأشياء الشهيرة في مصر؟"
  user_query_embeddings = gemini.embed_content([user_query])
  query_result = pc_db.query(user_query_embeddings[0])
  print("Query result:", query_result)

  text = ""
  for result in query_result:
    chunk_text = result["metadata"]["chunk_text"]
    score = result["score"]
    text += f"{chunk_text}\n\n{score}#############################\n\n"

  with open("query_result.txt", "w", encoding="utf-8") as f:
    f.write(text)


async def test2():
  gemini = Gemini()
  pcDb = PineconeDatabase("law-arabic2")
  user_query = "ما هي الأشياء الشهيرة في مصر؟"
  # response = gemini.prompt([user_query])
  # async for chunk in response:
  #   print(chunk, end="", flush=True)
  # print("\n\n\n")

  # embedding = await gemini.embed_content([user_query])
  # print("Embedding:", embedding)

  # token_count = await gemini.count_tokens([user_query])
  # print("Token count:", token_count)

  # pcDb.create_index("law-arabic3")


if __name__ == "__main__":
  # asyncio.run(test2())
  test3()
