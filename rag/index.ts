import { Gemini } from "@/model";
import { PineconeDatabase } from "@/database";

const gemini = new Gemini();
const pcDb = new PineconeDatabase("quickstart");

const userQuery = "Famous historical structures and monuments";
const userQueryEmbeddings = await gemini.embedContent([userQuery]);
const queryResult = await pcDb.query(userQueryEmbeddings[0]);
console.log("Query result:", queryResult);
