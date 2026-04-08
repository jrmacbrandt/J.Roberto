import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageGenerator: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [missingCount, setMissingCount] = useState<number>(0);

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

  const generateImages = async () => {
    setIsGenerating(true);
    setStatus('Iniciando geração...');

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

    for (const img of images) {
      try {
        setStatus(`Gerando ${img.name}...`);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: img.prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
              imageSize: "1K"
            }
          }
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) {
          const base64Data = part.inlineData.data;
          
          setStatus(`Salvando ${img.name} no servidor...`);
          const saveResponse = await fetch('/api/save-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: img.name, base64Data })
          });

          if (!saveResponse.ok) throw new Error(`Falha ao salvar ${img.name}`);
          setStatus(`${img.name} salvo com sucesso!`);
        }
      } catch (error) {
        console.error(error);
        setStatus(`Erro em ${img.name}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    setStatus('Processo concluído!');
    setIsGenerating(false);
  };

  const hasAutoRun = React.useRef(false);

  React.useEffect(() => {
    const checkImages = async () => {
      try {
        const res = await fetch('/api/check-images');
        const data = await res.json();
        setMissingCount(data.missing.length);
        if (data.missing.length > 0) {
          setStatus(`${data.missing.length} imagens faltando. Iniciando geração automática...`);
          if (!hasAutoRun.current) {
            hasAutoRun.current = true;
            generateImages();
          }
        } else {
          setStatus('Todas as imagens estão presentes!');
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkImages();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[2000] bg-black/80 p-4 rounded-lg border border-white/10 text-white max-w-xs shadow-2xl">
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
        Gerador de Imagens Wonka
      </h3>
      <p className="text-xs text-gray-400 mb-3">{status || 'Pronto para gerar as artes do site.'}</p>
      <button
        onClick={generateImages}
        disabled={isGenerating}
        className={`w-full py-2 px-4 rounded text-xs font-bold transition-all ${
          isGenerating 
            ? 'bg-gray-700 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-500 active:scale-95'
        }`}
      >
        {isGenerating ? 'Gerando...' : 'Gerar Todas as Imagens'}
      </button>
    </div>
  );
};

export default ImageGenerator;
