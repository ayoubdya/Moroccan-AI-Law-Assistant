import { Gemini } from "./model";



const gemini = new Gemini();

const userQuery = "hi ?";

const response = gemini.prompt(userQuery);
for await (const chunk of response) {
  console.log(chunk);
}


