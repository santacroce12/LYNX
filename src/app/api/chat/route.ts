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

const systemPrompt = `Eres LYNX Bot, un asistente útil.
- Usa el CONTEXTO provisto para responder dudas.
- SI EL USUARIO QUIERE CONTACTAR/COTIZAR:
  1. Pídele amablemente su NOMBRE.
  2. Luego, pídele su EMAIL.
  3. Finalmente, pídele un MENSAJE o motivo breve.
  4. CUANDO TENGAS LOS 3 DATOS (Nombre, Email, Mensaje):
     NO respondas con texto normal. Responde ÚNICAMENTE con este bloque JSON exacto:
     {
       "action": "submit_contact",
       "data": {
         "name": "el nombre aquí",
         "email": "el email aquí",
         "message": "el mensaje aquí"
       }
     }

CONTEXTO:
${CONTEXT}`;

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

    return Response.json({ response: reply });
  } catch (error) {
    return Response.json(
      { response: "Ocurrió un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
