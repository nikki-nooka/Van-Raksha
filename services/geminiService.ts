import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisResultSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            threatName: {
                type: Type.STRING,
                description: "Name of the threat. Use a primary keyword where applicable: 'Wildfire', 'Flood', 'Tornado', 'Cyclone', 'Earthquake', 'Landslide'."
            },
            confidence: {
                type: Type.STRING,
                enum: ['High', 'Medium', 'Low'],
                description: "Confidence level of the detection."
            },
            description: {
                type: Type.STRING,
                description: "A brief explanation of the visual evidence for the threat."
            },
            causes: {
                type: Type.STRING,
                description: "A short explanation of the likely causes of this threat."
            },
            predictedImpact: {
                type: Type.STRING,
                description: "A description of the areas or infrastructure likely to be affected."
            },
            precautions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of actionable safety measures and precautions."
            }
        },
        required: ["threatName", "confidence", "description", "causes", "predictedImpact", "precautions"]
    }
};

export async function analyzeImage(base64Image: string): Promise<AnalysisResult[]> {
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };

    const textPart = {
        text: `Analyze this image, which could be a satellite or ground-level photo of a natural environment. Your task is to act as an environmental threat detector. Identify any potential or ongoing natural disasters.

For each identified threat, provide the following information structured according to the schema:
1.  **threatName**: A concise name for the threat. It is crucial to use one of the following standardized keywords if applicable for easy categorization: 'Wildfire', 'Flood', 'Tornado', 'Cyclone', 'Earthquake', 'Landslide', 'Volcanic Eruption'.
2.  **confidence**: Your confidence level in this assessment (High, Medium, or Low).
3.  **description**: A brief, one-sentence summary of the visual evidence.
4.  **causes**: A short explanation of the likely natural or human-induced causes for this threat.
5.  **predictedImpact**: A description of the potential impact on the local ecosystem, human settlements, or infrastructure.
6.  **precautions**: A list of 3-5 crucial safety measures or mitigation actions relevant to the detected threat.

If no threats are found, you must return an empty array.`
    };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisResultSchema,
            }
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
             return [];
        }
        
        const result = JSON.parse(jsonText);
        return result as AnalysisResult[];
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to analyze the image. The AI model could not process the request.");
    }
}


export function createChatSession(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are VanRaksha Assistant, a friendly and knowledgeable AI specializing in environmental science, disaster management, and conservation. Provide concise, accurate, and helpful information. Your tone should be supportive and informative. Use markdown for clarity when explaining complex topics or listing items.',
        }
    });
}