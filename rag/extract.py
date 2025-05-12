import os
import re
from typing import List
import subprocess

CHUCK_SIZE = 3000
CHUNK_OVERLAP = 100


def clean_text(text: str) -> str:
  # Replace non-alphanumeric, non-Arabic characters, and multiple whitespaces
  cleaned_text = re.sub(r"[^\w\u0600-\u06FF\s]+", "", text)
  cleaned_text = re.sub(r"\s+", " ", cleaned_text)
  return cleaned_text


def chunk_text(text: str, chunk_size: int, overlap: int) -> List[str]:
  chunks = []
  paragraphs = text.split("\n\n")

  current_chunk = ""
  for paragraph in paragraphs:
    if len(current_chunk) + len(paragraph) > chunk_size:
      chunks.append(current_chunk.strip())
      current_chunk = current_chunk[-overlap:]

    current_chunk += paragraph

  if len(current_chunk) > 0:
    print(f"Current chunk length: {len(current_chunk)}")
    chunks.append(current_chunk.strip())

  return chunks


# Example of file processing - similar to the commented code in the original TypeScript
if __name__ == "__main__":
  FOLDER_PATH = "PDFs"
  OUTPUT_FOLDER = "PDF_texts"
  if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)
  for filename in os.listdir(FOLDER_PATH):
    if not filename.endswith(".pdf"):
      continue
    file_path = os.path.join(FOLDER_PATH, filename)
    command = f"pdftotext -layout '{file_path}' '{os.path.join(OUTPUT_FOLDER, filename[:-4] + '.txt')}'"
    try:
      subprocess.run(command, shell=True, check=True)
      print(f"Converted {filename} to text.")
    except subprocess.CalledProcessError as e:
      print(f"Error converting {filename}: {e}")
      exit(1)

  for filename in os.listdir(OUTPUT_FOLDER):
    if not filename.endswith(".txt"):
      continue
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    with open(file_path, "r", encoding="utf-8") as f:
      text = f.read()
      cleaned_text = clean_text(text)

    with open(file_path, "w", encoding="utf-8") as f:
      f.write(cleaned_text)
      print(f"Cleaned text saved to {file_path}")
