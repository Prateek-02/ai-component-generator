async function generateComponent({ prompt, chatHistory, code, uiState }) {
  
const systemPrompt = `
You are an expert React component generator.
Given a user prompt, return ONLY a JSON object with two fields:
"jsx" (the React component code as a string) and "css" (the CSS as a string).
Do not include any explanations or extra text.
`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
    { role: 'user', content: prompt }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or 'gpt-4o' if you have paid access
        messages,
        max_tokens: 800,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API request failed:', errorText);
      throw new Error(`AI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    try {
      const result = JSON.parse(content);
      return {
        jsx: result.jsx || '',
        css: result.css || ''
      };
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON. Raw content:\n', content);
      // Fallback: return the raw content as JSX for debugging, empty CSS
      return {
        jsx: content || '',
        css: ''
      };
    }
  } catch (err) {
    console.error('Error in generateComponent:', err);
    throw new Error('AI generation failed. Please try again.');
  }
}

module.exports = { generateComponent };
