import { GoogleGenAI, Modality, Type } from "@google/genai";
import { findLocalMatch, getLocalSuggestions, LocalSentence } from "./localLibrary";

function createWavHeader(dataLength: number, sampleRate: number): Uint8Array {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  // File length
  view.setUint32(4, 36 + dataLength, true);
  // RIFF type
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // Format chunk identifier
  view.setUint32(12, 0x666d7420, false); // "fmt "
  // Format chunk length
  view.setUint32(16, 16, true);
  // Sample format (PCM)
  view.setUint16(20, 1, true);
  // Number of channels (Mono)
  view.setUint16(22, 1, true);
  // Sample rate
  view.setUint32(24, sampleRate, true);
  // Byte rate (SampleRate * Channels * BitsPerSample / 8)
  view.setUint32(28, sampleRate * 1 * 2, true);
  // Block align (Channels * BitsPerSample / 8)
  view.setUint16(32, 1 * 2, true);
  // Bits per sample
  view.setUint16(34, 16, true);
  // Data chunk identifier
  view.setUint32(36, 0x64617461, false); // "data"
  // Data chunk length
  view.setUint32(40, dataLength, true);

  return new Uint8Array(header);
}

export async function speak(text: string, slow: boolean = false, isRhyme: boolean = false): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("geminiService: GEMINI_API_KEY is missing!");
    return null;
  }

  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let prompt = "";
      if (isRhyme) {
        prompt = `Sing this nursery rhyme with a clear melody, rhythmic cadence, and a cheerful, sing-song voice. Exaggerate the pitch changes and pauses to make it sound like a musical performance for a baby: ${text}`;
      } else {
        prompt = slow 
          ? `Speak VERY slowly, clearly, and cheerfully, pausing between words: ${text}`
          : `Say cheerfully and clearly: ${text}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        console.log("TTS audio received, length:", base64Audio.length);
        const binaryString = atob(base64Audio);
        const dataLength = binaryString.length;
        const sampleRate = 24000;
        const wavHeader = createWavHeader(dataLength, sampleRate);
        
        const wavBuffer = new Uint8Array(wavHeader.length + dataLength);
        wavBuffer.set(wavHeader);
        for (let i = 0; i < dataLength; i++) {
          wavBuffer[i + wavHeader.length] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
      }
      return null;
    } catch (error) {
      attempt++;
      console.error(`TTS Attempt ${attempt} failed:`, error);
      if (attempt > maxRetries) {
        return null;
      }
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  return null;
}

export async function generateMusic(songTitle: string, lyrics: string): Promise<string | null> {
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      // Use process.env.API_KEY if available (user-selected key for Lyria)
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not found");
      
      console.log(`Attempting music generation with key: ${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`);
      
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Generate a cheerful, high-quality children's song version of "${songTitle}" with these lyrics: ${lyrics}. The style should be acoustic, gentle, and musical, similar to Super Simple Songs.`;

      const response = await ai.models.generateContentStream({
        model: "lyria-3-clip-preview",
        contents: prompt,
        config: {
          responseModalities: [Modality.AUDIO],
        },
      });

      let audioBase64 = "";
      let mimeType = "audio/wav";

      for await (const chunk of response) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
        }
      }

      if (audioBase64) {
        console.log(`geminiService: Music generation successful for "${songTitle}", audio length: ${audioBase64.length}`);
        try {
          const binary = atob(audioBase64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: mimeType });
          return URL.createObjectURL(blob);
        } catch (decodeError) {
          console.error("geminiService: Failed to decode music base64:", decodeError);
          return null;
        }
      }
      return null;
    } catch (error) {
      attempt++;
      console.error(`Music Generation Attempt ${attempt} failed:`, error);
      
      if (attempt > maxRetries) {
        return null;
      }
      
      // If it's a permission error or model not found, it might be an API key issue
      const errorMsg = error instanceof Error ? error.message : String(error);
      if (errorMsg.includes("403") || errorMsg.includes("permission") || errorMsg.includes("PERMISSION_DENIED")) {
        console.warn("Lyria model access failed: Permission Denied. This model requires a paid API key.");
        return null; // Return null immediately, don't retry on permission errors
      }

      if (errorMsg.includes("Requested entity was not found") || errorMsg.includes("404")) {
        console.warn("Lyria model not found. It might not be available in your region or with this API key.");
        return null;
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  return null;
}

export async function translateForParentChild(text: string): Promise<{ english: string; original: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("geminiService: GEMINI_API_KEY is missing!");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following Chinese sentence into English for a parent-child context. 
      Follow these rules:
      1. Use simple, basic vocabulary suitable for kids.
      2. Use positive, encouraging, and gentle phrasing.
      3. Avoid harsh commands or complex grammar.
      4. If the input is a negative command (e.g., "Don't do X"), rephrase it into a positive suggestion (e.g., "Let's do Y instead").
      
      Input: "${text}"
      
      Return ONLY the English translation string.`,
    });

    const english = response.text?.trim();
    if (english) {
      return { english, original: text };
    }
    console.warn("geminiService: Translation returned empty text");
    return null;
  } catch (error) {
    console.error("geminiService: Translation failed:", error);
    return null;
  }
}

export async function getTranslationSuggestions(text: string): Promise<{ chinese: string; english: string }[]> {
  // First, try to get some local suggestions for speed
  const localSuggestions = getLocalSuggestions(text, 2);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("geminiService: GEMINI_API_KEY is missing, using local suggestions only");
    return localSuggestions.map(s => ({ chinese: s.chinese, english: s.english }));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              chinese: { type: Type.STRING, description: "The suggested next sentence in Chinese" },
              english: { type: Type.STRING, description: "The English translation of the suggested sentence" }
            },
            required: ["chinese", "english"]
          }
        }
      },
      contents: `Based on the parent-child interaction context, the parent just said: "${text}". 
      Predict 2 possible next sentences the parent might want to say to the child.
      Rules:
      1. Keep them simple, positive, and encouraging.
      2. Suitable for a 0-3 year old child.
      3. Return exactly 2 suggestions.
      4. The English translation should be simple and child-friendly.`
    });

    const suggestions = JSON.parse(response.text || "[]");
    return Array.isArray(suggestions) && suggestions.length > 0 
      ? suggestions.slice(0, 2) 
      : localSuggestions.map(s => ({ chinese: s.chinese, english: s.english }));
  } catch (error) {
    console.error("geminiService: Failed to get suggestions:", error);
    return localSuggestions.map(s => ({ chinese: s.chinese, english: s.english }));
  }
}

/**
 * Hybrid translation: Try local library first, then cloud
 */
export async function translateHybrid(text: string): Promise<{ original: string; english: string; isLocal: boolean } | null> {
  console.log(`geminiService: Hybrid translation for "${text}"`);
  
  // 1. Try local match
  const localMatch = findLocalMatch(text);
  if (localMatch) {
    console.log(`geminiService: Local match found: ${localMatch.english}`);
    return {
      original: localMatch.chinese,
      english: localMatch.english,
      isLocal: true
    };
  }

  // 2. Fallback to cloud
  console.log('geminiService: No local match, falling back to cloud');
  const cloudResult = await translateForParentChild(text);
  if (cloudResult) {
    return {
      ...cloudResult,
      isLocal: false
    };
  }

  return null;
}

export async function generateImage(prompt: string): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A warm, cute, high-quality cartoon illustration for a parent-child English learning app. The scene should show: ${prompt}. Style: Cute animation, soft lighting, vibrant but gentle colors, child-friendly, simple background, safe and rounded shapes.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
