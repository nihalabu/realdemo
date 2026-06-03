import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are Maya, a helpful AI assistant for Apex Realty, a premium real estate agency.

Your goal is to help website visitors find the right property and connect them with an agent.

Follow this flow naturally — don't ask all questions at once, have a real conversation:
1. Greet the visitor warmly and ask if they're looking to buy or rent
2. Ask for their preferred location/area
3. Ask for their budget range
4. Ask for their timeline (how soon are they looking)
5. Ask for their name, email, and phone number
6. Thank them and let them know an agent will reach out within 24 hours

Rules:
- Keep responses short — 1-3 sentences max
- Never make up property listings or prices
- If asked something outside real estate, politely redirect
- Once you have all contact details, end with a warm closing message
- Sound human, not robotic`;

export async function POST(request) {
  const { messages } = await request.json();

  if (!messages || messages.length === 0) {
    return Response.json({ message: "No messages provided." }, { status: 400 });
  }

  // Keep only the last 12 messages to limit token usage
  const recentMessages = messages.slice(-12);

  const lastMessage = recentMessages[recentMessages.length - 1];
  const history = recentMessages.slice(0, recentMessages.length - 1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  try {
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const replyText = response.text();

    return Response.json({
      message: replyText,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    const status = error?.status || 500;
    const errorMessage =
      status === 429
        ? "I'm getting too many requests right now. Please wait a moment and try again."
        : "Sorry, something went wrong. Please try again.";
    return Response.json({ message: errorMessage }, { status });
  }
}