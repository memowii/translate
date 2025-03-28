"use client";

import { useState } from "react";

interface TranslationResponse {
  translated_text: string;
}

const languages = [
  { code: "english", name: "English" },
  { code: "spanish", name: "Spanish" },
  { code: "french", name: "French" },
  { code: "german", name: "German" },
  { code: "italian", name: "Italian" },
  { code: "portuguese", name: "Portuguese" },
];

export default function Translator() {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("spanish");
  const [targetLang, setTargetLang] = useState("english");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter text to translate");
      return;
    }

    if (sourceLang === targetLang) {
      setError("Source and target languages must be different");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://api-translate.guillermo-516.workers.dev/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data: TranslationResponse = await response.json();
      setTranslatedText(data.translated_text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Text Translator</h2>
      
      <div className="mb-4">
        <label htmlFor="sourceText" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter text to translate:
        </label>
        <textarea
          id="sourceText"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="sourceLang" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            From:
          </label>
          <select
            id="sourceLang"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={`source-${lang.code}`} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="targetLang" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            To:
          </label>
          <select
            id="targetLang"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={`target-${lang.code}`} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <button
          className="w-full py-2.5 px-5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          onClick={handleTranslate}
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? "Translating..." : "Translate"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {translatedText && !error && (
        <div className="mt-6">
          <h3 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">Translation:</h3>
          <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white">
            {translatedText}
          </div>
        </div>
      )}
    </div>
  );
} 