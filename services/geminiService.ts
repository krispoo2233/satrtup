
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Always use process.env.API_KEY directly and use named parameter for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Ambassador for EcoloBrick, a pioneering eco-construction company based in Annaba, Algeria.
Our bricks are revolutionary because:
1. They are made from processed coffee waste and palm leaves.
2. They offer superior thermal insulation (30% better than clay).
3. They are carbon-negative.
4. We are located in Annaba, East of Algeria.

Research & Scientific Foundation:
- We are born from laboratory research. Our academic home is the University of Annaba (Université Badji Mokhtar), specifically the Génie Civil (Civil Engineering) department.
- Industrial Partner: CRTI (Centre de Recherche en Technologies Industrielles). They provide industrial validation and certification.

Our Distinguished Team of Innovators:
- Dr. Amri Naziha (Lead Materials Scientist)
- Pr. Habachi Wafa (Chief Architect)
- Dr. Benzerara Mohammed (Operations Director)
- Et. Mansouri Abderrahman (Sustainability Auditor)
- Et. Boumzaoute Zineddine (R&D Engineer)
- Et. Lekouaght Abdelhamid (Community Liaison)

Answer questions professionally, with a touch of Mediterranean warmth. 
If someone asks about buying, tell them to contact our sales team at abdoumansouri2323@gmail.com.
Always emphasize our scientific and academic roots when appropriate.
Keep responses concise and informative.
`;

const KEYWORD_RESPONSES: Record<string, string> = {
  'crti': "The Centre de Recherche en Technologies Industrielles (CRTI) is our strategic industrial partner in Algeria. They provide high-level technical certification, material testing, and validation services that ensure EcoloBrick products meet global construction standards.",
  'university of annaba': "Our core scientific research is deeply integrated with the University of Annaba (Université Badji Mokhtar). This partnership allows us to collaborate with leading scientists on the molecular bonding of bio-composites.",
  'génie civil': "The Génie Civil (Civil Engineering) department at the University of Annaba is where the EcoloBrick concept was born. We continue to work closely with their faculty to optimize the structural load-bearing capacity of our coffee and palm-based materials.",
  'genie civil': "The Génie Civil (Civil Engineering) department at the University of Annaba is where the EcoloBrick concept was born. We continue to work closely with their faculty to optimize the structural load-bearing capacity of our coffee and palm-based materials.",
  'innovators': "Our project is led by a brilliant team: Dr. Amri Naziha, Pr. Habachi Wafa, Dr. Benzerara Mohammed, Et. Mansouri Abderrahman, Et. Boumzaoute Zineddine, and Et. Lekouaght Abdelhamid. Each brings unique expertise from materials science to sustainable architecture."
};

export const getChatbotResponse = async (history: Message[], currentMessage: string): Promise<string> => {
  const normalizedInput = currentMessage.toLowerCase();

  // Check for pre-defined keyword responses first
  for (const [keyword, response] of Object.entries(KEYWORD_RESPONSES)) {
    if (normalizedInput.includes(keyword)) {
      return response;
    }
  }

  try {
    // Properly structure the contents array for the Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // The result of generateContent features a 'text' property
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing some technical difficulties. Please try again later.";
  }
};
