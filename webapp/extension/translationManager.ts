import axios from "axios";
import { urls } from "@/config.json";

export async function TranslateText(text: string) {
  console.log(text);
  return axios
    .post(
      urls.url_translation,
      {
        q: text,
        source: "auto",
        target: "en",
        format: "text",
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => res.data)
    .catch((e) => console.log(e));
}
