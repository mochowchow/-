import { GoogleGenAI, Modality } from "@google/genai";

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

export async function speak(text: string, slow: boolean = false): Promise<string | null> {
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = slow 
        ? `Speak VERY slowly, clearly, and cheerfully, pausing between words: ${text}`
        : `Say cheerfully and clearly: ${text}`;

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
        const binary = atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: mimeType });
        return URL.createObjectURL(blob);
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
