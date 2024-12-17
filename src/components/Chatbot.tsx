// components/Chatbot.tsx

import React, { useState } from 'react';
import styles from '@/styles/chatbot.module.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaArrowUp } from 'react-icons/fa';

interface ChatbotProps {
  apiKey: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ apiKey }) => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async (prompt: string) => {
    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContentStream(prompt);
      let responseText = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        responseText += chunkText;
      }

      setChatHistory((prevChatHistory) =>
        prevChatHistory.concat([`You: ${prompt}`, `Gemini: ${responseText}`]),
      );
    } catch (error) {
      console.error('Error fetching response from Gemini:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHistory}>
        {chatHistory.map((message, index) => (
          <p
            key={index}
            className={
              message.startsWith('You:') ?
                styles.userMessage
              : styles.geminiMessage
            }
          >
            {message}
          </p>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="文字を入力してください。。。"
          className={styles.chatField}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const userPrompt = (
                event.target as HTMLInputElement
              ).value.trim();
              if (userPrompt) {
                sendPrompt(userPrompt);
                (event.target as HTMLInputElement).value = '';
              }
            }
          }}
        />
        <button
          className={styles.sendBtn}
          onClick={() => {
            const inputElement =
              document.querySelector<HTMLInputElement>('input[type="text"]');
            if (inputElement) {
              const userPrompt = inputElement.value.trim();
              if (userPrompt) {
                sendPrompt(userPrompt);
                inputElement.value = '';
              }
            }
          }}
        >
          <FaArrowUp />
        </button>
      </div>
      {isLoading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

export default Chatbot;
