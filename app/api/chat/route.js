import Groq from "groq-sdk";

// Initialize Groq instead of GoogleGenerativeAI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Maya, a helpful AI assistant for Apex Realty, a premium real estate agency.

Your goal is to help website visitors find the right property and connect them with an agent.

Follow this flow naturally — don't ask all questions at once, have a real conversation:
1. Greet the visitor warmly and ask if they're looking to buy or rent
2. Ask for their preferred location/area
3. Ask for their budget range
4. Ask for their timeline (how soon are they looking)
5. Once you have a clear picture of their needs, say exactly:
  "Before I connect you with an agent, could I grab your details?"
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

  // 1. Format messages for Groq.
  // Groq uses 'assistant' instead of 'model', and 'content' instead of 'parts: [{ text }]'
  const formattedMessages = recentMessages.map((msg) => ({
    role: msg.role === "model" ? "assistant" : msg.role,
    content: msg.content,
  }));

  // 2. Inject the system prompt as the very first message in the array
  formattedMessages.unshift({
    role: "system",
    content: SYSTEM_PROMPT,
  });

  try {
    // 3. Call the Groq chat completion endpoint
    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.1-8b-instant", // The fast model with 14,400 free daily requests
    });

    // 4. Extract the reply string
    const replyText = chatCompletion.choices[0]?.message?.content || "";

    return Response.json({
      message: replyText,
    });
  } catch (error) {
    console.error("Groq API error:", error);
    
    // Extract the error status from the Groq SDK
    const status = error?.status || 500;
    
    let errorMessage = "Sorry, something went wrong on our end. Please try again in a moment.";

    // If the client triggers a 429 Rate Limit (RPM or TPM)
    if (status === 429) {
      errorMessage = "I'm processing a lot of property requests at the moment! Please give me just 30 to 60 seconds to pull up the details, and ask me again.";
    } 
    // If Groq's servers experience a brief 503/500 overload
    else if (status === 503 || status === 500) {
      errorMessage = "Apex Realty's database is undergoing a quick update. Let me try that again for you in a brief moment!";
    }

    return Response.json({ message: errorMessage }, { status });
  }
}