import os
from extract import split_articles, OUTPUT_FOLDER


def test_split_articles_all_files():
  txt_files = [f for f in os.listdir(OUTPUT_FOLDER) if f.endswith(".txt")]

  for filename in txt_files:
    file_path = os.path.join(OUTPUT_FOLDER, filename)

    with open(file_path, "r", encoding="utf-8") as f:
      text = f.read()

    print(f"\nTesting file: {filename}")
    articles = split_articles(text)
    print(f"Number of articles found: {len(articles)}")


def test_split_articles_sample_text():
  sample_text = """
    المادة األولى
    هذا نص المادة الأولى من القانون.
    
    المادة 2
    هذا نص المادة الثانية من القانون.
    
    المادة 3
    هذا نص المادة الثالثة من القانون.
    """

  articles = split_articles(sample_text)

  assert len(articles) == 3, "Should find 3 articles"
  assert "المادة األولى" in articles[0], "First article should contain 'المادة األولى'"
  assert "المادة 2" in articles[1], "Second article should contain 'المادة 2'"
  assert "المادة 3" in articles[2], "Third article should contain 'المادة 3'"


if __name__ == "__main__":
  test_split_articles_all_files()
  test_split_articles_sample_text()
  print("All tests completed!")
