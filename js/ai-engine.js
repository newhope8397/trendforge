// js/ai-engine.js

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your key

async function fetchTopicPayload(topicName) {
  const prompt = `
    You are an expert professor for JEE Advanced and Class 12 Physics/Maths/Chemistry.
    Target Topic: "${topicName}".

    Generate a structured JSON response with NO markdown formatting, matching this EXACT schema:
    {
      "keyFormulas": [
        {
          "tag": "High-Yield Concept",
          "title": "Short Title",
          "formula": "Mathematical Equation",
          "description": "Physical meaning, SI units, and conditions.",
          "svgType": "circuit" // Options: "circuit", "parabola", "vector"
        }
      ],
      "fullFormulas": [
        {
          "tag": "Exhaustive Formula",
          "title": "Title",
          "formula": "Vector/Calculus Equation",
          "description": "Complete boundary conditions and edge cases.",
          "svgType": "vector"
        }
      ],
      "quizzes": {
        "tier1": [
          {
            "q": "NCERT level direct formula/conceptual question?",
            "options": ["A", "B", "C", "D"],
            "ans": 0,
            "exp": "Step-by-step explanation.",
            "conceptKey": "Sub-concept identifier"
          }
        ],
        "tier2": [
          {
            "q": "JEE Main level PYQ multi-concept numerical?",
            "options": ["A", "B", "C", "D"],
            "ans": 1,
            "exp": "Detailed multi-step solution.",
            "conceptKey": "Sub-concept identifier"
          }
        ],
        "tier3": [
          {
            "q": "JEE Advanced / HC Verma level question with non-standard constraints?",
            "options": ["A", "B", "C", "D"],
            "ans": 2,
            "exp": "Deep analytical proof and calculus-based solution.",
            "conceptKey": "Sub-concept identifier"
          }
        ]
      }
    }
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("AI Engine Fetch Error:", err);
    return null;
  }
}
