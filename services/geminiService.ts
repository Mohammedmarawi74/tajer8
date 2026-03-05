
import { GoogleGenAI, Type } from "@google/genai";
import { Slide } from "../types";

// Always use process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSlideContent = async (topic: string): Promise<Partial<Slide>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بإنشاء محتوى لبطاقة إنفوجرافيك تعليمية حول الموضوع التالي: "${topic}". 
      يجب أن يتضمن المحتوى عنواناً رئيسياً، وعنواناً فرعياً، و6 نقاط مختصرة جداً. 
      اجعل الأسلوب رسمياً واحترافياً باللغة العربية.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headerTitle: { type: Type.STRING },
            mainTitle: { type: Type.STRING },
            points: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING, description: "Choose one from: UserCheck, Briefcase, Calendar, DollarSign, ClipboardList, UploadCloud, UserMinus, TrendingUp, Leaf, Sprout" }
                },
                required: ["title", "description", "icon"]
              }
            }
          },
          required: ["headerTitle", "mainTitle", "points"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
