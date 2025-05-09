import { PineconeDatabase } from "@/modules/database";
import { Gemini } from "@/modules/model";
import { buildDocsPrompt, SystemPrompt } from "@/extensions/promptBuilder";

import { NextRequest, NextResponse } from "next/server";
import { Content } from "@google/genai";

interface SessionState {
  history: Content[];
}

const sessions = new Map<string, SessionState>();

async function* Answer(
  userId: string,
  userQuery: string
): AsyncGenerator<string> {
  let session = sessions.get(userId);

  if (!session) {
    session = {
      history: [{ role: "user", parts: [{ text: SystemPrompt }] }],
    };
    sessions.set(userId, session);
  }

  const gemini = new Gemini();

  const database = new PineconeDatabase("moroccan-law-db");

  const embInp = await gemini.embedContent([userQuery]);

  const topDocs = await database.query(embInp[0]!, 3);

  const promptDocs = buildDocsPrompt(topDocs);

  session.history.push({ role: "user", parts: [{ text: promptDocs }] });

  session.history.push({ role: "user", parts: [{ text: userQuery }] });

  let fullReply: string = "";

  for await (const chunk of gemini.prompt(session.history)) {
    fullReply += chunk;
    yield chunk;
  }

  session.history.push({ role: "model", parts: [{ text: fullReply }] });

  console.log(
    session.history.map((hist) => ({
      role: hist.role,
      message: String(hist.parts![0]?.text ?? ""),
    }))
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt: string = body?.prompt || "";

  if (prompt == "") {
    const error = { message: "empty prompt" };
    return new Response(JSON.stringify(error), { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      for await (const chunk of Answer("id1", prompt)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}
