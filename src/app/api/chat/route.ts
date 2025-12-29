import OpenAI from "openai";
import { site } from "@/content/site";
import { energia } from "@/content/energia";
import { tecnologia } from "@/content/tecnologia";

const CONTEXT = [
  "SITE:",
  JSON.stringify(site, null, 2),
  "ENERGIA:",
  JSON.stringify(energia, null, 2),
  "TECNOLOGIA:",
  JSON.stringify(tecnologia, null, 2),
].join("\n\n");

const systemPrompt = `Eres un asistente útil de LYNX SpA. Responde preguntas sobre servicios, horarios y proyectos usando solo la información provista. Si no sabes algo, sugiere contactar a un humano. Sé breve y profesional.\n\nCONTEXTO:\n${CONTEXT}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const conversation = messages
      .filter((message: { role?: string; content?: string }) => message?.content)
      .map((message: { role?: string; content?: string }) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: String(message.content ?? ""),
      }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...conversation],
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";

    return Response.json({ message: reply });
  } catch (error) {
    return Response.json(
      { message: "Ocurrió un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
