import { Gemini } from "@/model";
// import { PineconeDatabase } from "@/database";

const gemini = new Gemini();
// const pcDb = new PineconeDatabase("quickstart");

const userQuery = "Whats the capital of France?";
// const userQueryEmbeddings = await gemini.embedContent([userQuery]);
// const queryResult = await pcDb.query(userQueryEmbeddings[0]);
// console.log("Query result:", queryResult);

const response = gemini.prompt(userQuery);
for await (const chunk of response) {
  process.stdout.write(chunk);
}
