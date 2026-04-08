import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateAndSaveImage(prompt: string, filename: string) {
  console.log(`Gerando: ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(process.cwd(), 'public', 'images', filename);
        fs.writeFileSync(filePath, buffer);
        console.log(`Salvo: ${filename}`);
        return;
      }
    }
  } catch (error) {
    console.error(`Erro ao gerar ${filename}:`, error);
  }
}

async function main() {
  const images = [
    { name: 'willy wonka logo.png', prompt: 'A professional, elegant logo for Willy Wonka, featuring a stylized "W" in gold and purple, luxury candy brand aesthetic, transparent background style, high resolution.' },
    { name: 'man.jpg', prompt: 'A high-end editorial portrait of a modern Willy Wonka, wearing a purple velvet top hat and coat, mysterious and creative expression, cinematic lighting, dark background.' },
    { name: 'about.jpg', prompt: 'A magical, wide-angle view of a chocolate factory interior, chocolate river, giant candy flowers, whimsical machines, vibrant colors, cinematic atmosphere.' },
    { name: 'portfolio-first.jpg', prompt: 'A close-up of a glowing, magical candy creation, intricate details, sugar crystals, fantasy confectionery.' },
    { name: 'portfolio-second.jpg', prompt: 'A golden ticket hidden inside a luxury chocolate bar wrapper, gold foil reflecting light, premium aesthetic.' },
    { name: 'portfolio-third.jpg', prompt: 'A whimsical glass elevator flying through a colorful candy sky, steampunk elements, magical atmosphere.' },
    { name: 'portfolio-fourth.jpg', prompt: 'A collection of colorful Wonka bars stacked neatly, vibrant wrappers, high-end product photography.' },
    { name: 'post-one.jpg', prompt: 'A secret recipe book open on a wooden table, magical sparkles, old parchment, chocolate stains.' },
    { name: 'post-two.jpg', prompt: 'An Oompa Loompa silhouette working on a complex candy machine, steam, glowing lights, industrial fantasy.' },
    { name: 'post-three.jpg', prompt: 'A cup of thick, swirling hot chocolate with magical toppings, steam rising, cozy and magical.' },
    { name: 'post-four.jpg', prompt: 'A blueprint of a new candy invention, sketches of flying candies, creative workshop desk.' },
    { name: 'post-five.jpg', prompt: 'A field of giant lollipops under a purple sunset, dreamlike landscape, fantasy world.' },
    { name: 'post-six.jpg', prompt: 'A close-up of a Wonka bar being unwrapped to reveal a hint of gold, anticipation, high contrast.' }
  ];

  for (const img of images) {
    await generateAndSaveImage(img.prompt, img.name);
  }
}

main();
