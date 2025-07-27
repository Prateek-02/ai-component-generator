require("dotenv").config();

async function generateComponent({ prompt, chatHistory = [], code = '', uiState = {} }) {
  const model = "meta-llama/llama-3-8b-instruct";

  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant. Return only valid React JSX component code and CSS styles. Do not wrap anything in markdown or backticks. Separate JSX and CSS using a clear delimiter like "// ---CSS---".`,
    },
    ...chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: "user",
      content: `Create a React component based on this prompt: "${prompt}".\n\nCurrent Code: ${code}\n\nUI State: ${JSON.stringify(uiState)}`,
    },
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ OpenRouter API error:", data.error);
      throw new Error(data.error.message || "AI generation failed.");
    }

    let output = data.choices?.[0]?.message?.content?.trim();

    // 🔪 Remove accidental backticks or markdown
    output = output.replace(/```(jsx|css|json)?/gi, '').trim();

    // ✂️ Split JSX and CSS by custom delimiter
    const [jsxPart, cssPart] = output.split('// ---CSS---');

    return {
      jsx: (jsxPart || '').trim(),
      css: (cssPart || '').trim(),
    };
  } catch (error) {
    console.error("❌ AI Generation Error:", error.message);
    throw new Error("AI generation failed. Please try again.");
  }
}

module.exports = { generateComponent };
